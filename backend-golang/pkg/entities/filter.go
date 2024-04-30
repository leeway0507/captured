package entities

import (
	"backend/ent"
)

type Filter struct {
	SortBy       string
	Category     *string
	CategorySpec *[]string
	Brand        *string
	Intl         string
	Price        [2]int32
	SizeArray    *string
}

type PageBook map[int]CardArr

type CardArr []*ent.ProductInfo

type FilterResopnse struct {
	Data        CardArr
	CurrentPage int
	LastPage    int
	FromCahce   bool
	Err         error
}
