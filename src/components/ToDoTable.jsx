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
                    <th>id</th>
                    <th>Task</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th> </th>
                </tr>
                {toDoItems.map(item => {
                    return(
                        <tr key={item.ID}>
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
