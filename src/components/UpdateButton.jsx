import React, {useState, useContext, useEffect} from 'react';
import { ItemListContext } from '../App';
import Modal from 'react-modal';
import axios from 'axios';

export default function UpdateButton(props){
    const itemListContext = useContext(ItemListContext)
    const setToDoItems = itemListContext.setToDoItems;
    const toDoItems = itemListContext.toDoItems;
    Modal.setAppElement(document.getElementById('root'))
    let id = props.id

    const date = new Date()
    const newDate = `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${("0" + date.getDay()).slice(-2)}T${date.getHours()}:${("0" + date.getMinutes()).slice(-2) }`
    
    const [currID, setCurrID] = useState(undefined);
	const [item, setItem] = useState({
        "Task": '',
        "Starttime": newDate,
        "Endtime": newDate
    })
    const emptyItem = {
        "Task": '',
        "Starttime": newDate,
        "Endtime": newDate
    }
    useEffect(()=>{
        if (currID != undefined){
            axios.get(`http://localhost:8080/items/${id}`)
                .then((response) => {
                    setItem(response.data[0]);
                })
                .then(()=>{
                    setModalIsOpen(true)
                })
            
        }
    }, [currID])

    const handleUpdate = (e) => {
        axios.put(`http://localhost:8080/updateItem/${id}`, {
            "task": item.Task,
            "startTime": item.Starttime,
            "endTime": item.Endtime,
        })
            .then(setItem(emptyItem))
        setModalIsOpen(false);
        setCurrID(undefined);
        window.location.reload();
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeWithoutUpdate = () => {
        setCurrID(undefined)
        setItem(emptyItem)
        setModalIsOpen(!modalIsOpen)
    }

    return(
	    <>
            <button 
                onClick={() => {
                    setCurrID(id)
                }}
            >
                Edit
            </button>
		    <Modal className='taskModal' id='task-modal' isOpen={modalIsOpen} ariaHideApp={false}>
                <button className='xButton' onClick={() => closeWithoutUpdate()}>x</button>
			    <form className='modalForm' data-testid='modalForm'>
                    <label role='label'>Task</label>
                    <input type='text' className='inputTask' placeholder='Item Name' defaultValue={item.Task} onChange={(e) => [setItem(item => ({ ...item, "Task": e.target.value}))]}></input>
                    <label role='label'>Start Time</label>
                    <input type='datetime-local' role='input' className='inputStartTime' defaultValue={item.Starttime} onChange={(e) => [setItem(item => ({ ...item, "Starttime": e.target.value}))]}></input>
                    <label role='label'>End Time</label>
                    <input type='datetime-local' role='input' className='inputEndTime' defaultValue={item.Endtime} onChange={(e) => [setItem(item => ({ ...item, "Endtime": e.target.value}))]}></input>
                    <br />
                    <button onClick={()=>handleUpdate(id)}>Update</button>
			    </form>
		    </Modal>
	    </>
    )
}
