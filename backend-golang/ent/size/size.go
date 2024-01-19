// Code generated by ent, DO NOT EDIT.

package size

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

const (
	// Label holds the string label denoting the size type in the database.
	Label = "size"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "size_id"
	// FieldSku holds the string denoting the sku field in the database.
	FieldSku = "sku"
	// FieldSize holds the string denoting the size field in the database.
	FieldSize = "size"
	// FieldAvailable holds the string denoting the available field in the database.
	FieldAvailable = "available"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// EdgeProductInfo holds the string denoting the product_info edge name in mutations.
	EdgeProductInfo = "product_info"
	// ProductInfoFieldID holds the string denoting the ID field of the ProductInfo.
	ProductInfoFieldID = "sku"
	// Table holds the table name of the size in the database.
	Table = "size"
	// ProductInfoTable is the table that holds the product_info relation/edge.
	ProductInfoTable = "size"
	// ProductInfoInverseTable is the table name for the ProductInfo entity.
	// It exists in this package in order to avoid circular dependency with the "productinfo" package.
	ProductInfoInverseTable = "product_info"
	// ProductInfoColumn is the table column denoting the product_info relation/edge.
	ProductInfoColumn = "sku"
)

// Columns holds all SQL columns for size fields.
var Columns = []string{
	FieldID,
	FieldSku,
	FieldSize,
	FieldAvailable,
	FieldUpdatedAt,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

// OrderOption defines the ordering options for the Size queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// BySku orders the results by the sku field.
func BySku(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSku, opts...).ToFunc()
}

// BySize orders the results by the size field.
func BySize(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSize, opts...).ToFunc()
}

// ByAvailable orders the results by the available field.
func ByAvailable(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldAvailable, opts...).ToFunc()
}

// ByUpdatedAt orders the results by the updated_at field.
func ByUpdatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUpdatedAt, opts...).ToFunc()
}

// ByProductInfoField orders the results by product_info field.
func ByProductInfoField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newProductInfoStep(), sql.OrderByField(field, opts...))
	}
}
func newProductInfoStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(ProductInfoInverseTable, ProductInfoFieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, ProductInfoTable, ProductInfoColumn),
	)
}
