import RequireUser from '../lib/RequireUser';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useId } from 'react';
import { Button } from '../components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from '../components/ui/table';
import pb from '../lib/pocketclient';
import capialize from '../lib/capitalize';
export default function Report() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [people, setPeople] = useState([]);

    async function getPeople() {
        const attendees = await pb.collection('attendees').getFullList();
        setPeople(attendees);
    }

    useEffect(() => {
        getPeople();
        setLoading(false);
    }, []);

    return (
        <RequireUser>
            <main className="px-[2em] py-[1em]">
                <nav className="flex justify-between">
                    <Button onClick={() => navigate('/dashboard')}>Back</Button>
                    <h1 className="text-2xl">Food Report</h1>
                </nav>
                {error && <span className="text-red-400">{error}</span>}
                <section>{!loading && <ReportTable people={people} />}</section>
                {loading && <h2 className="text-2xl">Loading . . .</h2>}
            </main>
        </RequireUser>
    );
}

function convert_food_selection(food_selection = 1) {
    switch (food_selection) {
        case '1':
            return 'Chicken';
        case '2':
            return 'Prime Rib';
        case '3':
            return 'Salmon';
        default:
            return 'Chicken';
    }
}

function ReportTable({ people = [] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Food</TableHead>
                    <TableHead>Plus One?</TableHead>
                    <TableHead>Guest Food</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {people &&
                    people.map((person) => {
                        return <TableEntry key={useId()} person={person} />;
                    })}
            </TableBody>
        </Table>
    );
}

function TableEntry({ person }) {
    if (person.attending == 'true') {
        return (
            <TableRow>
                <TableCell>
                    {capialize(person.first_name)} {capialize(person.last_name)}
                </TableCell>
                <TableCell>
                    {convert_food_selection(person.food_selection)}
                </TableCell>
                <TableCell>
                    {person.plus_one ? (
                        <span className="text-green-500">YES</span>
                    ) : (
                        <span className="text-red-400">NO</span>
                    )}
                </TableCell>
                <TableCell>
                    {person.plus_one && person.plus_one_food
                        ? convert_food_selection(person.plus_one_food)
                        : null}
                </TableCell>
            </TableRow>
        );
    }
}
