import pb from '../lib/pocketclient';
import { useEffect, useState } from 'react';
import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react';
import RequireUser from '../lib/RequireUser';

function QRCard({person}){
    const hostName = import.meta.env.VITE_HOST_URL;
    const qr_value = `${hostName}/attendee/${person.id}?invite_code=${person.code}`;

    // must be canvas in order to print
    const code_canvas = <QRCodeCanvas value={qr_value} size={128} />;

    return (
        <a href={qr_value} className="flex flex-col gap-3">
            {code_canvas}
            <div>
            <p>{person.first_name}</p>
            <p>{person.last_name}</p>
            </div>
        </a>
    )
}

export default function QR_Print() {

    const [attendees, setAttendees] = useState([]);
    const [error, setError] = useState(null);

    async function getAttendees() {
        try{
            const data = await pb.collection('attendees').getList();
            setAttendees(data.items);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }


    useEffect( () => {
        getAttendees();
    }, [])

  return (
    <RequireUser>
    <div className="flex flex-col gap-6">
      <h3>QR Codes</h3>
        <section className="grid grid-cols-4 place-items-center">
            {
                attendees.length && attendees.map((person) => {
                    return <QRCard key={person.id} person={person} />
                })
            }
            {
                error && <div>{error}</div>
            }
        </section>
    </div>
    </RequireUser>
  );
}