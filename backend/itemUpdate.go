package main

import (
	"strconv"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	_ "github.com/lib/pq"
)

func (env Env) updateItem(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	var updateTask Task
	if err := c.BindJSON(&updateTask); err != nil {
		log.Printf("invalid JSON body: %v", err)
		c.IndentedJSON(http.StatusNotFound, err.Error())
		return
	}

	res, err := env.DB.Exec(`UPDATE tasklist SET task = $1, starttime = $2, endtime = $3 where id = $4`, updateTask.Task, updateTask.Starttime, updateTask.Endtime, id)
	if err != nil {
		log.Printf("error occurred while updating record on tasklist table: %v", err)
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
		e := "could not update the record, please try again after sometime"
		log.Println(e)
		c.IndentedJSON(http.StatusInternalServerError, e)
		return
	}
	message := "successfully updated the record"
	log.Println(message)
	c.IndentedJSON(http.StatusOK, message)
}
