import { useState, useEffect } from 'react';
import RequireUser from '../lib/RequireUser';
import pb from '../lib/pocketclient';

export default function Playlist() {
    const [songs, setSongs] = useState([]);

    async function getSongs() {
        try {
            const data = await pb
                .collection('attendees')
                .getList({ filter: pb.filter('song_request') });
            setSongs(data.items);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSongs();
    }, []);

    return (
        <RequireUser>
            <div>
                <h3 className="text-[1.25em]">
                    Yeah I brought the Jams. You're welcome.
                </h3>
                <div>
                    {songs &&
                        songs.map((song) => (
                            <div key={song.id}>
                                <h4>{song}</h4>
                            </div>
                        ))}
                </div>
            </div>
        </RequireUser>
    );
}
