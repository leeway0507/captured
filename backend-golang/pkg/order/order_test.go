package order

import (
	"backend/ent"
	"backend/ent/enttest"
	"backend/pkg/entities"
	"backend/test_utils/assert"
	"backend/test_utils/mockdb"
	"context"
	"testing"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

func Test_CheckSize(t *testing.T) {
	ctx := context.Background()
	session := enttest.Open(t, "sqlite3", "file:ent?mode=memory&_fk=1")
	defer session.Close()

	mockdb.InsertTestProductInfoData(t, session)
	mockdb.InsertTestSizeData(t, session)

	req := entities.SizeCheckForm{
		Form: &[]string{"1-240", "1-250", "1-255"},
		Sku:  &[]int32{1},
	}

	sizeCheckImpl := &SizeCheck{Session: session, SizeCheckForm: req}

	t.Run("Test_GetCurrentSkuSize", func(t *testing.T) {
		want := []string{"1-225", "1-250", "1-255", "1-260"}

		got, _ := sizeCheckImpl.GetCurrentSkuSize(ctx)

		assert.Equal(t, got, want)
	})
	t.Run("Test_Validate", func(t *testing.T) {
		want := map[string]bool{"1-240": false, "1-250": true, "1-255": true}

		got, _ := sizeCheckImpl.Validate(ctx)

		assert.Equal(t, got, want)
	})

	reqErr := entities.SizeCheckForm{
		Form: &[]string{"1-290"},
		Sku:  &[]int32{1},
	}

	sizeCheckImplErr := &SizeCheck{Session: session, SizeCheckForm: reqErr}

	t.Run("Test_Validate_to_None_exist_Size", func(t *testing.T) {
		want := map[string]bool{"1-290": false}
		got, _ := sizeCheckImplErr.Validate(ctx)
		assert.Equal(t, got, want)
	})
}

func Test_PreOrder(t *testing.T) {
	// ctx := context.Background()
	session := enttest.Open(t, "sqlite3", "file:ent?mode=memory&_fk=1")
	defer session.Close()

	ordRows := []entities.OrderRows{}
	x := entities.OrderRows{
		OrderID:  "p2wyLRNFnNTX82wMDh7B4",
		Sku:      1,
		Size:     "240",
		Quantity: 1,
	}

	ordRows = append(ordRows, x)

	preOrder := entities.PreOrder{
		OrderID:   "p2wyLRNFnNTX82wMDh7B4",
		AddressId: "UA-6x8w1PfgbrODnDE2F0ZrCE0frvBVLAITJgPVLlXHyYc-0",
		Amount:    213000,
		Arr:       &ordRows,
	}

	t.Run("Test_Save", func(t *testing.T) {
		len := SavePreOrder(preOrder)
		if len != 1 {
			t.Error("Saving Failed")
		}
	})
	t.Run("Test_Load", func(t *testing.T) {
		got, err := LoadPreOrder(preOrder.OrderID)

		if err != nil {
			t.Error(err.Error())
		}
		assert.Equal(t, *got, preOrder)
	})
	t.Run("Test_Load_Twice", func(t *testing.T) {
		got, err := LoadPreOrder(preOrder.OrderID)

		if err != nil {
			t.Error(err.Error())
		}
		assert.Equal(t, *got, preOrder)
	})

	ordHist := entities.OrderHistoryReq{
		OrderID:         "p2wyLRNFnNTX82wMDh7B4",
		PaymentKey:      "gpMwnkjKyO6BYq7GWPVvGQNGvPqwKLrNE5vbo1d4JlALRXxz",
		OrderedAt:       time.Date(2023, time.December, 20, 11, 33, 44, 0, time.UTC),
		OrderTotalPrice: 244000,
		PaymentMethod:   "카드",
		PaymentInfo:     "51404300****145*",
	}
	y := ent.OrderHistory{
		UserID:          "asd",
		AddressID:       "asd",
		OrderedAt:       time.Date(2023, time.December, 20, 11, 33, 44, 0, time.UTC),
		UserOrderNumber: 1,
		OrderStatus:     "배송준비",
		OrderTotalPrice: 244000,
		PaymentMethod:   "카드",
		PaymentStatus:   "승인완료",
		PaymentInfo:     "51404300****145*",
		PaymentKey:      "asd",
	}

}
