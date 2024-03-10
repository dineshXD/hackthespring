import { createBrowserRouter } from "react-router-dom";
import { Login } from "./auth/Login";
import App from "./App";
import { Signup } from "./auth/Signup";
import { SignupDoctor } from "./auth/SignupDoctor";
import { CreateProfile } from "./doctor/CreateProfile";
import { PatientForm } from "./patient/PatientForm";
import { Orders } from "./orders/Orders";

import { UserOrders } from "./orders/UserOrders";
import { DoctorAvailabilityForm } from "./doctor/AddAvailabilty";
import { AddKey } from "./doctor/Addkey";
import { DoctorMoreInfo } from "./doctor/DoctorMoreInfo";

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
    path: "/add-availability",
    element: <DoctorAvailabilityForm />,
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
  {
    path: "/user-orders",
    element: <UserOrders />,
  },
  {
    path: "/doctor/:id",
    element: <DoctorMoreInfo />,
  },
  // {
  //   path: "/chat",
  //   children: [
  //     { index: true, element: <ChatScreen /> },
  //     { path: "/chat/:id", element: <PatientChat /> },
  //   ],
  // },
  {
    path: "/add-key",
    element: <AddKey />,
  },
]);
export default router;
