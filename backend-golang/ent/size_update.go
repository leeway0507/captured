// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"backend/ent/predicate"
	"backend/ent/productinfo"
	"backend/ent/size"
	"errors"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// SizeUpdate is the builder for updating Size entities.
type SizeUpdate struct {
	config
	hooks    []Hook
	mutation *SizeMutation
}

// Where appends a list predicates to the SizeUpdate builder.
func (su *SizeUpdate) Where(ps ...predicate.Size) *SizeUpdate {
	su.mutation.Where(ps...)
	return su
}

// SetSku sets the "sku" field.
func (su *SizeUpdate) SetSku(i int32) *SizeUpdate {
	su.mutation.SetSku(i)
	return su
}

// SetNillableSku sets the "sku" field if the given value is not nil.
func (su *SizeUpdate) SetNillableSku(i *int32) *SizeUpdate {
	if i != nil {
		su.SetSku(*i)
	}
	return su
}

// ClearSku clears the value of the "sku" field.
func (su *SizeUpdate) ClearSku() *SizeUpdate {
	su.mutation.ClearSku()
	return su
}

// SetSize sets the "size" field.
func (su *SizeUpdate) SetSize(s string) *SizeUpdate {
	su.mutation.SetSize(s)
	return su
}

// SetNillableSize sets the "size" field if the given value is not nil.
func (su *SizeUpdate) SetNillableSize(s *string) *SizeUpdate {
	if s != nil {
		su.SetSize(*s)
	}
	return su
}

// SetAvailable sets the "available" field.
func (su *SizeUpdate) SetAvailable(b bool) *SizeUpdate {
	su.mutation.SetAvailable(b)
	return su
}

// SetNillableAvailable sets the "available" field if the given value is not nil.
func (su *SizeUpdate) SetNillableAvailable(b *bool) *SizeUpdate {
	if b != nil {
		su.SetAvailable(*b)
	}
	return su
}

