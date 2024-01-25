package filter

import (
	"backend/ent"
	"backend/ent/predicate"
	"backend/ent/productinfo"
	"backend/ent/size"
	"backend/pkg/entities"
	"context"
	"log"
	"time"

	"entgo.io/ent/dialect"
	_ "github.com/go-sql-driver/mysql"
	"github.com/hashicorp/golang-lru/v2/expirable"
)

type ProductFilter struct {
	DbUrl string
	Limit int
	Ctx   context.Context
}
type pageBook map[int]CardArr
type CardArr []*ent.ProductInfo

type FilterQuery struct {
	Where []predicate.ProductInfo
	// Order *productinfo.OrderOption
}

var (
	cache = expirable.NewLRU[entities.Filter, pageBook](5, nil, time.Second*100)
)

func (pf *ProductFilter) DbConnection() *ent.Client {
	client, err := ent.Open(dialect.MySQL, pf.DbUrl)

	if err != nil {
		log.Fatalf("failed opening connection to mysql: %v", err)
	}
	return client
}

func (pf *ProductFilter) FilterDataTwo(filter *entities.Filter) (CardArr, error) {
	client := pf.DbConnection()
	defer client.Close()

	// Default
	productsQuery := client.ProductInfo.
		Query().
		Where(productinfo.Deploy(1), productinfo.HasSizesWith(size.Available(true)))

	// Category
	if filter.Category != nil && len(*filter.Category) > 0 {
		productsQuery = productsQuery.Where(productinfo.CategoryIn(*filter.Category...))
	}

	// CategorySpec
	if filter.CategorySpec != nil && len(*filter.CategorySpec) > 0 {
		productsQuery = productsQuery.Where(productinfo.CategorySpecIn(*filter.CategorySpec...))
	}

	// Brand
	if filter.Brand != nil && len(*filter.Brand) > 0 {
		productsQuery = productsQuery.Where(productinfo.BrandIn(*filter.Brand...))
	}

	// Intl
	switch filter.Intl {
	case "t":
		productsQuery = productsQuery.Where(productinfo.Intl(true))
	case "f":
		productsQuery = productsQuery.Where(productinfo.Intl(false))
	}

	// Price
	if len(filter.Price) == 2 && filter.Price[1] > 0 {
		productsQuery = productsQuery.
			Where(productinfo.And(productinfo.PriceGTE(filter.Price[0]), productinfo.PriceLTE(filter.Price[1])))
	}

	// Size
	if filter.Size != nil && len(*filter.Size) > 0 {
		productsQuery = productsQuery.
			Where(productinfo.HasSizesWith(size.SizeIn(*filter.Size...)))
	}

	// SortBy
	switch filter.SortBy {
	case "최신순":
		productsQuery = productsQuery.Order(productinfo.ByID())
	case "높은 가격 순":
		productsQuery = productsQuery.Order(productinfo.ByPriceAscCursor())
	case "낮은 가격 순":
		productsQuery = productsQuery.Order(productinfo.ByPriceDescCursor())
	}

	// Execute
	products, err := productsQuery.All(pf.Ctx)

	if err != nil {
		log.Fatalf("failed to query products: %v", err)
	}

	return products, err

}

func (pf *ProductFilter) NoFilter(page int) (CardArr, bool, error) {

	defaultFilter := entities.Filter{SortBy: "최신순"}

	r, ok := cache.Get(defaultFilter)

	if ok {
		return r[page], true, nil
	}

	prod, err := pf.NoFilterData()

	if err != nil {
		return nil, false, err
	}
	pageBox, err := pf.SplitData(prod)
	cache.Add(defaultFilter, pageBox)

	return pageBox[page], false, err
}

func (pf *ProductFilter) NoFilterData() (CardArr, error) {
	client := pf.DbConnection()
	defer client.Close()
	products, err := client.ProductInfo.
		Query().
		Where(
			productinfo.Deploy(1),
			productinfo.HasSizesWith(size.Available(true)),
		).
		All(pf.Ctx)

	if err != nil {
		log.Fatalf("failed to query products: %v", err)
	}

	return products, err
}

func (pf *ProductFilter) SplitData(data CardArr) (pageBook, error) {
	lenData := len(data)
	q, r := lenData/pf.Limit, lenData%pf.Limit

	if r != 0 {
		q++
	}

	PageBook := make(map[int]CardArr)

	for i := 0; i < q; i++ {
		start, end := i*pf.Limit, (i+1)*pf.Limit
		if i+1 == q {
			end = len(data)
		}
		PageBook[i+1] = data[start:end]
	}

	return PageBook, nil
}
