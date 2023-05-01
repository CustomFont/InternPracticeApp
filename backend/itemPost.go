//POST task
//Create new tasks

package main

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)

type CreateTask struct {
	Task string `json:"task" binding:"required"`
	StartTime string `json:"starttime" binding:"required"`
	EndTime string `json:"endtime" binding:"required"`
}

	insert, err := env.DB.Query("SELECT id, task, starttime, endtime FROM tasklist LIMIT $1", 3)
