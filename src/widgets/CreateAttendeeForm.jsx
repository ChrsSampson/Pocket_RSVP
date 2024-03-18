import {useState, useEffect} from 'react';
import {Input} from '../components/ui/input';
import {Button} from '../components/ui/button';
import {Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription} from '../components/ui/card';
import {Select, SelectContent, SelectItem, SelectLabel, SelectValue, SelectGroup, SelectTrigger} from '../components/ui/select';
import pb from "../lib/pocketclient";

export default function CreateAttendeeForm ({parties}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [party, setParty] = useState(null);
    const [plusOne, setPlusOne] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function validate_fields(){
        if (message) {
            setMessage("");
        }

        if (firstName == '' || lastName == '') {
            setError("Complete name is required");
            return false;
        }
    }

    // function create_random_code(length=6){
    //     let code = "";
    //     for (let i = 0; i < length; i++){
    //         let random = Math.floor(Math.random() * 10);
    //         code += random;
    //     }
    //     return code;
    // }

    async function handleSubmit(e){
        e.preventDefault();

        const userId = pb.authStore.model.id

        validate_fields();

        try{
            const result = await pb.collection("attendees").create({
                first_name:firstName,
                last_name:lastName, 
                attending:'pending',
                party:party, 
                plus_one:plusOne, 
                food_selection:1
            });

            if (error){
                setError("");
            }
            setMessage("New Attendee Created")
        } catch (error) {
            console.error(error);
            setError(error.message)
        }

    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }

        if (error) {
            setTimeout(() => {
                setError("");
            }, 3000);
        }

    }, [message, error])

    return (
        <form onSubmit={handleSubmit} >
            <Card className="w-[100%]">
                <CardHeader>
                    <CardTitle>Create New Attendee</CardTitle>
                    { message &&
                        <CardDescription><span className="text-green-400">{message}</span></CardDescription>
                    }
                    { error &&
                        <CardDescription><span className="text-red-400">{error}</span></CardDescription>
                    }
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            <Input required placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <Input required placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />                            
                        </div>
                        <div className="flex gap-1">
                            { parties &&
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Assign to Party (Optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Parties</SelectLabel>
                                        {
                                            parties.map((party, index) => {
                                                return <SelectItem key={index} value={party.id}>{party.name}</SelectItem>
                                            })
                                        }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            }
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit}>Create Attendee</Button>
                </CardFooter>
            </Card >
        </form>
    )
}