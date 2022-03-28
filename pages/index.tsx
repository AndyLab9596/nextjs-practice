import type { NextPage } from 'next';
import EventList from '../components/events/EventList';
import { EventItem } from '../dummyData';
import { getFeaturedEvents } from '../helpers/api.util';
interface HomePageProps {
  featuredEvents: EventItem[]
}

const HomePage: NextPage<HomePageProps> = ({ featuredEvents }) => {

  return (
    <div>
      <EventList eventsArray={featuredEvents} />
    </div>
  )
}

export default HomePage

export const getStaticProps = async () => {

  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800
  }
}