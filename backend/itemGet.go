package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (env Env) getItems(c *gin.Context) {

	rows, err := env.DB.Query("SELECT id, task, starttime, endtime FROM tasklist")
	if err != nil {
		// handle this error better than this
		panic(err)
	}
	defer rows.Close()
	a := make([]Task, 0)
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
		a = append(a, NewTask(id, task, starttime, endtime))
	}
	fmt.Println(a)
	// get any error encountered during iteration
	err = rows.Err()
	if err != nil {
		panic(err)
	}

	c.IndentedJSON(http.StatusOK, a)
}
