import React, {useState, useContext} from 'react';
import Modal from 'react-modal';
import { ItemListContext } from '../App';

export default function AddItem() {
    const itemListContext = useContext(ItemListContext)
    const setToDoItems = itemListContext.setToDoItems;
    const toDoItems = itemListContext.toDoItems;
    Modal.setAppElement(document.getElementById('root'))

    const [item, setItem] = useState({
        "task": '',
        "startTime": new Date(),
        "endTime": new Date()
    })

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setToDoItems([...toDoItems, item]);
        setModalIsOpen(false);
    }

    return (
        <>
            <button onClick={() => setModalIsOpen(true)}>Add Item</button>
            <Modal id='task-modal' isOpen={modalIsOpen} ariaHideApp={false}>
                    <button onClick={() => setModalIsOpen(!modalIsOpen)}>x</button>
                    <form data-testid='modalForm' onSubmit={handleSubmit}>
			            <label role='label'>Task</label>
                        <input type='text' className='inputTask' placeholder='Item Name' value={item.task} onChange={(e) => [setItem(item => ({...item, "task": e.target.value}))]}></input>
                        <label role='label'>Start Time</label>
                        <input type='datetime-local' role='input' className='inputStartTime' value={item.startTime} onChange={(e) => [setItem(item => ({...item, "startTime": e.target.value}))]}></input>
                        <label role='label'>End Time</label>
                        <input type='datetime-local' role='input' className='inputEndTime' value={item.endTime} onChange={(e) => [setItem(item => ({...item, "endTime": e.target.value}))]}></input>
                        <button type='submit' className='submitButton'>Add</button>
                    </form>
            </Modal>
        </>
    )
}
