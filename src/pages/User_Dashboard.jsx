import { useState, useContext, useEffect } from 'react';
import pb from '../lib/pocketclient';
import RequireUser from '../lib/RequireUser';
import { UserContext } from '../providers/UserProvider';

import UserBug from '../widgets/UserBug';
import CreatePartyForm from '../widgets/CreatePartyForm';
import CreateAttendeeForm from '../widgets/CreateAttendeeForm';
import AttendeeList from '../widgets/AttendeeList';
import Reports from '../widgets/Reports';

export default function UserDashboard() {
    const user = pb.authStore.model;

    const [parties, setParties] = useState([]);
    const [attendees, setAttendees] = useState([]);
    // const [page, setPage] = useState(1);

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
            const data = await pb.collection('attendees').getFullList();
            setAttendees(data);
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
            <div className="mb-[2em] p-[1em] flex justify-between">
                <h1 className="text-[2em] text-left">Dashboard</h1>
                <UserBug />
            </div>
            <div className="px-[1em]">
                {attendees && <Reports attendees={attendees} />}
            </div>
            <div className="grid gap-3 px-[1em] grid-cols-1 md:grid-cols-2 place-content-start mx-auto">
                <CreatePartyForm />
                <CreateAttendeeForm update={updateResults} parties={parties} />
            </div>
            <div className="px-[1em] pb-[2em]">
                <AttendeeList people={attendees} />
            </div>
        </RequireUser>
    );
}
