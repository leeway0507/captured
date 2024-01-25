package routes

import (
	"backend/api/handlers"
	"backend/pkg/filter"

	"github.com/gofiber/fiber/v2"
)

func FilterRouter(app fiber.Router, ProductFilter filter.ProductFilter) {

	app.Post("/filter", handlers.GetCards(ProductFilter))
}
