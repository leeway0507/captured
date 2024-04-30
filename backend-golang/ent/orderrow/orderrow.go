// Code generated by ent, DO NOT EDIT.

package orderrow

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

const (
	// Label holds the string label denoting the orderrow type in the database.
	Label = "order_row"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "order_row_id"
	// FieldOrderID holds the string denoting the order_id field in the database.
	FieldOrderID = "order_id"
	// FieldSku holds the string denoting the sku field in the database.
	FieldSku = "sku"
	// FieldSize holds the string denoting the size field in the database.
	FieldSize = "size"
	// FieldQuantity holds the string denoting the quantity field in the database.
	FieldQuantity = "quantity"
	// FieldDeliveryStatus holds the string denoting the delivery_status field in the database.
	FieldDeliveryStatus = "delivery_status"
	// FieldDeliveryCompany holds the string denoting the delivery_company field in the database.
	FieldDeliveryCompany = "delivery_company"
	// FieldDeliveryNumber holds the string denoting the delivery_number field in the database.
	FieldDeliveryNumber = "delivery_number"
	// EdgeOrderHistory holds the string denoting the order_history edge name in mutations.
	EdgeOrderHistory = "order_history"
	// EdgeProductInfo holds the string denoting the product_info edge name in mutations.
	EdgeProductInfo = "product_info"
	// OrderHistoryFieldID holds the string denoting the ID field of the OrderHistory.
	OrderHistoryFieldID = "order_id"
	// ProductInfoFieldID holds the string denoting the ID field of the ProductInfo.
	ProductInfoFieldID = "sku"
	// Table holds the table name of the orderrow in the database.
	Table = "order_row"
	// OrderHistoryTable is the table that holds the order_history relation/edge.
	OrderHistoryTable = "order_row"
	// OrderHistoryInverseTable is the table name for the OrderHistory entity.
	// It exists in this package in order to avoid circular dependency with the "orderhistory" package.
	OrderHistoryInverseTable = "order_history"
	// OrderHistoryColumn is the table column denoting the order_history relation/edge.
	OrderHistoryColumn = "order_id"
	// ProductInfoTable is the table that holds the product_info relation/edge.
	ProductInfoTable = "order_row"
	// ProductInfoInverseTable is the table name for the ProductInfo entity.
	// It exists in this package in order to avoid circular dependency with the "productinfo" package.
	ProductInfoInverseTable = "product_info"
	// ProductInfoColumn is the table column denoting the product_info relation/edge.
	ProductInfoColumn = "sku"
)

// Columns holds all SQL columns for orderrow fields.
var Columns = []string{
	FieldID,
	FieldOrderID,
	FieldSku,
	FieldSize,
	FieldQuantity,
	FieldDeliveryStatus,
	FieldDeliveryCompany,
	FieldDeliveryNumber,
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

// OrderOption defines the ordering options for the OrderRow queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByOrderID orders the results by the order_id field.
func ByOrderID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldOrderID, opts...).ToFunc()
}

// BySku orders the results by the sku field.
func BySku(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSku, opts...).ToFunc()
}

// BySize orders the results by the size field.
func BySize(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSize, opts...).ToFunc()
}

// ByQuantity orders the results by the quantity field.
func ByQuantity(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldQuantity, opts...).ToFunc()
}

// ByDeliveryStatus orders the results by the delivery_status field.
func ByDeliveryStatus(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldDeliveryStatus, opts...).ToFunc()
}

// ByDeliveryCompany orders the results by the delivery_company field.
func ByDeliveryCompany(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldDeliveryCompany, opts...).ToFunc()
}

// ByDeliveryNumber orders the results by the delivery_number field.
func ByDeliveryNumber(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldDeliveryNumber, opts...).ToFunc()
}

// ByOrderHistoryField orders the results by order_history field.
func ByOrderHistoryField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newOrderHistoryStep(), sql.OrderByField(field, opts...))
	}
}

// ByProductInfoField orders the results by product_info field.
func ByProductInfoField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newProductInfoStep(), sql.OrderByField(field, opts...))
	}
}
func newOrderHistoryStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(OrderHistoryInverseTable, OrderHistoryFieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, OrderHistoryTable, OrderHistoryColumn),
	)
}
func newProductInfoStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(ProductInfoInverseTable, ProductInfoFieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, ProductInfoTable, ProductInfoColumn),
	)
}