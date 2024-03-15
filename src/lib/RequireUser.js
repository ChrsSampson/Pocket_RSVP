import pb from "./pocketclient";
import {useNavigate} from "react-router-dom";
import {useEffect} from 'react';

export default function RequireUser({children}) {
    const navigate = useNavigate();

    const auth =  pb.authStore.token ? true: false;

    useEffect(() => {
        if (!auth) {
            navigate('/login');
        }

    }, []);

    return children;
}

    