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
import capialize from '../lib/capitalize';

export default function Attendee_Dashboard() {
    const { id } = useParams();
    const [attendee, setAttendee] = useState(null);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    // form values
    const [attending, setAttending] = useState(
        attendee ? attendee.attending : null
    );
    const [plusOne, setPlusOne] = useState(
        attendee ? attendee.plus_one : false
    );
    const [request, setRequest] = useState(
        attendee ? attendee.song_request : ''
    );
    const [food, setFood] = useState(attendee ? attendee.food_selection : null);
    const [plusOneFood, setPlusOneFood] = useState(
        attendee ? attendee.plus_one_food : null
    );

    const { theme, setTheme } = useTheme();

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
            if (data) {
                setAttendee(data);
                // update form values
                setAttending(data.attending);
                setPlusOne(data.plus_one);
                setRequest(data.song_request);
                setFood(data.food_selection);
                setPlusOneFood(data.plus_one_food);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError('Invalid Attendee Link');
        }
    }

    function convertAttendingToEnum(value) {
        switch (value) {
            case 'yes':
                return 'true';
                break;
            case 'no':
                return 'false';
            default:
                return 'pending';
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                attending: convertAttendingToEnum(attending),
                plus_one: plusOne,
                song_request: request,
                food_selection: food,
                plus_one_food: plusOneFood,
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

    useEffect(() => {
        if (!plusOne) {
            setPlusOneFood(null);
        }
    }, [plusOne]);

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
                    <section className="px-[1em] py-[2em]">
                        <Card>
                            <div className="flex p-3 gap-2 align-center justify-end">
                                <h3>Theme</h3>
                                <Switch onClick={() => switchTheme()} />
                            </div>
                            <CardHeader>
                                <CardTitle>
                                    Hello, {capialize(attendee.first_name)}{' '}
                                    {capialize(attendee.last_name)}
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
                                            Will you be attending?
                                        </label>
                                        <Select
                                            name="attend"
                                            value={attending}
                                            onValueChange={(value) =>
                                                setAttending(value)
                                            }
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

                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="food"
                                            className="text-left"
                                        >
                                            What will you be eating?{' '}
                                        </label>
                                        <Select
                                            name="food"
                                            value={food}
                                            onValueChange={(value) =>
                                                setFood(value)
                                            }
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
                                                    Glazed Salmon
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
                                    <div className="flex items-center gap-2">
                                        <label htmlFor="+">
                                            Are you bringing a guest?
                                        </label>
                                        {/* <input type="checkbox" /> */}
                                        <Checkbox
                                            onCheckedChange={(value) => {
                                                setPlusOne(value);
                                            }}
                                            checked={plusOne}
                                            value={plusOne}
                                        />
                                    </div>
                                    {plusOne && (
                                        <div className="flex flex-col gap-2">
                                            <label
                                                htmlFor="food"
                                                className="text-left"
                                            >
                                                What will your guest be eating?{' '}
                                            </label>
                                            <Select
                                                name="food"
                                                defaultValue="1"
                                                value={plusOneFood}
                                                onValueChange={(value) =>
                                                    setPlusOneFood(value)
                                                }
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
                                                        Glazed Salmon
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                    <div className="flex place-items-center gap-3 justify-start">
                                        <Button>Save</Button>
                                        {message && (
                                            <span className="text-green-400">
                                                {message}
                                            </span>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </section>
                )}
                <div className="px-[1em]">
                    <FoodMenu />
                </div>
            </div>
        );
    }
}
