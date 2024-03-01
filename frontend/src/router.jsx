import { createBrowserRouter } from "react-router-dom";
import { Login } from "./auth/Login";
import App from "./App";
import { Signup } from "./auth/Signup";
import { SignupDoctor } from "./auth/SignupDoctor";
import { CreateProfile } from "./doctor/CreateProfile";
import { PatientForm } from "./patient/PatientForm";
import { Orders } from "./orders/Orders";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signup-doctor",
    element: <SignupDoctor />,
  },
  {
    path: "create-profile",
    element: <CreateProfile />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book-consultation",
    element: <PatientForm />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
]);
export default router;
