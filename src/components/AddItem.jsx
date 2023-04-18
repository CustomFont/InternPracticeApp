import React, {useState} from 'react';
import Modal from 'react-modal';

// INSERT BUTTON HERE ----->>> <<<---------
export default function AddItem() {
    Modal.setAppElement(document.getElementById('root'))

    // const [item, setItem] = useState({
    //     "ID": 0,
    //     "task": '',
    //     "start-time": 00-00-00,
    //     "end-time": 00-00-00
    // })
    const [modalIsOpen, setModalIsOpen] = useState(false);
   
    const handleAddItem = (e) => {
        setItem(e.target.value)
    }

    return (
        <>
            <button onClick={() => setModalIsOpen(true)}>Add Item</button> 
            <Modal isOpen={modalIsOpen}>
                    <button onClick={() => setModalIsOpen(!modalIsOpen)}>x</button>
                    <form>
                        
                    </form>
            </Modal>
        </>
    )
}
