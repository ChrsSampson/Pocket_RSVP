import {UserContext} from "../providers/UserProvider";
import {useContext, useEffect} from "react";
import pb from "./pocketclient";
import {useNavigate} from "react-router-dom";

export default function RequireUser({children}) {
    const navigate = useNavigate();
    const { user, token, setUser, setToken } = useContext(UserContext);

    async function refreshAuth() {
        try{
            const authData = await pb.collection('users').authRefresh();
            setToken(authData.token);
            setUser({ email: authData.record.email, name: authData.record.name, username: authData.record.username , id: authData.record.id });
        }
        catch (error) {
            console.warn(error);
        }
    }

    useEffect(() => {
        if (!user && token) {
            refreshAuth();
        }
        if (!user && !token) {
            navigate('/login');
        }
    }, [user, token]);


    return children;
}

    