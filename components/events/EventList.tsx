import React from 'react'
import { EventItem } from '../../dummyData'
import EventItemComponent from './EventItem'
import classes from './EventList.module.css';

interface EventListProps {
    eventsArray: EventItem[]
}

const EventList: React.FC<EventListProps> = ({ eventsArray }) => {

    if (eventsArray.length === 0 || !eventsArray) {
        return <p>Loading</p>
    }

    return (
        <ul className={classes.list}>
            {eventsArray?.map(item => <EventItemComponent key={item.id} eventItem={item} />)}
        </ul>
    )
}

export default EventList