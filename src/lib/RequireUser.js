import pb from "./pocketclient";
import {useNavigate} from "react-router-dom";
import {useEffect} from 'react';

export default function RequireUser({children}) {
    const navigate = useNavigate();

    const auth =  pb.authStore.token ? true: false;

    const user = pb.authStore.model;

    // when the user changes this will navigate them away or to the login page
    pb.authStore.onChange((token, user) => {
        if (!token || !user) {
            navigate('/login');
        } else {
            navigate('/dashboard');
        }
    })

    // prevent people from navigating directly to protected routes
    useEffect(() => {
        if (!auth || !user) {
            navigate('/login');
        }

    }, []);

    return children;
}

    