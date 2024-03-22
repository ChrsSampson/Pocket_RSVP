import { useState, useContext, useEffect } from 'react';
import pb from '../lib/pocketclient';
import RequireUser from '../lib/RequireUser';
import { UserContext } from '../providers/UserProvider';

import UserBug from '../widgets/UserBug';
import CreatePartyForm from '../widgets/CreatePartyForm';
import CreateAttendeeForm from '../widgets/CreateAttendeeForm';
import AttendeeList from '../widgets/AttendeeList';

export default function UserDashboard() {
    const user = pb.authStore.model;

    const [parties, setParties] = useState([]);
    const [attendees, setAttendees] = useState([]);

    async function getParties() {
        try {
            const data = await pb.collection('parties').getList();
            setParties(data.items);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAttendees() {
        try {
            const data = await pb.collection('attendees').getList();
            setAttendees(data.items);
        } catch (error) {
            console.log(error);
        }
    }

    function updateResults() {
        getParties();
        getAttendees();    
    }

    useEffect(() => {
        getParties();
        getAttendees();
    }, []);

    return (
        <RequireUser>
            <div className="mb-[2em] flex justify-between">
                <h1 className="text-[2em] text-left">Dashboard</h1>
                <UserBug />
            </div>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 place-content-start mx-auto">
                <CreatePartyForm />
                <CreateAttendeeForm update={updateResults} parties={parties} />
            </div>
            <div>
                <AttendeeList people={attendees} />
            </div>
        </RequireUser>
    );
}
