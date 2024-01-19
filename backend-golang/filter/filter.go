package filter

import (
	"backend/ent"
	"context"
	"log"
	"sync"

	"entgo.io/ent/dialect"
	_ "github.com/go-sql-driver/mysql"
)

type ProductFilter struct {
	DbUrl string
}

var (
	once     sync.Once
	instance *ent.Client
)

func (pf *ProductFilter) DbConnection() *ent.Client {
	once.Do(func() {
		client, err := ent.Open(dialect.MySQL, pf.DbUrl)
		if err != nil {
			log.Fatalf("failed opening connection to mysql: %v", err)
		}
		instance = client
	})

	return instance
}

func (pf *ProductFilter) Filter() ([]*ent.ProductInfo, error) {
	client := pf.DbConnection()
	ctx := context.Background()

	products, err := client.ProductInfo.Query().All(ctx)

	if err != nil {
		log.Fatalf("failed to query products: %v", err)
	}

	client.Close()
	return products, err
}
