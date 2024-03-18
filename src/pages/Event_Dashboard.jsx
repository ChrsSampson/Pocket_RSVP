import { useState, useEffect } from 'react';
import pb from '../lib/pocketclient';
import RequireUser from '../lib/RequireUser';
import {} from 'react-router-dom';

export default function EventDashboard() {
    const [event, setEvent] = useState(null);

    function getEvent() {}

    return (
        <div>
            <h1>Event Dashboard</h1>
            <p>Welcome to the event dashboard</p>
        </div>
    );
}
