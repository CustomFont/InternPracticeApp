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
    const newDate = `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${("0" + date.getDay()).slice(-2)}T${date.getHours()}:${("0" + date.getMinutes()).slice(-2) }`

    const [item, setItem] = useState({
        "task": '',
        "startTime": newDate,
        "endTime": newDate
    })

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(()=>{
        axios('http://localhost:8080/items')
            .then(response => response.data)
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    let item = { "ID": data[i].ID, "task": data[i].Task, "startTime": data[i].Starttime, "endTime": data[i].Endtime };
                    setToDoItems(toDoItems => [...toDoItems, item])
                }
            }
        )
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/addItem', {
            "task": item.task,
            "starttime": item.startTime,
            "endtime": item.endTime,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setModalIsOpen(false);
        window.location.reload();
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
