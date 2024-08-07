import './App.css';
import UserProvider from './providers/UserProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import UserDashboard from './pages/User_Dashboard';
import { ThemeProvider } from './providers/ThemeProvider';
import Attendee_Dashboard from './pages/Attendee_Dashboard';
import EditAttendeePage from './pages/Edit_Attendee';
import QR_Print from './pages/QR_Print';
import Playlist from './pages/Playlist';
import AttendeeLoginPage from './pages/Attendee_Login';
import AboutPage from './pages/About';
import Location from './pages/Location';
import Report from './pages/Report';

const routes = [
    {
        path: '/',
        element: <Home />,
        index: true,
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: '/location',
        element: <Location />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/Dashboard',
        element: <UserDashboard />,
    },
    {
        path: '/attendee/:id',
        element: <Attendee_Dashboard />,
    },
    {
        path: 'attendee/edit/:id',
        element: <EditAttendeePage />,
    },
    {
        path: 'QR_Codes',
        element: <QR_Print />,
    },
    {
        path: '/attendee/login',
        element: <AttendeeLoginPage />,
    },
    {
        path: 'playlist',
        element: <Playlist />,
    },
    {
        path: 'foodreport',
        element: <Report />,
    },
    {
        path: '*',
        element: <div>404 Not Found</div>,
    },
];

const router = createBrowserRouter(routes);

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </ThemeProvider>
    );
}
