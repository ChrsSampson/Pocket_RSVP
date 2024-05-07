import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Reports({ attendees = [] }) {
    const totalAttendees = attendees.length;
    const navigate = useNavigate();

    const foods = ['Chicken', 'Prime Rib', 'Salmon'];

    const confirmed = attendees.reduce((acum, p) => {
        return p.attending === 'true' ? acum + 1 : acum;
    }, 0);

    const plus_ones_confirmed = attendees.reduce((acum, p) => {
        if (p.plus_one) {
            acum += 1;
        }
        return acum;
    }, 0);

    const percentConfirmed = Math.round((confirmed / totalAttendees) * 100);

    const food_orders = { 1: 0, 2: 0, 3: 0 };

    // only counts food if person is coming
    attendees.forEach((attendee) => {
        if (attendee.attending === 'true') {
            food_orders[attendee.food_selection] += 1;
        }
    });

    const winning_food = Object.keys(food_orders).reduce((a, b) => {
        if (b > a) {
            return a;
        }
    });

    return (
        <section className="p-4 my-2 border border-spacing-1 rounded-lg">
            <div className="flex justify-between">
                <div>
                    <div className="flex place-items-middle gap-3">
                        <div className="border-r-2 pxq-auto">
                            <h3>{totalAttendees} People Invited</h3>
                            <h3>{confirmed} have confirmed</h3>
                        </div>
                        <div>
                            <h3>{plus_ones_confirmed} "plus ones" added</h3>
                        </div>
                    </div>
                    {percentConfirmed > 0 && (
                        <sub className="text-yellow-500">
                            ({percentConfirmed}% of ya peeps are coming)
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
                        <sub className="text-yellow-500">
                            ({foods[winning_food]} is winning)
                        </sub>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Button onClick={() => navigate('/qr_codes')}>
                        QR Code Sheet
                    </Button>
                    <Button onClick={() => navigate('/playlist')}>
                        Playlist
                    </Button>
                </div>
            </div>
        </section>
    );
}
