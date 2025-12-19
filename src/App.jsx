import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";

const App = () => {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Register />} />
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
