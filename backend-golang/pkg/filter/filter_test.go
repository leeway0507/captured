package filter

import (
	"backend/pkg/entities"
	"context"
	"testing"
)

var dbUrl = "root:@tcp(localhost:3306)/captured_dev"
var pageLimit = 50
var ctx = context.Background()
var pf = &ProductFilter{DbUrl: dbUrl, Limit: pageLimit, Ctx: ctx}

// func TestUnPackFilter(t *testing.T) {
// 	defaultFilter := Filter{Brand: &[]string{"patagonia", "clarks originals"}}
// 	data := pf.unPackFilter(&defaultFilter)

//		t.Logf("filter Query : %v", data.Where[0])
//	}
// func TestFilter(t *testing.T) {
// 	defaultFilter := Filter{Brand: &[]string{"patagonia"}, Price: [2]int32{150000, 300000}}
// 	data, _ := pf.FilterData(&defaultFilter)

//		t.Log(len(data))
//		for _, d := range data {
//			t.Log(d.ID)
//		}
//	}
func TestFilterTwo(t *testing.T) {
	defaultFilter := entities.Filter{Brand: &[]string{"patagonia"}}
	data, _ := pf.FilterDataTwo(&defaultFilter)

	t.Log(len(data))

	for _, d := range data {
		t.Log(d.Price)
	}
}

// func TestNoFilterData(t *testing.T) {
// 	data, err := pf.NoFilterData()

// 	if err != nil {
// 		t.Errorf("Error occurred during filtering: %v", err)
// 		return
// 	}

// 	if len(data) > 0 {
// 		t.Logf("cardArr Len : %v", len(data))
// 	} else {
// 		t.Errorf("Expected %d data", pageLimit)
// 	}
// }

// func TestSplitData(t *testing.T) {

// 	data, _ := pf.NoFilterData()
// 	pageBox, err := pf.SplitData(data)

// 	if err == nil {
// 		t.Logf("cardArr Len : %v", len(data))
// 		for key := range pageBox {
// 			t.Logf("pageBox Page : %v", (key))
// 		}
// 	}

// }

// func TestNoFilter(t *testing.T) {

// 	data, _, err := pf.NoFilter(1)

// 	if err != nil {
// 		t.Errorf("Error occurred during filtering: %v", err)
// 		return
// 	}

// 	if len(data) > 0 {
// 		t.Logf("cardArr Len : %v", len(data))
// 	} else {
// 		t.Errorf("Expected %d : current %d", pageLimit, len(data))
// 	}

// 	_, cacheHit, _ := pf.NoFilter(1)

// 	if cacheHit == false {
// 		t.Error("cache doesn't work")
// 	}

// }
