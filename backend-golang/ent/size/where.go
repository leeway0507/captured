// Code generated by ent, DO NOT EDIT.

package size

import (
	"backend/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their ID field.
func ID(id int32) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int32) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int32) predicate.Size {
	return predicate.Size(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int32) predicate.Size {
	return predicate.Size(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int32) predicate.Size {
	return predicate.Size(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int32) predicate.Size {
	return predicate.Size(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int32) predicate.Size {
	return predicate.Size(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int32) predicate.Size {
	return predicate.Size(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int32) predicate.Size {
	return predicate.Size(sql.FieldLTE(FieldID, id))
}

// Sku applies equality check predicate on the "sku" field. It's identical to SkuEQ.
func Sku(v int32) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldSku, v))
}

// Size applies equality check predicate on the "size" field. It's identical to SizeEQ.
func Size(v string) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldSize, v))
}

// Available applies equality check predicate on the "available" field. It's identical to AvailableEQ.
func Available(v bool) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldAvailable, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldUpdatedAt, v))
}

// SkuEQ applies the EQ predicate on the "sku" field.
func SkuEQ(v int32) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldSku, v))
}

// SkuNEQ applies the NEQ predicate on the "sku" field.
func SkuNEQ(v int32) predicate.Size {
	return predicate.Size(sql.FieldNEQ(FieldSku, v))
}

// SkuIn applies the In predicate on the "sku" field.
func SkuIn(vs ...int32) predicate.Size {
	return predicate.Size(sql.FieldIn(FieldSku, vs...))
}

// SkuNotIn applies the NotIn predicate on the "sku" field.
func SkuNotIn(vs ...int32) predicate.Size {
	return predicate.Size(sql.FieldNotIn(FieldSku, vs...))
}

// SkuIsNil applies the IsNil predicate on the "sku" field.
func SkuIsNil() predicate.Size {
	return predicate.Size(sql.FieldIsNull(FieldSku))
}

// SkuNotNil applies the NotNil predicate on the "sku" field.
func SkuNotNil() predicate.Size {
	return predicate.Size(sql.FieldNotNull(FieldSku))
}

// SizeEQ applies the EQ predicate on the "size" field.
func SizeEQ(v string) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldSize, v))
}

// SizeNEQ applies the NEQ predicate on the "size" field.
func SizeNEQ(v string) predicate.Size {
	return predicate.Size(sql.FieldNEQ(FieldSize, v))
}

// SizeIn applies the In predicate on the "size" field.
func SizeIn(vs ...string) predicate.Size {
	return predicate.Size(sql.FieldIn(FieldSize, vs...))
}

// SizeNotIn applies the NotIn predicate on the "size" field.
func SizeNotIn(vs ...string) predicate.Size {
	return predicate.Size(sql.FieldNotIn(FieldSize, vs...))
}

// SizeGT applies the GT predicate on the "size" field.
func SizeGT(v string) predicate.Size {
	return predicate.Size(sql.FieldGT(FieldSize, v))
}

// SizeGTE applies the GTE predicate on the "size" field.
func SizeGTE(v string) predicate.Size {
	return predicate.Size(sql.FieldGTE(FieldSize, v))
}

// SizeLT applies the LT predicate on the "size" field.
func SizeLT(v string) predicate.Size {
	return predicate.Size(sql.FieldLT(FieldSize, v))
}

// SizeLTE applies the LTE predicate on the "size" field.
func SizeLTE(v string) predicate.Size {
	return predicate.Size(sql.FieldLTE(FieldSize, v))
}

// SizeContains applies the Contains predicate on the "size" field.
func SizeContains(v string) predicate.Size {
	return predicate.Size(sql.FieldContains(FieldSize, v))
}

// SizeHasPrefix applies the HasPrefix predicate on the "size" field.
func SizeHasPrefix(v string) predicate.Size {
	return predicate.Size(sql.FieldHasPrefix(FieldSize, v))
}

// SizeHasSuffix applies the HasSuffix predicate on the "size" field.
func SizeHasSuffix(v string) predicate.Size {
	return predicate.Size(sql.FieldHasSuffix(FieldSize, v))
}

// SizeEqualFold applies the EqualFold predicate on the "size" field.
func SizeEqualFold(v string) predicate.Size {
	return predicate.Size(sql.FieldEqualFold(FieldSize, v))
}

// SizeContainsFold applies the ContainsFold predicate on the "size" field.
func SizeContainsFold(v string) predicate.Size {
	return predicate.Size(sql.FieldContainsFold(FieldSize, v))
}

// AvailableEQ applies the EQ predicate on the "available" field.
func AvailableEQ(v bool) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldAvailable, v))
}

// AvailableNEQ applies the NEQ predicate on the "available" field.
func AvailableNEQ(v bool) predicate.Size {
	return predicate.Size(sql.FieldNEQ(FieldAvailable, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.Size {
	return predicate.Size(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.Size {
	return predicate.Size(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.Size {
	return predicate.Size(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.Size {
	return predicate.Size(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.Size {
	return predicate.Size(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.Size {
	return predicate.Size(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.Size {
	return predicate.Size(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.Size {
	return predicate.Size(sql.FieldLTE(FieldUpdatedAt, v))
}

// HasProductInfo applies the HasEdge predicate on the "product_info" edge.
func HasProductInfo() predicate.Size {
	return predicate.Size(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ProductInfoTable, ProductInfoColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasProductInfoWith applies the HasEdge predicate on the "product_info" edge with a given conditions (other predicates).
func HasProductInfoWith(preds ...predicate.ProductInfo) predicate.Size {
	return predicate.Size(func(s *sql.Selector) {
		step := newProductInfoStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Size) predicate.Size {
	return predicate.Size(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Size) predicate.Size {
	return predicate.Size(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Size) predicate.Size {
	return predicate.Size(sql.NotPredicates(p))
}
