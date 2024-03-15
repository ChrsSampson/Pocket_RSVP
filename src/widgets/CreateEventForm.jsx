import {useState} from 'react';
import {Input} from '../components/ui/input';
import {Button} from '../components/ui/button';
import {DatePicker} from '../components/ui/datepicker';
import {Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription} from '../components/ui/card';
import pb from "../lib/pocketclient";

export default function CreateEventForm () {
    const [date,setDate] = useState(Date.now());
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function validate_fields(){
        if (message) {
            setMessage("");
        }

        if (name === "") {
            setError("Name is required");
            return false;
        }

        if (date < Date.now()) {
            setError("Date must be in the future");
            return false;
        }
    }


    async function handleSubmit(e){
        e.preventDefault();

        const userId = pb.authStore.model.id

        validate_fields();

        try{
            const result = await pb.collection("events").create({name, party_mode:true, owner: userId, event_date: date, image_url: image, accent_color: color});

            if (error){
                setError("");
            }
            setMessage("Event Created Successfully")

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <form onSubmit={handleSubmit} >
            <Card className="w-[50%]">
                <CardHeader>
                    <CardTitle>Create New Event</CardTitle>
                    <CardDescription><span className="text-red-400">{error}{message}</span></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1">
                        <div >
                            <Input required placeholder="Event Name (Required)" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex gap-1">
                            <DatePicker value={date} setValue={setDate} />
                            <Input placeholder="Accent Color (#FFF)" value={color} onChange={(e) => setColor(e.target.value)} />

                        </div>
                        <div>
                            <Input type="text" placeholder="Image Url (Optional)" value={image} onChange={(e) => setImage(e.target.value)} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit}>Create Event</Button>
                </CardFooter>
            </Card >
        </form>
    )
}