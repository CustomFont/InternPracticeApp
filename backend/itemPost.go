package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func (env Env) postItem(c *gin.Context) {
	var newTask Task
	if err := c.BindJSON(&newTask); err != nil {
		log.Printf("invalid JSON body: %v", err)
		c.IndentedJSON(http.StatusNotFound, err.Error())
		return
	}

	res, err := env.DB.Exec(`INSERT INTO tasklist(task,starttime,endtime) VALUES($1,$2,$3) ON CONFLICT DO NOTHING`, newTask.Task, newTask.Starttime, newTask.Endtime)
	if err != nil {
		log.Printf("error occurred while inserting new record into tasklist table: %v", err)
		c.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	n, err := res.RowsAffected()
	if err != nil {
		log.Printf("error occurred while checking the returned result from database after insertion: %v", err)
		c.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	if n == 0 {
		e := "could not insert the record, please try again after sometime"
		log.Println(e)
		c.IndentedJSON(http.StatusInternalServerError, e)
		return
	}
	message := "successfully created the record"
	log.Println(message)
	c.IndentedJSON(http.StatusOK, message)
}
