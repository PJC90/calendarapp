import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { useEffect, useState } from 'react'
import CustomModal from './CustomModal'

function CustomCalendar() {
    const [groups, setGroups] = useState([
        { id: 1, title: 'group 1' }, 
        { id: 2, title: 'group 2' }
    ])

    const [items, setItems] = useState([
        {
            id: 1,
            group: 1,
            title: 'item 1',
            start_time: moment(),
            end_time: moment().add(1, 'hour')
          },
          {
            id: 2,
            group: 2,
            title: 'item 2',
            start_time: moment().add(-0.5, 'hour'),
            end_time: moment().add(0.5, 'hour')
          },
          {
            id: 3,
            group: 1,
            title: 'item 3',
            start_time: moment().add(2, 'hour'),
            end_time: moment().add(3, 'hour')
          }
    ])

    const [newItem, setNewItem] = useState({})
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [groupIdAddForm, setGroupIdAddForm] = useState(0)
    const [timeAddForm, setTimeAddForm] = useState(0)

    useEffect(() => {
        console.log(items)
    },[items])


    const handleItemResize = (itemId, time,edge) => {
        let item = items.filter(elem => elem.id === itemId)[0]
        let filteredItems = items.filter(elem => elem.group === item.group)

        for(let elem of filteredItems) {
            if(elem.id === itemId) continue;
            if((edge === 'left' && time > elem.start_time && time < elem.end_time) || (edge === 'right' && time < elem.end_time && time > elem.start_time)) {
                alert('errore')
                return
            }
            if(edge === 'left' && time < elem.start_time && item.end_time > elem.end_time) {
                alert('errore da sinistra')
                return
            }
            if(edge === 'right' && item.start_time < elem.start_time && time > elem.end_time) {
                alert('errore da destra')
                return
            }
        }

        setItems(items.map(elem => elem.id === itemId ? 
            {
                ...elem,
                [edge === 'left' ? 'start_time' : 'end_time']: time
            }
            : elem))
    }

    const handleItemMove = (itemId, dragTime, newGroupOrder) => {
        setItems(items.map(elem => elem.id === itemId ? 
            {
                ...elem,
                group: groups[newGroupOrder].id,
                start_time: moment(dragTime),
                end_time: moment(dragTime).add(elem.end_time - elem.start_time, 'millisecond').toDate()
            }
            : elem))
    }

    const handleCanvasClick = (groupId, time, e) => {
        setIsAddModalVisible(true)
        setGroupIdAddForm(groupId)
        setTimeAddForm(time)
    }
    
    return (
        <>
            <Timeline
                groups={groups}
                items={items}
                canResize='both'
                defaultTimeStart={moment().startOf('day')}
                defaultTimeEnd={moment().endOf('day')}
                onItemResize={handleItemResize}
                onItemMove={handleItemMove}
                onCanvasClick={handleCanvasClick}
            />
            {isAddModalVisible && <CustomModal groupId={groupIdAddForm} time={timeAddForm} items={items} setItems={setItems} setShow={setIsAddModalVisible}/>}
        </>
    )
}

export default CustomCalendar;