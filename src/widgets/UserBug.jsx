import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import pb from '../lib/pocketclient';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';

export default function UserBug() {
    const [hover, setHover] = useState(false);

    const { theme, setTheme } = useTheme();

    function changeTheme() {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    function themeToEmoji() {
        if (theme === 'dark') {
            return '☀️';
        } else {
            return '🌙';
        }
    }

    const user = pb.authStore.model;

    function handleSignOut(){ 
        pb.authStore.clear();
    }

    return (
        <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="flex justify-center items-center p-2"
        >
            <CardHeader>
                <h2>{user && user.email}</h2>
                {hover && <h3>{user && user.username}</h3>}
            </CardHeader>
            {hover && (
                <div className="">
                    <div className="flex gap-1 my-auto">
                        <Button onClick={() => handleSignOut()}>Sign Out</Button>
                        <Button onClick={() => changeTheme()}>
                            {themeToEmoji()}
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}
