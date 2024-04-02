import { useState, useEffect } from 'react';
import RequireUser from '../lib/RequireUser';
import pb from '../lib/pocketclient';
import { useNavigate } from 'react-router-dom';
import {Button} from '../components/ui/button'
import {Table, TableBody, TableCell, TableHeader, TableHead, TableRow} from "../components/ui/table";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '../components/ui/card';



function TableItem({name, song}){
    return (
        <TableRow>
            <TableCell>
                {name}
            </TableCell>
            <TableCell>
                {song}
            </TableCell>
        </TableRow>
    )
}


export default function Playlist() {
    const navigate = useNavigate()

    const [songs, setSongs] = useState([]);
    const [error, setError] = useState('');

    const [items, setItems] = useState([]);

    async function getSongs() {
        try {
            const data = await pb
                .collection('attendees')
                .getList();
            const entries = data.items.reduce((accumulator=[], item) => {
                const e = {song: item.song_request, name: `${item.first_name} ${item.last_name}`}
                if (e.song){
                    accumulator.push(e)
                }
                return accumulator
            }, [])
            setItems(entries)
        } catch (error) {
            setError(error.message)
            console.log(error);
        }
    }

    function reduce_to_song_data(collection) {
        return collection.reduce((accum = [], item) => {
            if (item.song_request) {
                accum.push({
                    name: `${item.first_name} ${item.last_name}`,
                    song: item.song_request,
                });
            }
            return accum;
        }, []);
    }

    useEffect(() => {
        getSongs();
    }, []);

    return (
        <RequireUser>
            {
                error && 
                <span className="text-red-400">{error}</span>
            }
            <Card>
                <CardHeader>
                    <div className="flex justify-start">
                        <Button onClick={() => navigate('/dashboard')}>
                            Back
                        </Button>
                    </div>
                    { !error &&
                    <>
                        <CardTitle>
                            Yeah I brought the Jams. You're welcome.
                        </CardTitle>
                        <CardDescription className="">
                            The people has spoken
                        </CardDescription>
                    </>  
                    }
                </CardHeader>
                <CardContent className=" m-5 grid place-items-center my-6 py-6 border border-spacing-1 rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>
                                    Submitted By
                                </TableCell>
                                <TableCell>
                                    Song Request
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                    {items &&
                        items.map((e,i) => (
                            <TableItem song={e.song} name={e.name} />
                        ))}
                    </Table>
                </CardContent>
            </Card>
        </RequireUser>
    );
}
