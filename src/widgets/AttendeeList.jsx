// import {ColumnDef, flexRender, userReactTable} from "@tanstack/react-table"
import {Input} from "../components/ui/input";
import {Table, TableBody, TableCell, TableHeader, TableHead, TableRow} from "../components/ui/table";
import { useNavigate } from "react-router-dom";
import {Button} from "../components/ui/button";

import {useState, useEffect} from "react";

function TableEntry({person}) {

    const navigate = useNavigate();

    function convert_attending(attending='pending'){
        switch(attending){
            case 'pending':
                return 'Pending';
            case 'true':
                return 'Yes';
            case 'false':
                return 'No';
            default:
                return 'Pending';
        }
    }  

    function convert_food_selection(food_selection=1){
        switch(food_selection){
            case '1':
                return "Chicken";
            case '2':
                return "Prime Rib";
            case '3':
                return "Salmon";
            default:
                return "Chicken";
        }
    }

    const status = person.attending
    const plus_one = person.plus_one

    return (
        <TableRow className="text-left text-primary-background">
            <TableCell>
                <h3 className={
                    status == 'pending' && 'text-yellow-500'
                    || status === 'true' && 'text-green-400'
                    || status === 'false' && 'text-red-400'
                    }>{convert_attending(person.attending)}</h3>
            </TableCell>
            <TableCell>
                <span>{person.first_name}</span>
            </TableCell>
            <TableCell>
                <span>{person.last_name}</span>
            </TableCell>
            <TableCell>
                <span className={
                    plus_one && 'text-green-400' ||
                    !plus_one && 'text-red-400'
                    }>{person.plus_one ? "Yes" : "No"}</span>
            </TableCell>
            <TableCell>
                <span>{convert_food_selection(person.food_selection)}</span>
            </TableCell>
            <TableCell>
                <Button onClick={() => navigate(`/attendee/edit/${person.id}`)} >Edit</Button>
            </TableCell>
        </TableRow>
    )
}


export default function AttendeeList({ people }) {
    const [filteredPeople, setFilteredPeople] = useState(people);
    const [term, setTerm] = useState('');


    function handleFilterPeople(term){
        const filtered = people.filter((person) => {
            if (person.first_name.toLowerCase().includes(term.toLowerCase())) return true;  
            if (person.last_name.toLowerCase().includes(term.toLowerCase())) return true;
        });
        setFilteredPeople(filtered);
    }

    useEffect(() => {
        if (term !== ''){
            console.log('filtered')
            handleFilterPeople(term);
        } else {
            setFilteredPeople(people);
        }
    }, [term])

    return (
        <section className="border border-primary-foreground rounded-lg my-3 p-3">
            <div className="flex flex-col align-start max-w-[20%] py-2">
                <h1 className="text-left text-xl py-2 px-1">Peeps</h1>
                <Input onChange={(e) => setTerm(e.target.value)} value={term} placeholder="Find Person" />
            </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Attending</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Plus One</TableHead>
                    <TableHead>Food Selection</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {term && filteredPeople.map((person) => (
                    <TableEntry key={person.id} person={person} />
                ))}
                {!term && people.map((person) => (
                    <TableEntry key={person.id} person={person} />
                ))}
            </TableBody>
        </Table>
        </section>
    );
}
