// Code generated by entimport, DO NOT EDIT.

package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type Size struct {
	ent.Schema
}

func (Size) Fields() []ent.Field {
	return []ent.Field{
		field.Int32("id").StorageKey("size_id"), 
		field.Int32("sku").Optional(), 
		field.String("size"), 
		field.Bool("available"), 
		field.Time("updated_at"),
		}
}
func (Size) Edges() []ent.Edge {
	return []ent.Edge{edge.From("product_info", ProductInfo.Type).Ref("sizes").Unique().Field("sku")}
}
func (Size) Annotations() []schema.Annotation {
	return []schema.Annotation{entsql.Annotation{Table: "size"}}
}
