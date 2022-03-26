import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import ResultTitle from '../../components/events/ResultTitle';
import Button from '../../components/ui/Button';
import { getFilteredEvents } from '../../dummyData';

const FilteredEventsPage: NextPage = () => {
    const router = useRouter();
    const filteredData = router.query.slug;

    if (!filteredData) {
        return <p className='center' >Loading....</p>
    }

    const filteredYear = +filteredData[0];
    const filteredMonth = +filteredData[1];

    if (isNaN(filteredYear) ||
        isNaN(filteredMonth) ||
        filteredYear > 2030 ||
        filteredMonth > 12 ||
        filteredYear < 2021 ||
        filteredMonth < 1) {
        return <Fragment>
            <p className='center'>Invalid Filter. Please adjust your values</p>
            <div className='center'>
                <Button link='/events'>Show all events</Button>
            </div>
        </Fragment>
    }

    const dataFilter = {
        year: filteredYear,
        month: filteredMonth
    };

    const date = new Date(filteredYear, filteredMonth - 1);

    const filteredEvents = getFilteredEvents(dataFilter);

    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <p className='center'>No events found for the chosen filter!</p>
            <div className='center'>
                <Button link='/events'>Show all events</Button>
            </div>
        </Fragment>
    }


    return (
        <div>
            <ResultTitle date={date} />
            <ul>
                <EventList eventsArray={filteredEvents} />
            </ul>
        </div>
    )
}

export default FilteredEventsPage