import {useState} from 'react';
import {Input} from '../components/ui/input';
import {Button} from '../components/ui/button';
import {Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription} from '../components/ui/card';
import pb from "../lib/pocketclient";

export default function CreatePartyForm () {
    const [name, setName] = useState("");
    const [code, setCode] = useState(create_random_code());
    const [members, setMembers] = useState([]);
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
    }

    function create_random_code(length=6){
        let code = "";
        for (let i = 0; i < length; i++){
            let random = Math.floor(Math.random() * 10);
            code += random;
        }
        return code;
    }

    async function handleSubmit(e){
        e.preventDefault();

        const userId = pb.authStore.model.id

        validate_fields();

        try{
            const result = await pb.collection("parties").create({name:name, members:members, invite_code:code});

            if (error){
                setError("");
            }
            setMessage("Party Created Successfully")
        } catch (error) {
            console.error(error);
            setError(error.message)
        }

    }

    return (
        <form onSubmit={handleSubmit} >
            <Card className="w-[100%]">
                <CardHeader>
                    <CardTitle>Create New Party</CardTitle>
                    { message &&
                        <CardDescription><span className="text-green-400">{message}</span></CardDescription>
                    }
                    { error &&
                        <CardDescription><span className="text-red-400">{error}</span></CardDescription>
                    }
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1">
                        <div >
                            <Input required placeholder="Party Name (Required)" value={name} onChange={(e) => setName(e.target.value)} />
                            
                        </div>
                        <div className="flex gap-1">
                            <Input required placeolder="Invite Code (Requried)" value={code} onChange={(e) => setCode(e.target.value)} />
                            <Button type="button" onClick={() => setCode(create_random_code())}>Generate Random Code</Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit}>Create Party</Button>
                </CardFooter>
            </Card >
        </form>
    )
}