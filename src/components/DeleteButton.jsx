import React from 'react';
import axios from 'axios';

export default function DeleteButton(props){
    let id = props.id

    const handleDelete = (e) => {
        axios.delete(`http://localhost:8080/deleteItem/${id}`)
        window.location.reload();
    }

    return(
        <button onClick={()=>handleDelete(id)}>x</button>
    )
}