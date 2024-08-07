// Code generated by entimport, DO NOT EDIT.

package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type ProductInfo struct {
	ent.Schema
}

func (ProductInfo) Fields() []ent.Field {
	return []ent.Field{
		field.Int32("id").StorageKey("sku"), 
		field.String("brand").Optional(), 
		field.String("product_name").Optional(), 
		field.String("product_id").Optional(), 
		field.Int32("shipping_fee").Optional(), 
		field.Int32("price").Optional(), 
		field.Bool("intl").Optional(), 
		field.String("search_info").Optional(), 
		field.String("color").Optional(), 
		field.String("category").Optional(), 
		field.String("category_spec").Optional(), 
		field.String("img_type").Optional(), 
		field.String("price_desc_cursor").Optional(), 
		field.String("price_asc_cursor").Optional(), 
		field.Int32("deploy").Optional(), 
		field.String("kor_product_name").Optional(), 
		field.String("kor_brand").Optional(),
	}
}
func (ProductInfo) Edges() []ent.Edge {
	return []ent.Edge{edge.To("order_rows", OrderRow.Type), edge.To("sizes", Size.Type)}
}
func (ProductInfo) Annotations() []schema.Annotation {
	return []schema.Annotation{entsql.Annotation{Table: "product_info"}}
}
