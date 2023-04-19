import React, {useContext} from 'react';
import { ItemListContext } from '../App';

export default function ToDoTable() {
    const itemListContext = useContext(ItemListContext)
    const toDoItems = itemListContext.toDoItems;

    return(
        <table>
            <tbody>
                <tr>
                    <th>id</th>
                    <th>Task</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tr>
                {toDoItems.map(item => {
                    return(
                        <tr key={toDoItems.indexOf(item)}>
                            <td>{toDoItems.indexOf(item)}</td>
                            <td>{item.task}</td>
                            <td>{item.startTime}</td>
                            <td>{item.endTime}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
