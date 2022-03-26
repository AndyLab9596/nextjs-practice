import type { NextPage } from 'next'
import { getAllEvents } from '../dummyData'
import EventList from '../components/events/EventList';
import EventSearch from '../components/events/EventSearch';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (selectedYear: string, selectedMonth: string) => {

    const fullPath = `/events/${selectedYear}/${selectedMonth}`

    router.push(fullPath)
  }

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList eventsArray={events} />
    </div>
  )
}

export default HomePage
