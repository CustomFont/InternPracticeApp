package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type Task struct {
	task      string
	starttime string
	endtime   string
}

func main() {
	connectionStr := "user=postgres password=password dbname=tasks sslmode=disable"

	db, err := sql.Open("postgres", connectionStr)
	if err != nil {
		log.Fatal(err)
	}
	rows, err := db.Query("SELECT id, task, starttime, endtime FROM tasklist LIMIT $1", 3)
	if err != nil {
		// handle this error better than this
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var task string
		var starttime string
		var endtime string
		err = rows.Scan(&id, &task, &starttime, &endtime)
		if err != nil {
			// handle this error
			panic(err)
		}
		fmt.Println(id, task)
	}
	// get any error encountered during iteration
	err = rows.Err()
	if err != nil {
		panic(err)
	}
}
