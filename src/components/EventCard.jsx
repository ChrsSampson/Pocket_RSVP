export default function EventCard({ event }) {
    return (
        <a href={`/event/${event.id}`}>
            <h1>{event.name}</h1>
        </a>
    );
}
