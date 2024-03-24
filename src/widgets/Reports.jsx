export default function Reports({ attendees = [] }) {
    console.log(attendees);

    const totalAttendees = attendees.length;

    const coming = attendees.filter(
        (attendee) => attendee.attending === 'yes'
    ).length;

    return (
        <section className=" text-[2em] border border-spacing-1 rounded-lg">
            <div>
                <h2>
                    {coming}\{totalAttendees} In Attendance
                </h2>
                <h2></h2>
            </div>
        </section>
    );
}
