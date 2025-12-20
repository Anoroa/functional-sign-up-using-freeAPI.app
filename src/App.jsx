import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const App = () => {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={myRoute} />
    </>
  );
};

export default App;
