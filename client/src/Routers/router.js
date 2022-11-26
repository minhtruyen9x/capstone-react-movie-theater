import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Error404 from "../Components/Error/Error404";

const MainLayout = lazy(() => import("../Components/MainLayout"));
const AuthLayout = lazy(() => import("../Modules/Auth/AuthLayout"));
const Register = lazy(() => import("../Modules/Auth/Register"))
const Login = lazy(() => import("../Modules/Auth/Login"))
const Home = lazy(() => import("../Modules/Home/Home"))
const Movie = lazy(() => import("../Modules/Movie"))
const Ticket = lazy(() => import("../Modules/Tickets/Ticket"))
const Users = lazy(() => import("../Modules/Users/Users"))
const CheckRouter = lazy(() => import("./CheckRouter"))



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/movie/:movieId", element: <Movie /> },
      {path: "/user" ,element: <Users/>},
      { path: "ticket/:ticketId", element: (
        <CheckRouter>
          <Ticket/>
        </CheckRouter>
      ) },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },

  {path: "*" , element: <Error404/>}
]);

export default router;
