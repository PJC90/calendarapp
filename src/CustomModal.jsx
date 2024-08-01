// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import PropTypes, { func } from 'prop-types'
//npm i prop-types

import { useState } from "react";
import moment from 'moment'


function CustomModal({groupId, time, items, setItems, setShow}) {
    const [eventName, setEventName] = useState('')
    const [days,setDays] = useState(0)
    const [hours, setHours] = useState(1)
    const [minutes,setMinutes] = useState(0)

    const addEvent = (e) => {
        e.preventDefault()
        let item = {
            id: items[items.length - 1].id + 1,
            group: groupId,
            title: eventName,
            start_time: moment(time),
            end_time: moment(time).add(days, 'day').add(hours, 'hour').add(minutes, 'minute').toDate()
        }
        setItems([...items, item])
        setShow(false)
    }

    return (
        <form onSubmit={addEvent} className="m-3" style={{border: '2px solid black'}}>
            <label>Event name</label>
            <input 
                placeholder="Insert event name" 
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="m-3"
            />
            <label>Days</label>
            <input 
                type="number" 
                placeholder="insert days"
                value={days}
                onChange={(e) => setDays(e.target.value)} 
                className="m-3"
            />
            <label>Hours</label>
            <input 
                type="number" 
                placeholder="insert hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)} 
                className="m-3"
                />
            <label>Minutes</label>
            <input
                type="number" 
                placeholder="insert minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)} 
                className="m-3"
                />
            <button type="submit">Add event</button>
        </form>
    )
}

CustomModal.propTypes = {
    groupId: PropTypes.number,
    time: PropTypes.number,
    items: PropTypes.array,
    setItems: PropTypes.func,
    setShow: PropTypes.func
}




// function CustomModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

export default CustomModal;