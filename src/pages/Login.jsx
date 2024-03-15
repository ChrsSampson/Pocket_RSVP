import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

import pb from '../lib/pocketclient';

// DOCS - https://ui.shadcn.com/docs/components/form
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';



function matchPasswords(password, passwordConfirm) {
    return password === passwordConfirm;
}

export default function Login() {
    const navigate = useNavigate();

    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const matchPasswords = (password, passwordConfirm) => password === passwordConfirm;


    async function handleLogin(e) {
        e.preventDefault();

        try {
            const authData = await pb.collection('users').authWithPassword(
                email,
                password,
            );
            navigate('/Dashboard');
        } catch (error) {
            console.log(error.message);
        }
    }


     async function handleRegister(e) {
        e.preventDefault();

        if (!matchPasswords(password, passwordConfirm) && password && passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        if(!email) {
            setError('Email is required');
            return;
        }

        try {
            const res = await pb.collection('users').create({
                email,
                password,
                passwordConfirm,
                name,
            });

            setMessage('Account created successfully');
            setRegister(false);
        } catch (error) {
            setError(error.message);
        }
    }

    // ------------------Register Form ----------------------

    if (register){
        return(
            <div className="grid place-items-center min-w-[50%] min-h-[100vh]">
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <div className="flex justify-start">
                        <h1>Register</h1>
                    </div>
                    { error &&
                        <span className="text-red-400"> {error} </span>
                    }
                    <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Display Name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input
                        className={password && matchPasswords(password, passwordConfirm) ? 'border-green-400' : 'border-red-400'}
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <Input
                        className={password && matchPasswords(password, passwordConfirm) ? 'border-green-400' : 'border-red-400'}
                        placeholder="Confirm password"
                        type="password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        value={passwordConfirm}
                    />
                    </div>
                    <div className="flex justify-start">
                        <Button type="submit">Register</Button>
                    </div>
                    <sub className="hover:underline cursor-pointer" onClick={() => setRegister(false)}>
                        Already Have an Account?
                    </sub>
                </form>
            </div>
        );
    }

    // ------------------Login Form ----------------------

    return (
        <div className="grid place-items-center min-w-[50%] min-h-[100vh]">
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <div className="flex justify-start">
                    <h1>Login</h1>
                </div>
                { error &&
                        <span className="text-red-400"> {error} </span>
                }
                {
                    message &&
                    <span className="text-green-400"> {message} </span>
                }
                <div className="flex flex-col gap-1">
                <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                </div>
                <div className="flex justify-start">
                    <Button type="submit">Login</Button>
                </div>
                <sub className="hover:underline cursor-pointer" onClick={() => setRegister(true)}>
                    Dont Have an Account?
                </sub>
            </form>
        </div>
    );



}
