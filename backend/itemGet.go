package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

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

func (env Env) getItemByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		e := fmt.Sprintf("received invalid id path param which is not string: %v", c.Param("id"))
		log.Println(e)
		c.IndentedJSON(http.StatusNotFound, e)
		return
	}
	entry, err := env.DB.Query("SELECT id, task, starttime, endtime FROM tasklist WHERE id = $1", id)
	if err != nil {
		// handle this error better than this
		panic(err)
	}
	defer entry.Close()
	a := make([]Task, 0)
	for entry.Next() {
		var id int
		var task string
		var starttime string
		var endtime string
		err = entry.Scan(&id, &task, &starttime, &endtime)
		if err != nil {
			// handle this error
			panic(err)
		}
		a = append(a, NewTask(id, task, starttime, endtime))
	}
	c.IndentedJSON(http.StatusOK, a)
}
