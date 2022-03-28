import { GetServerSidePropsContext, NextPage, PreviewData } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment, useEffect, useState } from 'react';
import EventList from '../../components/events/EventList';
import ResultTitle from '../../components/events/ResultTitle';
import Button from '../../components/ui/Button';
import { EventItem } from '../../dummyData';
import { getFilteredEvents } from '../../helpers/api.util';
import useSWR from 'swr';
import ErrorAlert from '../../components/ui/ErrorAlert';

interface FilteredEventsPageProps {
    hasError: boolean
    filteredEvents: EventItem[]
    // date: any
}

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = () => {
    const [loadedEvents, setLoadedEvents] = useState<EventItem[]>();
    const router = useRouter();
    const filteredData = router.query.slug as string[];
    const fetcher = (url: string) => fetch(url).then(r => r.json())

    const { data, error } = useSWR(
        'https://nextjs-events-871ca-default-rtdb.asia-southeast1.firebasedatabase.app/events.json', fetcher
    );

    useEffect(() => {
        if (data) {
            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key],
                });
            }

            setLoadedEvents(events);
        }
    }, [data]);



    if (!loadedEvents) {
        return <p className='center'>Loading...</p>;
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error
    ) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
        );
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            <ResultTitle date={date} />
            <EventList eventsArray={filteredEvents} />
        </Fragment>
    );
}


export default FilteredEventsPage