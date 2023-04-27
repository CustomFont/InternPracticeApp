package main

import (
	"database/sql"
	"log"
)

// Env holds database connection to Postgres
type Env struct {
	DB *sql.DB
}

// ConnectDB tries to connect DB and on succcesful it returns
// DB connection string and nil error, otherwise return empty DB and the corresponding error.
func ConnectDB() (*sql.DB, error) {
	db, err := sql.Open("postgres", "user=postgres password=password dbname=tasks sslmode=disable")
	if err != nil {
		log.Printf("failed to connect to database: %v", err)
		return &sql.DB{}, err
	}
	return db, nil
}
