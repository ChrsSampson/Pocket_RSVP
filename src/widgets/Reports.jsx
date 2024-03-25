import { useNavigate } from "react-router-dom";
import {Button} from '../components/ui/button'

export default function Reports({ attendees = [] }) {
    const totalAttendees = attendees.length;
    const navigate = useNavigate();

    const foods = ['Chicken', 'Prime Rib', 'Salmon'];

    const confirmed = attendees.reduce((acum, p) => {
        return p.attending === 'true' ? acum + 1 : acum;
    }, 0);

    const percentConfirmed = (confirmed / totalAttendees) * 100;

    const food_orders = { 1: 0, 2: 0, 3: 0 };

    attendees.forEach((attendee) => {
        food_orders[attendee.food_selection] += 1;
    });

    const winning_food = Object.keys(food_orders).reduce((a, b) => {
        return food_orders[a] > food_orders[b] ? a : b;
    });

    return (
        <section className="p-4 my-2 border border-spacing-1 rounded-lg">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-[1.25em]">{totalAttendees} Invited</h2>
                    <h2>{confirmed} Confirmed</h2>
                    {percentConfirmed > 0 && (
                        <sub className="text-yellow-500">
                            (Thats {percentConfirmed}% btw)
                        </sub>
                    )}
                </div>
                <div>
                    <div className="flex text-[1.25em] place-items-center gap-4">
                        <span>Chicken: {food_orders[1]}</span>
                        <span>Prime Rib: {food_orders[2]}</span>
                        <span>Salmon: {food_orders[3]}</span>
                    </div>
                    {winning_food && (
                        <sub>{foods[winning_food]} is winning</sub>
                    )}
                </div>
                <div>
                    <Button onClick={() => navigate('/qr_codes')}>QR Codes</Button>
                </div>
            </div>
        </section>
    );
}
