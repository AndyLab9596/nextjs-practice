import { GetStaticPropsContext, NextPage, PreviewData } from 'next';
// import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment } from 'react';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { EventItem } from '../../dummyData';
// import { getEventById } from '../../dummyData';
import { getEventById, getFeaturedEvents } from '../../helpers/api.util';

interface EventDetailPageProps {
    eventPicked: EventItem
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ eventPicked }) => {


    if (!eventPicked) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Fragment>
            <EventSummary title={eventPicked.title} />
            <EventLogistics
                date={eventPicked.date}
                address={eventPicked.location}
                image={eventPicked.image}
                imageAlt={eventPicked.title} />
            <EventContent>
                <p>{eventPicked.description}</p>
            </EventContent>
        </Fragment>
    )
}

export default EventDetailPage;

export async function getStaticProps(context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) {
    const { params } = context;
    const eventId = params?.eventId as string;

    const event = await getEventById(eventId)

    return {
        props: {
            eventPicked: event
        },
        revalidate: 30,
    }

}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map((event) => ({ params: { eventId: event.id } }))

    return {
        paths,
        fallback: 'blocking',
    }
}