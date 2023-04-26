package main

import (
	"backend/database"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

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

func setupRoutes() {
	http.HandleFunc("/items", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Displaying test tasks")
		database := database.Tasks
		fmt.Fprintln(w, database)
	})
	// mape our `/ws` endpoint to the `serveWs` function
	http.HandleFunc("/ws", serveWs)
}

func main() {
	setupRoutes()
	fmt.Println("Listening on port 8080")
	http.ListenAndServe(":8080", nil)
}
