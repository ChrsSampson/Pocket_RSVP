import { useState, useEffect } from 'react';
import RequireUser from '../lib/RequireUser';
import pb from '../lib/pocketclient';
import { useNavigate } from 'react-router-dom';
import {Button} from '../components/ui/button'

export default function Playlist() {
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

    useEffect(() => {
        getSongs();
    }, []);

    return (
        <RequireUser>
            {
                error && 
                <span className="text-red-400">{error}</span>
            }
            <div>
                { !error &&
                <h3 className="text-[1.25em]">
                    Yeah I brought the Jams. You're welcome.
                </h3>
                }
                <div className="grid place-items-center my-6 py-6 border border-spacing-1 rounded-lg">
                    {items &&
                        items.map((e,i) => (
                            <div className=" flex w-1/3 border justify-between" key={e.song + i}>
                                <h4>{e.name}</h4>
                                <h4>{e.song}</h4>
                            </div>
                        ))}
                </div>
            </div>
        </RequireUser>
    );
}
