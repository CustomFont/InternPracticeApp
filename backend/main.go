package main

import (
	"fmt"
	"log"
	"net/http"
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	_ "github.com/lib/pq"
	  "github.com/gin-contrib/cors"

)


type Task struct {
	task      string
	starttime string
	endtime   string
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	CheckOrigin: func(r *http.Request) bool { return true },
}

func reader(conn *websocket.Conn) {
	for {
		// read in a message
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// print out that message for clarity
		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}

	}
}

// define our WebSocket endpoint
func serveWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	// upgrade this connection to a WebSocket
	// connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	// listen indefinitely for new messages coming
	// through on our WebSocket connection
	reader(ws)
}


func database() {
}
func main() {
	connectionStr := "user=postgres password=password dbname=tasks sslmode=disable"

	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "some basic data"})
	})
	
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
	r.GET("/items", func(c *gin.Context) {
	for rows.Next() {
		var id string
		var task string
		var starttime string
		var endtime string
		err = rows.Scan(&id, &task, &starttime, &endtime)
		if err != nil {
			// handle this error
			panic(err)
		}
		fmt.Println(id, task)
		c.JSON(http.StatusOK, gin.H{id:task})
	}
	})
	// get any error encountered during iteration
	err = rows.Err()
	if err != nil {
		panic(err)
	}



	r.Run()
	fmt.Println("Listening on port 8080")
}
