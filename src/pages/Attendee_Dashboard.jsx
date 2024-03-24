import { useParams } from 'react-router-dom';
import pb from '../lib/pocketclient';
import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardDescription,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useTheme } from '../providers/ThemeProvider';
import { Switch } from '../components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectContent,
    SelectValue,
} from '../components/ui/select';
import FoodMenu from '../widgets/FoodMenu';

export default function Attendee_Dashboard() {
    const { id } = useParams();
    const [attendee, setAttendee] = useState(null);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    // form values
    const [attending, setAttending] = useState(null);
    const [plusOne, setPlusOne] = useState(false);
    const [request, setRequest] = useState('');
    const [food, setFood] = useState('');

    const { theme, setTheme } = useTheme();

    // get code from query string
    const invite_code = new URLSearchParams(window.location.search).get(
        'invite_code'
    );

    function switchTheme() {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    async function getAttendee() {
        try {
            const data = await pb.collection('attendees').getOne(id);
            if (data.code === invite_code) {
                setAttendee(data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError('Invalid Attendee Link');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                attending,
                plus_one: plusOne,
                song_request: request,
                food_selection: food,
            };

            await pb.collection('attendees').update(id, data);

            if (formError) {
                setFormError(null);
            }
            setMessage('Success!');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setFormError('Error saving form');
        }
    }

    useEffect(() => {
        if (formError) {
            setTimeout(() => {
                setFormError(null);
            }, 3000);
        }

        if (message) {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }, [formError, message]);

    useEffect(() => {
        getAttendee();
    }, []);

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{error}</CardDescription>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <div>
                {loading && (
                    <div className=" grid place-items-center h-[100vh]">
                        <h1>Loading...</h1>
                    </div>
                )}
                {attendee && (
                    <section>
                        <Card>
                            <div className="flex p-3 gap-2 align-center justify-end">
                                <h3>Theme</h3>
                                <Switch onClick={() => switchTheme()} />
                            </div>
                            <CardHeader>
                                <CardTitle>
                                    Hello, {attendee.first_name}{' '}
                                    {attendee.last_name}
                                </CardTitle>
                                <CardDescription>
                                    We are going to need a couple things from
                                    you...
                                </CardDescription>
                                {formError && (
                                    <h4 className="text-red-400">
                                        {formError}
                                    </h4>
                                )}
                                {message && (
                                    <h4 className="text-green-400">
                                        {message}
                                    </h4>
                                )}
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={(e) => handleSubmit(e)}
                                    className="flex flex-col gap-3"
                                >
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="attend"
                                            className="text-left"
                                        >
                                            Can I expect trouble?
                                        </label>
                                        <Select
                                            name="attend"
                                            value={attendee.attending}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">
                                                    Yes
                                                </SelectItem>
                                                <SelectItem value="no">
                                                    No
                                                </SelectItem>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label htmlFor="+">
                                            Make it double?
                                        </label>
                                        {/* <input type="checkbox" /> */}
                                        <Checkbox
                                            onClick={(e) =>
                                                setPlusOne(!plusOne)
                                            }
                                            checked={plusOne}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="food"
                                            className="text-left"
                                        >
                                            What are you eating?{' '}
                                        </label>
                                        <Select
                                            name="food"
                                            value={attendee.food_selection}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Food Selection" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    Chicken
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Prime Rib
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    Salmon
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Input
                                            value={request}
                                            onChange={(e) =>
                                                setRequest(e.target.value)
                                            }
                                            placeholder="Song Request (Choose Carfully)"
                                        />
                                    </div>
                                    <div></div>
                                    <div className="flex justify-start">
                                        <Button>Save</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </section>
                )}
                <FoodMenu />
            </div>
        );
    }
}
