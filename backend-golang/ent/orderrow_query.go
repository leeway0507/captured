// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"backend/ent/orderhistory"
	"backend/ent/orderrow"
	"backend/ent/predicate"
	"backend/ent/productinfo"
	"fmt"
	"math"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// OrderRowQuery is the builder for querying OrderRow entities.
type OrderRowQuery struct {
	config
	ctx              *QueryContext
	order            []orderrow.OrderOption
	inters           []Interceptor
	predicates       []predicate.OrderRow
	withOrderHistory *OrderHistoryQuery
	withProductInfo  *ProductInfoQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the OrderRowQuery builder.
func (orq *OrderRowQuery) Where(ps ...predicate.OrderRow) *OrderRowQuery {
	orq.predicates = append(orq.predicates, ps...)
	return orq
}

// Limit the number of records to be returned by this query.
func (orq *OrderRowQuery) Limit(limit int) *OrderRowQuery {
	orq.ctx.Limit = &limit
	return orq
}

// Offset to start from.
func (orq *OrderRowQuery) Offset(offset int) *OrderRowQuery {
	orq.ctx.Offset = &offset
	return orq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (orq *OrderRowQuery) Unique(unique bool) *OrderRowQuery {
	orq.ctx.Unique = &unique
	return orq
}

// Order specifies how the records should be ordered.
func (orq *OrderRowQuery) Order(o ...orderrow.OrderOption) *OrderRowQuery {
	orq.order = append(orq.order, o...)
	return orq
}

// QueryOrderHistory chains the current query on the "order_history" edge.
func (orq *OrderRowQuery) QueryOrderHistory() *OrderHistoryQuery {
	query := (&OrderHistoryClient{config: orq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := orq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := orq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(orderrow.Table, orderrow.FieldID, selector),
			sqlgraph.To(orderhistory.Table, orderhistory.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, orderrow.OrderHistoryTable, orderrow.OrderHistoryColumn),
		)
		fromU = sqlgraph.SetNeighbors(orq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryProductInfo chains the current query on the "product_info" edge.
func (orq *OrderRowQuery) QueryProductInfo() *ProductInfoQuery {
	query := (&ProductInfoClient{config: orq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := orq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := orq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(orderrow.Table, orderrow.FieldID, selector),
			sqlgraph.To(productinfo.Table, productinfo.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, orderrow.ProductInfoTable, orderrow.ProductInfoColumn),
		)
		fromU = sqlgraph.SetNeighbors(orq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first OrderRow entity from the query.
// Returns a *NotFoundError when no OrderRow was found.
func (orq *OrderRowQuery) First(ctx context.Context) (*OrderRow, error) {
	nodes, err := orq.Limit(1).All(setContextOp(ctx, orq.ctx, "First"))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{orderrow.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (orq *OrderRowQuery) FirstX(ctx context.Context) *OrderRow {
	node, err := orq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first OrderRow ID from the query.
// Returns a *NotFoundError when no OrderRow ID was found.
func (orq *OrderRowQuery) FirstID(ctx context.Context) (id int32, err error) {
	var ids []int32
	if ids, err = orq.Limit(1).IDs(setContextOp(ctx, orq.ctx, "FirstID")); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{orderrow.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (orq *OrderRowQuery) FirstIDX(ctx context.Context) int32 {
	id, err := orq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single OrderRow entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one OrderRow entity is found.
// Returns a *NotFoundError when no OrderRow entities are found.
func (orq *OrderRowQuery) Only(ctx context.Context) (*OrderRow, error) {
	nodes, err := orq.Limit(2).All(setContextOp(ctx, orq.ctx, "Only"))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{orderrow.Label}
	default:
		return nil, &NotSingularError{orderrow.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (orq *OrderRowQuery) OnlyX(ctx context.Context) *OrderRow {
	node, err := orq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only OrderRow ID in the query.
// Returns a *NotSingularError when more than one OrderRow ID is found.
// Returns a *NotFoundError when no entities are found.
func (orq *OrderRowQuery) OnlyID(ctx context.Context) (id int32, err error) {
	var ids []int32
	if ids, err = orq.Limit(2).IDs(setContextOp(ctx, orq.ctx, "OnlyID")); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{orderrow.Label}
	default:
		err = &NotSingularError{orderrow.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (orq *OrderRowQuery) OnlyIDX(ctx context.Context) int32 {
	id, err := orq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of OrderRows.
func (orq *OrderRowQuery) All(ctx context.Context) ([]*OrderRow, error) {
	ctx = setContextOp(ctx, orq.ctx, "All")
	if err := orq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*OrderRow, *OrderRowQuery]()
	return withInterceptors[[]*OrderRow](ctx, orq, qr, orq.inters)
}

// AllX is like All, but panics if an error occurs.
func (orq *OrderRowQuery) AllX(ctx context.Context) []*OrderRow {
	nodes, err := orq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of OrderRow IDs.
func (orq *OrderRowQuery) IDs(ctx context.Context) (ids []int32, err error) {
	if orq.ctx.Unique == nil && orq.path != nil {
		orq.Unique(true)
	}
	ctx = setContextOp(ctx, orq.ctx, "IDs")
	if err = orq.Select(orderrow.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (orq *OrderRowQuery) IDsX(ctx context.Context) []int32 {
	ids, err := orq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (orq *OrderRowQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, orq.ctx, "Count")
	if err := orq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, orq, querierCount[*OrderRowQuery](), orq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (orq *OrderRowQuery) CountX(ctx context.Context) int {
	count, err := orq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (orq *OrderRowQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, orq.ctx, "Exist")
	switch _, err := orq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (orq *OrderRowQuery) ExistX(ctx context.Context) bool {
	exist, err := orq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the OrderRowQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (orq *OrderRowQuery) Clone() *OrderRowQuery {
	if orq == nil {
		return nil
	}
	return &OrderRowQuery{
		config:           orq.config,
		ctx:              orq.ctx.Clone(),
		order:            append([]orderrow.OrderOption{}, orq.order...),
		inters:           append([]Interceptor{}, orq.inters...),
		predicates:       append([]predicate.OrderRow{}, orq.predicates...),
		withOrderHistory: orq.withOrderHistory.Clone(),
		withProductInfo:  orq.withProductInfo.Clone(),
		// clone intermediate query.
		sql:  orq.sql.Clone(),
		path: orq.path,
	}
}

// WithOrderHistory tells the query-builder to eager-load the nodes that are connected to
// the "order_history" edge. The optional arguments are used to configure the query builder of the edge.
func (orq *OrderRowQuery) WithOrderHistory(opts ...func(*OrderHistoryQuery)) *OrderRowQuery {
	query := (&OrderHistoryClient{config: orq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	orq.withOrderHistory = query
	return orq
}

// WithProductInfo tells the query-builder to eager-load the nodes that are connected to
// the "product_info" edge. The optional arguments are used to configure the query builder of the edge.
func (orq *OrderRowQuery) WithProductInfo(opts ...func(*ProductInfoQuery)) *OrderRowQuery {
	query := (&ProductInfoClient{config: orq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	orq.withProductInfo = query
	return orq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		OrderID string `json:"order_id,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.OrderRow.Query().
//		GroupBy(orderrow.FieldOrderID).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (orq *OrderRowQuery) GroupBy(field string, fields ...string) *OrderRowGroupBy {
	orq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &OrderRowGroupBy{build: orq}
	grbuild.flds = &orq.ctx.Fields
	grbuild.label = orderrow.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		OrderID string `json:"order_id,omitempty"`
//	}
//
//	client.OrderRow.Query().
//		Select(orderrow.FieldOrderID).
//		Scan(ctx, &v)
func (orq *OrderRowQuery) Select(fields ...string) *OrderRowSelect {
	orq.ctx.Fields = append(orq.ctx.Fields, fields...)
	sbuild := &OrderRowSelect{OrderRowQuery: orq}
	sbuild.label = orderrow.Label
	sbuild.flds, sbuild.scan = &orq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a OrderRowSelect configured with the given aggregations.
func (orq *OrderRowQuery) Aggregate(fns ...AggregateFunc) *OrderRowSelect {
	return orq.Select().Aggregate(fns...)
}

func (orq *OrderRowQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range orq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, orq); err != nil {
				return err
			}
		}
	}
	for _, f := range orq.ctx.Fields {
		if !orderrow.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if orq.path != nil {
		prev, err := orq.path(ctx)
		if err != nil {
			return err
		}
		orq.sql = prev
	}
	return nil
}

func (orq *OrderRowQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*OrderRow, error) {
	var (
		nodes       = []*OrderRow{}
		_spec       = orq.querySpec()
		loadedTypes = [2]bool{
			orq.withOrderHistory != nil,
			orq.withProductInfo != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*OrderRow).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &OrderRow{config: orq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, orq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := orq.withOrderHistory; query != nil {
		if err := orq.loadOrderHistory(ctx, query, nodes, nil,
			func(n *OrderRow, e *OrderHistory) { n.Edges.OrderHistory = e }); err != nil {
			return nil, err
		}
	}
	if query := orq.withProductInfo; query != nil {
		if err := orq.loadProductInfo(ctx, query, nodes, nil,
			func(n *OrderRow, e *ProductInfo) { n.Edges.ProductInfo = e }); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (orq *OrderRowQuery) loadOrderHistory(ctx context.Context, query *OrderHistoryQuery, nodes []*OrderRow, init func(*OrderRow), assign func(*OrderRow, *OrderHistory)) error {
	ids := make([]string, 0, len(nodes))
	nodeids := make(map[string][]*OrderRow)
	for i := range nodes {
		fk := nodes[i].OrderID
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(orderhistory.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "order_id" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}
func (orq *OrderRowQuery) loadProductInfo(ctx context.Context, query *ProductInfoQuery, nodes []*OrderRow, init func(*OrderRow), assign func(*OrderRow, *ProductInfo)) error {
	ids := make([]int32, 0, len(nodes))
	nodeids := make(map[int32][]*OrderRow)
	for i := range nodes {
		fk := nodes[i].Sku
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(productinfo.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "sku" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}

func (orq *OrderRowQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := orq.querySpec()
	_spec.Node.Columns = orq.ctx.Fields
	if len(orq.ctx.Fields) > 0 {
		_spec.Unique = orq.ctx.Unique != nil && *orq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, orq.driver, _spec)
}

func (orq *OrderRowQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(orderrow.Table, orderrow.Columns, sqlgraph.NewFieldSpec(orderrow.FieldID, field.TypeInt32))
	_spec.From = orq.sql
	if unique := orq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if orq.path != nil {
		_spec.Unique = true
	}
	if fields := orq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, orderrow.FieldID)
		for i := range fields {
			if fields[i] != orderrow.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
		if orq.withOrderHistory != nil {
			_spec.Node.AddColumnOnce(orderrow.FieldOrderID)
		}
		if orq.withProductInfo != nil {
			_spec.Node.AddColumnOnce(orderrow.FieldSku)
		}
	}
	if ps := orq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := orq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := orq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := orq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (orq *OrderRowQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(orq.driver.Dialect())
	t1 := builder.Table(orderrow.Table)
	columns := orq.ctx.Fields
	if len(columns) == 0 {
		columns = orderrow.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if orq.sql != nil {
		selector = orq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if orq.ctx.Unique != nil && *orq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range orq.predicates {
		p(selector)
	}
	for _, p := range orq.order {
		p(selector)
	}
	if offset := orq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := orq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// OrderRowGroupBy is the group-by builder for OrderRow entities.
type OrderRowGroupBy struct {
	selector
	build *OrderRowQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (orgb *OrderRowGroupBy) Aggregate(fns ...AggregateFunc) *OrderRowGroupBy {
	orgb.fns = append(orgb.fns, fns...)
	return orgb
}

// Scan applies the selector query and scans the result into the given value.
func (orgb *OrderRowGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, orgb.build.ctx, "GroupBy")
	if err := orgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*OrderRowQuery, *OrderRowGroupBy](ctx, orgb.build, orgb, orgb.build.inters, v)
}

func (orgb *OrderRowGroupBy) sqlScan(ctx context.Context, root *OrderRowQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(orgb.fns))
	for _, fn := range orgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*orgb.flds)+len(orgb.fns))
		for _, f := range *orgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*orgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := orgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// OrderRowSelect is the builder for selecting fields of OrderRow entities.
type OrderRowSelect struct {
	*OrderRowQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (ors *OrderRowSelect) Aggregate(fns ...AggregateFunc) *OrderRowSelect {
	ors.fns = append(ors.fns, fns...)
	return ors
}

// Scan applies the selector query and scans the result into the given value.
func (ors *OrderRowSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, ors.ctx, "Select")
	if err := ors.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*OrderRowQuery, *OrderRowSelect](ctx, ors.OrderRowQuery, ors, ors.inters, v)
}

func (ors *OrderRowSelect) sqlScan(ctx context.Context, root *OrderRowQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(ors.fns))
	for _, fn := range ors.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*ors.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ors.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
