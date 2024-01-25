package handlers

import (
	"backend/pkg/entities"
	"backend/pkg/filter"

	"net/http"

	"github.com/gofiber/fiber/v2"
)

// ListAccounts godoc
// @Summary      Filter
// @Accept       json
// @Produce      json
// @Param        filter	body entities.Filter true "Filter Body"
// @Success      200  {array}   filter.CardArr
// @Failure      400  {int}  http.StatusBadRequest
// @Failure      404  {int}  http.NotFound
// @Failure      500  {int}  http.StatusInternalServerError
// @Router       /api/filter [post]
func GetCards(ProductFilter filter.ProductFilter) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var requestBody entities.Filter
		err := c.BodyParser(&requestBody)

		if err != nil {
			c.Status(http.StatusBadRequest)
			return c.JSON(fiber.Map{"body": "BodyParser Error"})
		}
		data, err := ProductFilter.FilterDataTwo(&requestBody)
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return c.JSON(fiber.Map{"body": "ProductFilter.FilterData Error"})

		}
		return c.JSON(fiber.Map{"data": data})
	}
}
