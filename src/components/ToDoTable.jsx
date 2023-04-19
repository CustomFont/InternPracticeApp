import React, {useState, useContext} from 'react';
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
                    console.log(item)
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

//return list.map(data => {
//     return (
//         <tr key={data.DODID}>
//             <td>{data.rank}</td>
//             <td>{data.last_name}</td>
//             <td>{data.first_name}</td>
//             <td>{data.mos}</td>
//             <td>{data.phone_number.toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</td>
//             <td>{data.address}</td>
//         </tr>
//     )
// })
