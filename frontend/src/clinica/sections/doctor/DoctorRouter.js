import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {DoctorClients} from "./doctorclients/DoctorClients";
import {Conclusion} from "./conclusion/Conclusion";
import Templates from "./templates/Templates";
import Tables from "./tables/Tables";

export const DoctorRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/alo24" exact>
                    <DoctorClients/>
                </Route>
                <Route path="/alo24/templates">
                    <Templates/>
                </Route>
                <Route path="/alo24/tables">
                    <Tables/>
                </Route>
                <Route path="/alo24/conclusion">
                    <Conclusion/>
                </Route>
                <Redirect to="/alo24"/>
            </Switch>
        </div>
    );
};
