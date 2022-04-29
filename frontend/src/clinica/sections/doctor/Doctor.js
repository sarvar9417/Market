import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {DoctorRouter} from "./DoctorRouter";

export const Doctor = () => {
    return (
        <Router>
            <Navbar/>
            <DoctorRouter/>
        </Router>
    );
};
