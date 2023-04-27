import React, {useState, useContext, useEffect} from 'react';
import Modal from 'react-modal';
import { ItemListContext } from '../App';
import axios from 'axios';


export default function AddItem() {
    const itemListContext = useContext(ItemListContext)
    const setToDoItems = itemListContext.setToDoItems;
    const toDoItems = itemListContext.toDoItems;
    Modal.setAppElement(document.getElementById('root'))

    // init & format placeholder dates
    const date = new Date()
    const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}`

    const [item, setItem] = useState({
        "task": '',
        "startTime": newDate,
        "endTime": newDate
    })

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // grab tasks from database on render
    useEffect(()=>{
        console.log('render useEffect')
        axios('http://localhost:8080/items')
            .then(response => response.data)
            .then(data => {
                console.log('Success:', data);
                for (let i = 0; i < data.length; i++) {
                    let item = { "task": data[i].Task, "startTime": data[i].Starttime, "endTime": data[i].Endtime };
                    setToDoItems(toDoItems => [...toDoItems, item])
                }
            }
        )
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setToDoItems([...toDoItems, item]);
        setModalIsOpen(false);
    }

    return (
        <>
            <button onClick={() => setModalIsOpen(true)}>Add Item</button>
            <Modal className='taskModal' id='task-modal' isOpen={modalIsOpen} ariaHideApp={false}>
                    <button className='xButton' onClick={() => setModalIsOpen(!modalIsOpen)}>x</button>
                    <form className='modalForm' data-testid='modalForm' onSubmit={handleSubmit}>
			            <label role='label'>Task</label>
                        <input type='text' className='inputTask' placeholder='Item Name' value={item.task} onChange={(e) => [setItem(item => ({...item, "task": e.target.value}))]}></input>
                        <label role='label'>Start Time</label>
                        <input type='datetime-local' role='input' className='inputStartTime' value={item.startTime} onChange={(e) => [setItem(item => ({...item, "startTime": e.target.value}))]}></input>
                        <label role='label'>End Time</label>
                        <input type='datetime-local' role='input' className='inputEndTime' value={item.endTime} onChange={(e) => [setItem(item => ({...item, "endTime": e.target.value}))]}></input>
                        <br />
                        <button type='submit' className='submitButton'>Add</button>
                    </form>
            </Modal>
        </>
    )
}
