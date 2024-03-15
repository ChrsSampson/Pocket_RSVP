import {useState, useContext, useEffect} from 'react';
import pb from "../lib/pocketclient";
import RequireUser from "../lib/RequireUser";
import {UserContext} from "../providers/UserProvider";


export default function UserDashboard() {
  const {user, token, setUser, setToken} = useContext(UserContext);

  const [events, setEvents] = useState([]);

  async function getEvents() {
    try{
      const data = await pb.collection("events").getList();
      setEvents(data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);


  return (
    <RequireUser>
      <div>
        <h1>User Dashboard</h1>
        <p>Welcome to the user dashboard</p>
      </div>
    </RequireUser>
  );
}
