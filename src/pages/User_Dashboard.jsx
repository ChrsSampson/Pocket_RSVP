import {useState, useContext, useEffect} from 'react';
import pb from "../lib/pocketclient";
import RequireUser from "../lib/RequireUser";
import {UserContext} from "../providers/UserProvider";

import CreateEventForm from '../widgets/CreateEventForm'

export default function UserDashboard() {
  const user = pb.authStore.model

  const [events, setEvents] = useState([]);
  const [parties, setParties] = useState([]);
  const [attendees, setAttendees] = useState([]);

  async function getEvents() {
    try{
      const data = await pb.collection("events").getList();
      setEvents(data.items);
    } catch (error) {
      console.log(error);
    }
  }


  async function getAttendees() {
    try{
      const data = await pb.collection("attendees").getList();
      setAttendees(data.items);
    } catch (error) {
      console.log(error);
    }
  
  }

  useEffect(() => {
    getEvents();
    getAttendees();
  }, []);


  return (
    <RequireUser>
      <div>
        <h1>User Dashboard</h1>
        <p>Welcome to the user dashboard</p>
      </div>
      <CreateEventForm />
    </RequireUser>
  );
}
