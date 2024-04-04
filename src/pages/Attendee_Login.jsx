import pb from '../lib/pocketclient';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
} from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const test_user = {
    first: 'sharlot',
    last: 'cameo',
    code: '750549',
};

export default function AttendeeLoginPage() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    async function getUser(first = '', last = '') {
        try {
            const user = await pb.collection('attendees').getOne({
                filter: `first_name = ${firstName} && last_name = ${lastName}`,
            });

            console.log(user);

            return user ? user : null;
        } catch (err) {
            console.log(err);
            setError('That person is not invited');
            return null;
        }
    }

    async function testPage(user) {
        try {
            const res = await fetch(
                `/attendee/${user.id}?invite_code=${user.invite_code}`
            );
            console.log(res);
        } catch (err) {
            console.log(err.message);
            setError('That invitation is not valid');
            return false;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (firstName && lastName && code) {
                const user = await getUser(firstName, lastName);

                if (user) {
                    const valid = await testPage(user);

                    if (valid) {
                        navigate(`/attendee/${user.id}?invite_code=${code}`);
                    }

                    console.log(valid);
                }
            }
        } catch (err) {
            console.log(err);
            setError('Something Went Wrong');
        }
    }

    return (
        <main className="grid h-[100vh] place-items-center">
            <Card>
                <CardHeader>
                    <CardTitle>RSVP Login</CardTitle>
                    <CardDescription>
                        Your invite code was in your invitation
                    </CardDescription>
                    {error && <span className="text-red-400">{error}</span>}
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="text-left flex flex-col gap-3"
                    >
                        <div className="">
                            <label>First Name</label>
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                type="text"
                                className=""
                            />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                type="text"
                            />
                        </div>
                        <div>
                            <label>Invite Code</label>
                            <Input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                placeholder=""
                                type="text"
                            />
                        </div>
                        <Button type="submit">Login</Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
