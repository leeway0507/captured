package main

import (
	"backend/api/routes"
	"backend/pkg/filter"
	"context"
	"log"

	_ "backend/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

// @title CAPTURED BACKEND
// @version 1.0
// @description This is a sample swagger for Fiber
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email fiber@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:8001
// @BasePath /

func main() {
	app := fiber.New()

	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.SendString("Hello, World 👋!")
	})
	app.Get("/docs/*", swagger.HandlerDefault) // default

	dbUrl := "root:@tcp(localhost:3306)/captured_dev"
	pageLimit := 50
	ctx := context.Background()
	pf := filter.ProductFilter{DbUrl: dbUrl, Limit: pageLimit, Ctx: ctx}
	api := app.Group("/api")
	routes.FilterRouter(api, pf)

	log.Fatal(app.Listen(":8001"))
}
