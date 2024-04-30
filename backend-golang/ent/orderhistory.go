// Code generated by ent, DO NOT EDIT.

package ent

import (
	"backend/ent/orderhistory"
	"backend/ent/user"
	"backend/ent/useraddress"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// OrderHistory is the model entity for the OrderHistory schema.
type OrderHistory struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// UserID holds the value of the "user_id" field.
	UserID string `json:"user_id,omitempty"`
	// AddressID holds the value of the "address_id" field.
	AddressID string `json:"address_id,omitempty"`
	// OrderedAt holds the value of the "ordered_at" field.
	OrderedAt time.Time `json:"ordered_at,omitempty"`
	// UserOrderNumber holds the value of the "user_order_number" field.
	UserOrderNumber int32 `json:"user_order_number,omitempty"`
	// OrderStatus holds the value of the "order_status" field.
	OrderStatus string `json:"order_status,omitempty"`
	// OrderTotalPrice holds the value of the "order_total_price" field.
	OrderTotalPrice int32 `json:"order_total_price,omitempty"`
	// PaymentMethod holds the value of the "payment_method" field.
	PaymentMethod string `json:"payment_method,omitempty"`
	// PaymentStatus holds the value of the "payment_status" field.
	PaymentStatus string `json:"payment_status,omitempty"`
	// PaymentInfo holds the value of the "payment_info" field.
	PaymentInfo string `json:"payment_info,omitempty"`
	// PaymentKey holds the value of the "payment_key" field.
	PaymentKey string `json:"payment_key,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the OrderHistoryQuery when eager-loading is set.
	Edges        OrderHistoryEdges `json:"edges"`
	selectValues sql.SelectValues
}

// OrderHistoryEdges holds the relations/edges for other nodes in the graph.
type OrderHistoryEdges struct {
	// User holds the value of the user edge.
	User *User `json:"user,omitempty"`
	// UserAddre holds the value of the user_addre edge.
	UserAddre *UserAddress `json:"user_addre,omitempty"`
	// OrderRows holds the value of the order_rows edge.
	OrderRows []*OrderRow `json:"order_rows,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [3]bool
}

// UserOrErr returns the User value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e OrderHistoryEdges) UserOrErr() (*User, error) {
	if e.loadedTypes[0] {
		if e.User == nil {
			// Edge was loaded but was not found.
			return nil, &NotFoundError{label: user.Label}
		}
		return e.User, nil
	}
	return nil, &NotLoadedError{edge: "user"}
}

// UserAddreOrErr returns the UserAddre value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e OrderHistoryEdges) UserAddreOrErr() (*UserAddress, error) {
	if e.loadedTypes[1] {
		if e.UserAddre == nil {
			// Edge was loaded but was not found.
			return nil, &NotFoundError{label: useraddress.Label}
		}
		return e.UserAddre, nil
	}
	return nil, &NotLoadedError{edge: "user_addre"}
}

// OrderRowsOrErr returns the OrderRows value or an error if the edge
// was not loaded in eager-loading.
func (e OrderHistoryEdges) OrderRowsOrErr() ([]*OrderRow, error) {
	if e.loadedTypes[2] {
		return e.OrderRows, nil
	}
	return nil, &NotLoadedError{edge: "order_rows"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*OrderHistory) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case orderhistory.FieldUserOrderNumber, orderhistory.FieldOrderTotalPrice:
			values[i] = new(sql.NullInt64)
		case orderhistory.FieldID, orderhistory.FieldUserID, orderhistory.FieldAddressID, orderhistory.FieldOrderStatus, orderhistory.FieldPaymentMethod, orderhistory.FieldPaymentStatus, orderhistory.FieldPaymentInfo, orderhistory.FieldPaymentKey:
			values[i] = new(sql.NullString)
		case orderhistory.FieldOrderedAt:
			values[i] = new(sql.NullTime)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the OrderHistory fields.
func (oh *OrderHistory) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case orderhistory.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				oh.ID = value.String
			}
		case orderhistory.FieldUserID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field user_id", values[i])
			} else if value.Valid {
				oh.UserID = value.String
			}
		case orderhistory.FieldAddressID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field address_id", values[i])
			} else if value.Valid {
				oh.AddressID = value.String
			}
		case orderhistory.FieldOrderedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field ordered_at", values[i])
			} else if value.Valid {
				oh.OrderedAt = value.Time
			}
		case orderhistory.FieldUserOrderNumber:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field user_order_number", values[i])
			} else if value.Valid {
				oh.UserOrderNumber = int32(value.Int64)
			}
		case orderhistory.FieldOrderStatus:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field order_status", values[i])
			} else if value.Valid {
				oh.OrderStatus = value.String
			}
		case orderhistory.FieldOrderTotalPrice:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field order_total_price", values[i])
			} else if value.Valid {
				oh.OrderTotalPrice = int32(value.Int64)
			}
		case orderhistory.FieldPaymentMethod:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field payment_method", values[i])
			} else if value.Valid {
				oh.PaymentMethod = value.String
			}
		case orderhistory.FieldPaymentStatus:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field payment_status", values[i])
			} else if value.Valid {
				oh.PaymentStatus = value.String
			}
		case orderhistory.FieldPaymentInfo:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field payment_info", values[i])
			} else if value.Valid {
				oh.PaymentInfo = value.String
			}
		case orderhistory.FieldPaymentKey:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field payment_key", values[i])
			} else if value.Valid {
				oh.PaymentKey = value.String
			}
		default:
			oh.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the OrderHistory.
