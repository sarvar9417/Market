import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { OfflineClients } from "./offlineclients/OfflineClients";
import { StatsionarClients } from "./statsionarclients/StatsionarClients";
import { OnlineClients } from "./onlineclients/OnlineClients";

export const ReseptionRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/alo24" exact>
          <OfflineClients />
        </Route>
        <Route path="/alo24/statsionar">
          <StatsionarClients />
        </Route>
        <Route path="/alo24/online">
          <OnlineClients />
        </Route>
        <Redirect to="/alo24" />
      </Switch>
    </div>
  );
};
