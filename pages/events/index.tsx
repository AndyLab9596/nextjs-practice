import React from 'react'
import type { NextPage } from 'next'
import { getFeaturedEvents } from '../../dummyData'
import EventList from '../../components/events/EventList';

const AllEventsPage: NextPage = () => {
    const featuredEvent = getFeaturedEvents();


    return (
        <div>
            <ul>
                <EventList eventsArray={featuredEvent} />
            </ul>
        </div>
    )
}

export default AllEventsPage