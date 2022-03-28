import React, { Fragment } from 'react'
import type { NextPage } from 'next'
import { EventItem } from '../../dummyData'
import EventList from '../../components/events/EventList';
import { getAllEvents } from '../../helpers/api.util';
import { useRouter } from 'next/router';
import EventSearch from '../../components/events/EventSearch';

interface AllEventsPageProps {
    events: EventItem[]
}

const AllEventsPage: NextPage<AllEventsPageProps> = ({ events }) => {
    const router = useRouter();

    const findEventsHandler = (selectedYear: string, selectedMonth: string) => {

        const fullPath = `/events/${selectedYear}/${selectedMonth}`

        router.push(fullPath)
    }

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler} />
            <EventList eventsArray={events} />
        </Fragment>
    );
}

export default AllEventsPage;

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events,
        },
        revalidate: 60,
    }
}