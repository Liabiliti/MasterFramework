import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import LoginPage from "./Pages/Login/LoginPage";
import { useAuth } from "./Hooks/useAuth";
import ProtectedRoute from "./Routes/protectedRoute.jsx";
// import ProtectedRoute from "./Routes/protectedRoute"

const AppLayout = ({children}) => {
    return <div>{children}</div>
}

const router = createBrowserRouter([
    {
        path: "/Dashboard",
        element: <AppLayout><ProtectedRoute><Dashboard /></ProtectedRoute></AppLayout>,
    },
    {
        path: "/",
        element: <AppLayout><LoginPage/></AppLayout>
    }
]);

export default router;
