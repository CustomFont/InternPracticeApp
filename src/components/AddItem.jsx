import React, {useState, useContext} from 'react';
import Modal from 'react-modal';
import { ItemListContext } from '../App';

// INSERT BUTTON HERE ----->>> <<<---------
export default function AddItem() {
    const itemListContext = useContext(ItemListContext)
    const setToDoItems = itemListContext.setToDoItems;
    const toDoItems = itemListContext.toDoItems;
    Modal.setAppElement(document.getElementById('root'))

    const [item, setItem] = useState({
        "task": '',
        "startTime": '00-00-00',
        "endTime": '00-00-00'
    })

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleAddItem = (e) => {
        e.preventDefault();
        setToDoItems([...toDoItems, item]);
    }

    return (
        <>
            <button onClick={() => setModalIsOpen(true)}>Add Item</button> 
            <Modal isOpen={modalIsOpen}>
                    <button onClick={() => setModalIsOpen(!modalIsOpen)}>x</button>
                    <form onSubmit={handleAddItem}>
			            <input type='text' className='nameOfItem' placeholder='Item Name' value={item.task} onChange={(e) => [setItem(item => ({...item, "task": e.target.value}))]}></input>
                        <button type='submit'>Add</button>
                    </form>
            </Modal>
        </>
    )
}
