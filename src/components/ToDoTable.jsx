import React, {useState, useEffect} from 'react';

export default function ToDoTable() {

    const tableContents = () => {
        return(
            <tr>
                <th>id</th>
                <th>Task</th>
                <th>Start Time</th>
                <th>End Time</th>
            </tr>
        )
    }

    return(
        <table>
            <tbody>
                {tableContents()}
                <tr>
                    <td>0</td>
                    <td>task1</td>
                    <td>00:01</td>
                    <td>00:02</td>
                </tr>
            </tbody>
        </table>
    )
}