// This includes values selected through modifiers, order, etc.
func (oh *OrderHistory) Value(name string) (ent.Value, error) {
	return oh.selectValues.Get(name)
}

// QueryUser queries the "user" edge of the OrderHistory entity.
func (oh *OrderHistory) QueryUser() *UserQuery {
	return NewOrderHistoryClient(oh.config).QueryUser(oh)
}

// QueryUserAddre queries the "user_addre" edge of the OrderHistory entity.
func (oh *OrderHistory) QueryUserAddre() *UserAddressQuery {
	return NewOrderHistoryClient(oh.config).QueryUserAddre(oh)
}

// QueryOrderRows queries the "order_rows" edge of the OrderHistory entity.
func (oh *OrderHistory) QueryOrderRows() *OrderRowQuery {
	return NewOrderHistoryClient(oh.config).QueryOrderRows(oh)
}

// Update returns a builder for updating this OrderHistory.
// Note that you need to call OrderHistory.Unwrap() before calling this method if this OrderHistory
// was returned from a transaction, and the transaction was committed or rolled back.
func (oh *OrderHistory) Update() *OrderHistoryUpdateOne {
	return NewOrderHistoryClient(oh.config).UpdateOne(oh)
}

// Unwrap unwraps the OrderHistory entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (oh *OrderHistory) Unwrap() *OrderHistory {
	_tx, ok := oh.config.driver.(*txDriver)
	if !ok {
		panic("ent: OrderHistory is not a transactional entity")
	}
	oh.config.driver = _tx.drv
	return oh
}

// String implements the fmt.Stringer.
func (oh *OrderHistory) String() string {
	var builder strings.Builder
	builder.WriteString("OrderHistory(")
	builder.WriteString(fmt.Sprintf("id=%v, ", oh.ID))
	builder.WriteString("user_id=")
	builder.WriteString(oh.UserID)
	builder.WriteString(", ")
	builder.WriteString("address_id=")
	builder.WriteString(oh.AddressID)
	builder.WriteString(", ")
	builder.WriteString("ordered_at=")
	builder.WriteString(oh.OrderedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("user_order_number=")
	builder.WriteString(fmt.Sprintf("%v", oh.UserOrderNumber))
	builder.WriteString(", ")
	builder.WriteString("order_status=")
	builder.WriteString(oh.OrderStatus)
	builder.WriteString(", ")
	builder.WriteString("order_total_price=")
	builder.WriteString(fmt.Sprintf("%v", oh.OrderTotalPrice))
	builder.WriteString(", ")
	builder.WriteString("payment_method=")
	builder.WriteString(oh.PaymentMethod)
	builder.WriteString(", ")
	builder.WriteString("payment_status=")
	builder.WriteString(oh.PaymentStatus)
	builder.WriteString(", ")
	builder.WriteString("payment_info=")
	builder.WriteString(oh.PaymentInfo)
	builder.WriteString(", ")
	builder.WriteString("payment_key=")
	builder.WriteString(oh.PaymentKey)
	builder.WriteByte(')')
	return builder.String()
}

// OrderHistories is a parsable slice of OrderHistory.
type OrderHistories []*OrderHistory