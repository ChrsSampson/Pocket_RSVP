import { useState, useEffect } from 'react';
import RequireUser from '../lib/RequireUser';
import pb from '../lib/pocketclient';

export default function Playlist() {
    const [songs, setSongs] = useState([]);

    async function getSongs() {
        try {
            const data = await pb.collection('attendees').getList();
            const song_data = reduce_to_song_data(data.items);
            setSongs(song_data);
        } catch (error) {
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

    // TODO: create a nice table for this data to live in

    return (
        <RequireUser>
            <div>
                <h3 className="text-[1.25em]">
                    Yeah I brought the Jams. You're welcome.
                </h3>
                <div>
                    {songs &&
                        songs.map((item) => (
                            <div className="flex" key={item.name + item.song}>
                                <h4>{item.name}</h4>
                                <h4>{item.song}</h4>
                            </div>
                        ))}
                </div>
            </div>
        </RequireUser>
    );
}
