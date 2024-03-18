import "./App.css";
import UserProvider from "./providers/UserProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/User_Dashboard";
import { ThemeProvider } from "./providers/ThemeProvider";
import Attendee_Dashboard from "./pages/Attendee_Dashboard";

const routes = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element:<UserDashboard />,
  },
  {
    path:"/attendee/:id",
    element: <Attendee_Dashboard />
  }
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
