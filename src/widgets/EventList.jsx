import EventCard from '@/components/EventCard';

export default function EventList({ events }) {
    return (
        <div>
            <h1>Current Events</h1>
            <ul>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </ul>
        </div>
    );
}
