import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LoginPage from "./Pages/Login/LoginPage";

const router = createBrowserRouter([
    {
        path: "/Dashboard",
        element: <Dashboard />,
    },
    {
        path: "/",
        element: <LoginPage/>
    }
]);

export default router;
