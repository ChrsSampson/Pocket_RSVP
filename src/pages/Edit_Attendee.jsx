import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import pb from "../lib/pocketclient";
import {useNavigate} from "react-router-dom";
import RequireUser from "../lib/RequireUser";
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "../components/ui/card";
import {Select, SelectContent, SelectItem, SelectLabel, SelectValue, SelectGroup, SelectTrigger} from "../components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import {QRCodeSVG} from 'qrcode.react';

export default function EditAttendeePage() {
    const navigate = useNavigate();
    const user_id = useParams().id
    const [person, setPerson] = useState({});

    const hostName = import.meta.env.VITE_HOST_URL;
    const qr_value = `${hostName}/attendee/${person.id}?invite_code=${person.code}`;

    const [message, setMessage] = useState("");

    if (!user_id) {
        navigate('/404')
    }
    
    async function getPerson() {
        try {
            const data = await pb.collection('attendees').getOne(user_id);
            setPerson(data);
        } catch (error) {
            console.log(error);
            navigate('/404');
        }
    }

    function handleSubmit() {

    }

    useEffect(() => {
        getPerson();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            await pb.collection('attendees').update(user_id, person)
            setMessage("Changes have been saved!")
        }
        catch(error){
            console.log(error)
        }
    }

    function update_person_state(value, key) {
        setPerson({
            ...person,
            [key]: value
        })
    }

    function convert_attending() {
        switch(person.attending){
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

    return (
        <RequireUser>
            <div>
                <Card>
                    <CardHeader>
                        <div className="flex justify-start">
                            <Button onClick={() => navigate('/dashboard')}>Back</Button>
                        </div>
                        <CardTitle>
                            Edit Person
                        </CardTitle>
                    </CardHeader>
                <CardContent>
                    <section className="grid grid-cols-2 gap-2">
                    <form onSubmit={handleSubmit} className="grid border py-3 rounded-lg place-items-center gap-2">
                        {message &&
                            <span className="text-green-400">{message}</span>
                        }
                        <div className="flex justify-center w-1/2 gap-3">
                            <div className="flex flex-col justify-start">
                                <label className="text-left">First Name</label>
                                <Input placeholder="First Name" value={person.first_name} onChange={(e) => update_person_state(e.target.value, 'first_name')} />
                            </div>
                            <div className="flex flex-col justify-start">
                                <label className="text-left">Last Name</label>
                                <Input placeholder="Last Name" value={person.last_name} onChange={(e) => update_person_state(e.target.value, 'last_name')} />
                            </div>
                        </div>
                        <div className="flex place-items-center w-1/3 justify-between gap-2">
                            <label>RSVP'd</label>
                            <Select value={person.attending} onValueChange={(value) => {update_person_state(value, 'attending')}}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex place-items-center w-1/3 justify-between gap-2">
                            <label>Food Choice</label>
                            <Select value={person.food_selection} onValueChange={(value) => {update_person_state(value, 'food_selection')}}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1">Chicken</SelectItem>
                                        <SelectItem value="2">Prime Rib</SelectItem>
                                        <SelectItem value="3">Salmon</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex place-items-center gap-3">
                            <label>Plus One?</label>
                            <Checkbox value={person.plus_one} onCheckedChange={(value) => update_person_state(value, 'plus_one')}>Plus One?</Checkbox>
                        </div>
                        <div className="flex">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                    {/* SPLIT */}
                    <div className="flex border border-spacing-1 rounded-lg flex-col justify-center gap-3">
                        <div>
                            <h2>Invite QR Code</h2>
                            <sub>Make sure to give this to someone</sub>
                        </div>
                        <div className="flex justify-center">
                                <QRCodeSVG
                                    className="cursor-pointer rounded-lg"
                                    onClick={() => {navigate(`/attendee/${person.id}?invite_code=${person.code}`)}}
                                    value={qr_value}
                                    size={200}
                                    includeMargin={true}
                                    renderAs='svg'
                                />
                        </div>
                    </div>
                    </section>
                </CardContent>
                </Card>
            </div>
        </RequireUser>
    )
}