package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	_ "github.com/lib/pq"
)

func (env Env) deleteItem(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		e := fmt.Sprintf("received invalid id path param which is not string: %v", c.Param("id"))
		log.Println(e)
		c.IndentedJSON(http.StatusNotFound, e)
		return
	}
	env.DB.Exec(`DELETE FROM tasklist WHERE id = $1;`, id)
	if err != nil {
		e := fmt.Sprintf("error occurred while deleting record with id: %d and error is: %v", id, err)
		log.Println(e)
		c.IndentedJSON(http.StatusInternalServerError, e)
		return
	}
	m := "successfully deleted the record"
	log.Println(m)
	c.IndentedJSON(http.StatusOK, m)
}
