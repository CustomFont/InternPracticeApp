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
	const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}`

	const [data, setData] = useState([])

	const [item, setItem] = useState({
		"task": '',
		"startTime": newDate,
		"endTime": newDate
	})

	const handleUpdate = (e) => {
		axios.put(`http://localhost:8080/updateItem/${id}`, {
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

	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		async function fetchData() {
			let result = await axios('http://localhost:8080/items')
			for (let i = 0; i < result.data.length; i++) {
			    let item = { "task": result.data[i].Task, "startTime": result.data[i].Starttime, "endTime": result.data[i].Endtime };
		  	    setData(data => [...data, item])
			}
		}
		fetchData()
	}, []);

    return(
	    <>
            <button onClick={() => setModalIsOpen(true)}>Edit</button>
		    <Modal className='taskModal' id='task-modal' isOpen={modalIsOpen} ariaHideApp={false}>
			    <button className='xButton' onClick={() => setModalIsOpen(!modalIsOpen)}>x</button>
			    <form className='modalForm' data-testid='modalForm'>
					    <label role='label'>Task</label>
				<input type='text' className='inputTask' defaultValue={data.task} value={data.task} onChange={(e) => [setItem(item => ({...item, "task": e.target.value}))]}></input>
				<label role='label'>Start Time</label>
				<input type='datetime-local' role='input' className='inputStartTime' defaultValue={data.startTime} value={item.startTime} onChange={(e) => [setItem(item => ({...item, "startTime": e.target.value}))]}></input>
				<label role='label'>End Time</label>
				<input type='datetime-local' role='input' className='inputEndTime' defaultValue={data.endTime} value={item.endTime} onChange={(e) => [setItem(item => ({...item, "endTime": e.target.value}))]}></input>
				<br />
				<button onClick={()=>handleUpdate(id)}>Update</button>
			    </form>
		    </Modal>
	    </>
    )
}
