import React, {createContext, useState} from "react";
import ToDoTable from "./components/ToDoTable";
import AddItem from "./components/AddItem";

export const ItemListContext = createContext([])

export default function App() {
    const [toDoItems, setToDoItems] = useState([])

    return (
        <ItemListContext.Provider value={{setToDoItems, toDoItems}}>
            <ToDoTable />
            <AddItem />
        </ ItemListContext.Provider>
    )
}
