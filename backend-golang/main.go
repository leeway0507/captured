package main

import (
	"backend/filter"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	dbUrl := "root:@tcp(localhost:3306)/captured_dev"
	pf := &filter.ProductFilter{DbUrl: dbUrl}

	productArr, err := pf.Filter()

	if err == nil {
		fmt.Println(productArr[0].Brand)
	} else {
		fmt.Println("Failed to Load")
	}

}
