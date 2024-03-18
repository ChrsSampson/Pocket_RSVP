import { useParams } from "react-router-dom";



export default function Attendee_Dashboard(){
    const {id} = useParams();
    
    console.log(id)

    async function getAttendee(){
        try{
            const data = await fetch(`https://compassocdellc.com/api/collecitons/attendees/records/${id}`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            return data
        } catch (error) {
            console.log(error);
        }
    }

    const thing = getAttendee();

    console.log(thing)

    return (
        <div>
            <h1>Attendee Dashboard</h1>
        </div>
    )

}