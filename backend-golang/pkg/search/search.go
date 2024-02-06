package search

import (
	"backend/ent"
	"backend/ent/productinfo"
	"backend/ent/size"
	"context"
)

func Search(ctx context.Context, session *ent.Client, keyword string) ([]*ent.ProductInfo, error) {

	product, err := session.ProductInfo.Query().
		Where(
			productinfo.SearchInfoContainsFold(keyword),
			productinfo.HasSizesWith(size.Available(true)),
		).
		All(ctx)

	if err != nil {
		return nil, err
	}

	return product, nil

}
