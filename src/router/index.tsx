import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/home";
import Register from "../pages/register";
import Verify from "../pages/verify";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "register",
            element: <Register/>,
        },
        {
            path: "verify",
            element: <Verify/>,
        }
    ]
);