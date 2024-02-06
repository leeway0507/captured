package db

import (
	"backend/ent"
	"fmt"
	"log"
	"os"

	"entgo.io/ent/dialect"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func Session() *ent.Client {
	// load Env File

	client, err := ent.Open(dialect.MySQL, DBUrl())

	if err != nil {
		log.Fatalf("failed opening connection to mysql: %v", err)
		return nil
	}

	return client
}

func DBUrl() string {
	// env := os.Getenv("FOO_ENV")
	// if "" == env {
	// 	env = "development"
	// }
	default_path := "/Users/yangwoolee/repo/captured/main/backend-golang/.env.dev"
	if err := godotenv.Load(default_path); err != nil {
		log.Fatal("Error loading .env file")
	}
	DB_USER_NAME := os.Getenv("DB_USER_NAME")
	DB_PASSWORD := os.Getenv("DB_PASSWORD")
	DB_HOST := os.Getenv("DB_HOST")
	DB_NAME := os.Getenv("DB_NAME")

	return fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", DB_USER_NAME, DB_PASSWORD, DB_HOST, DB_NAME)
}
