import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import GenerateUrl from "./components/GenerateUrl";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./helper/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <GenerateUrl />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const NotFound = () => {
  return <div>404 Not Found</div>;
};

export default App;
