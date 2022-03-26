import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById } from '../../dummyData';

const EventDetailPage: NextPage = () => {
    const router = useRouter();
    const query = router.query
    const eventPicked = getEventById(query.eventId as string);

    if (!eventPicked) {
        return (
            <p>No Event Found</p>
        )
    }
    return (
        <Fragment>
            <EventSummary title={eventPicked.title} />
            <EventLogistics date={eventPicked.date} address={eventPicked.location} image={eventPicked.image} imageAlt={eventPicked.title} />
            <EventContent>
                <p>{eventPicked.description}</p>
            </EventContent>
        </Fragment>
    )
}

export default EventDetailPage