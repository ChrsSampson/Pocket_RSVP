import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

// DOCS - https://ui.shadcn.com/docs/components/form
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const pocketbase_url = import.meta.env.VITE_POCKETBASE_URL;

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch(
                `${pocketbase_url}/api/collections/users/auth-with-password`,
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <Form>
                <h1>Login</h1>
                <FormField />
                <Input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Login</Button>
            </Form>
        </div>
    );
}
