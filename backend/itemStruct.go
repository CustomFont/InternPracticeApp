package main

type Task struct {
	ID        int
	Task      string
	Starttime string
	Endtime   string
}

// constructor for Task obj
func NewTask(id int, task string, starttime string, endtime string) Task {
	return Task{id, task, starttime, endtime}
}