// SetUpdatedAt sets the "updated_at" field.
func (su *SizeUpdate) SetUpdatedAt(t time.Time) *SizeUpdate {
	su.mutation.SetUpdatedAt(t)
	return su
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (su *SizeUpdate) SetNillableUpdatedAt(t *time.Time) *SizeUpdate {
	if t != nil {
		su.SetUpdatedAt(*t)
	}
	return su
}

// SetProductInfoID sets the "product_info" edge to the ProductInfo entity by ID.
func (su *SizeUpdate) SetProductInfoID(id int32) *SizeUpdate {
	su.mutation.SetProductInfoID(id)
	return su
}

// SetNillableProductInfoID sets the "product_info" edge to the ProductInfo entity by ID if the given value is not nil.
func (su *SizeUpdate) SetNillableProductInfoID(id *int32) *SizeUpdate {
	if id != nil {
		su = su.SetProductInfoID(*id)
	}
	return su
}

// SetProductInfo sets the "product_info" edge to the ProductInfo entity.
func (su *SizeUpdate) SetProductInfo(p *ProductInfo) *SizeUpdate {
	return su.SetProductInfoID(p.ID)
}

// Mutation returns the SizeMutation object of the builder.
func (su *SizeUpdate) Mutation() *SizeMutation {
	return su.mutation
}

// ClearProductInfo clears the "product_info" edge to the ProductInfo entity.
func (su *SizeUpdate) ClearProductInfo() *SizeUpdate {
	su.mutation.ClearProductInfo()
	return su
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (su *SizeUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, su.sqlSave, su.mutation, su.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (su *SizeUpdate) SaveX(ctx context.Context) int {
	affected, err := su.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (su *SizeUpdate) Exec(ctx context.Context) error {
	_, err := su.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (su *SizeUpdate) ExecX(ctx context.Context) {
	if err := su.Exec(ctx); err != nil {
		panic(err)
	}
}

func (su *SizeUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := sqlgraph.NewUpdateSpec(size.Table, size.Columns, sqlgraph.NewFieldSpec(size.FieldID, field.TypeInt32))
	if ps := su.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := su.mutation.Size(); ok {
		_spec.SetField(size.FieldSize, field.TypeString, value)
	}
	if value, ok := su.mutation.Available(); ok {
		_spec.SetField(size.FieldAvailable, field.TypeBool, value)
	}
	if value, ok := su.mutation.UpdatedAt(); ok {
		_spec.SetField(size.FieldUpdatedAt, field.TypeTime, value)
	}
	if su.mutation.ProductInfoCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   size.ProductInfoTable,
			Columns: []string{size.ProductInfoColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(productinfo.FieldID, field.TypeInt32),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := su.mutation.ProductInfoIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   size.ProductInfoTable,
			Columns: []string{size.ProductInfoColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(productinfo.FieldID, field.TypeInt32),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, su.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{size.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	su.mutation.done = true
	return n, nil
}

// SizeUpdateOne is the builder for updating a single Size entity.
type SizeUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *SizeMutation
}

// SetSku sets the "sku" field.
func (suo *SizeUpdateOne) SetSku(i int32) *SizeUpdateOne {
	suo.mutation.SetSku(i)
	return suo
}

// SetNillableSku sets the "sku" field if the given value is not nil.
func (suo *SizeUpdateOne) SetNillableSku(i *int32) *SizeUpdateOne {
	if i != nil {
		suo.SetSku(*i)
	}
	return suo
}

// ClearSku clears the value of the "sku" field.
func (suo *SizeUpdateOne) ClearSku() *SizeUpdateOne {
	suo.mutation.ClearSku()
	return suo
}

// SetSize sets the "size" field.
func (suo *SizeUpdateOne) SetSize(s string) *SizeUpdateOne {
	suo.mutation.SetSize(s)
	return suo
}

// SetNillableSize sets the "size" field if the given value is not nil.
func (suo *SizeUpdateOne) SetNillableSize(s *string) *SizeUpdateOne {
	if s != nil {
		suo.SetSize(*s)
	}
	return suo
}

// SetAvailable sets the "available" field.
func (suo *SizeUpdateOne) SetAvailable(b bool) *SizeUpdateOne {
	suo.mutation.SetAvailable(b)
	return suo
}

// SetNillableAvailable sets the "available" field if the given value is not nil.
func (suo *SizeUpdateOne) SetNillableAvailable(b *bool) *SizeUpdateOne {
	if b != nil {
		suo.SetAvailable(*b)
	}
	return suo
}

// SetUpdatedAt sets the "updated_at" field.
func (suo *SizeUpdateOne) SetUpdatedAt(t time.Time) *SizeUpdateOne {
	suo.mutation.SetUpdatedAt(t)
	return suo
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (suo *SizeUpdateOne) SetNillableUpdatedAt(t *time.Time) *SizeUpdateOne {
	if t != nil {
		suo.SetUpdatedAt(*t)
	}
	return suo
}

// SetProductInfoID sets the "product_info" edge to the ProductInfo entity by ID.
func (suo *SizeUpdateOne) SetProductInfoID(id int32) *SizeUpdateOne {
	suo.mutation.SetProductInfoID(id)
	return suo
}

// SetNillableProductInfoID sets the "product_info" edge to the ProductInfo entity by ID if the given value is not nil.
func (suo *SizeUpdateOne) SetNillableProductInfoID(id *int32) *SizeUpdateOne {
	if id != nil {
		suo = suo.SetProductInfoID(*id)
	}
	return suo
}

// SetProductInfo sets the "product_info" edge to the ProductInfo entity.
func (suo *SizeUpdateOne) SetProductInfo(p *ProductInfo) *SizeUpdateOne {
	return suo.SetProductInfoID(p.ID)
}

// Mutation returns the SizeMutation object of the builder.
func (suo *SizeUpdateOne) Mutation() *SizeMutation {
	return suo.mutation
}

// ClearProductInfo clears the "product_info" edge to the ProductInfo entity.
func (suo *SizeUpdateOne) ClearProductInfo() *SizeUpdateOne {
	suo.mutation.ClearProductInfo()
	return suo
}

// Where appends a list predicates to the SizeUpdate builder.
func (suo *SizeUpdateOne) Where(ps ...predicate.Size) *SizeUpdateOne {
	suo.mutation.Where(ps...)
	return suo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (suo *SizeUpdateOne) Select(field string, fields ...string) *SizeUpdateOne {
	suo.fields = append([]string{field}, fields...)
	return suo
}

// Save executes the query and returns the updated Size entity.
func (suo *SizeUpdateOne) Save(ctx context.Context) (*Size, error) {
	return withHooks(ctx, suo.sqlSave, suo.mutation, suo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (suo *SizeUpdateOne) SaveX(ctx context.Context) *Size {
	node, err := suo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (suo *SizeUpdateOne) Exec(ctx context.Context) error {
	_, err := suo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (suo *SizeUpdateOne) ExecX(ctx context.Context) {
	if err := suo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (suo *SizeUpdateOne) sqlSave(ctx context.Context) (_node *Size, err error) {
	_spec := sqlgraph.NewUpdateSpec(size.Table, size.Columns, sqlgraph.NewFieldSpec(size.FieldID, field.TypeInt32))
	id, ok := suo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Size.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := suo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, size.FieldID)
		for _, f := range fields {
			if !size.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != size.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := suo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := suo.mutation.Size(); ok {
		_spec.SetField(size.FieldSize, field.TypeString, value)
	}
	if value, ok := suo.mutation.Available(); ok {
		_spec.SetField(size.FieldAvailable, field.TypeBool, value)
	}
	if value, ok := suo.mutation.UpdatedAt(); ok {
		_spec.SetField(size.FieldUpdatedAt, field.TypeTime, value)
	}
	if suo.mutation.ProductInfoCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   size.ProductInfoTable,
			Columns: []string{size.ProductInfoColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(productinfo.FieldID, field.TypeInt32),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := suo.mutation.ProductInfoIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   size.ProductInfoTable,
			Columns: []string{size.ProductInfoColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(productinfo.FieldID, field.TypeInt32),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Size{config: suo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, suo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{size.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	suo.mutation.done = true
	return _node, nil
}
