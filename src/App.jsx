import React, {createContext, useState, useEffect} from "react";
import ToDoTable from "./components/ToDoTable";
import AddItem from "./components/AddItem";
import { connect } from "./api/index.js";
import './App.css';

export const ItemListContext = createContext([])


export default function App() {
    const [toDoItems, setToDoItems] = useState([])
    useEffect(() => {
        connect();
    }, []);


    return (
        <>
            <h1>Task List</h1>
            <ItemListContext.Provider value={{setToDoItems, toDoItems}}>
                <ToDoTable />
                <AddItem />
            </ ItemListContext.Provider>
        </>
    )
}
