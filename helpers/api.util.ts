import { DateFilter } from "../dummyData";

export async function getAllEvents() {
    const response = await fetch('https://nextjs-events-871ca-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
    const responseData = await response.json();

    const events = [];
    for (const key in responseData) {
        events.push({
            id: key,
            ...responseData[key]
        });
    }

    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();

    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: DateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}