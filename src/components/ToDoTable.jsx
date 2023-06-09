import React, {useContext} from 'react';
import { ItemListContext } from '../App';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';

export default function ToDoTable() {
    const itemListContext = useContext(ItemListContext)
    const toDoItems = itemListContext.toDoItems;

    return(
        <table>
            <tbody>
                <tr>
                    <th>Item No.</th>
                    <th>id</th>
                    <th>Task</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th> </th>
                </tr>
                {toDoItems.map(item => {
                    return(
                        <tr key={toDoItems.indexOf(item) + 1}>
                            <td>{toDoItems.indexOf(item)+1}</td>
                            <td>{item.ID}</td>
                            <td>{item.task}</td>
                            <td>{item.startTime}</td>
                            <td>{item.endTime}</td>
                            <td><DeleteButton id={item.ID}>x</DeleteButton> <UpdateButton id={item.ID}>Edit</UpdateButton></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
