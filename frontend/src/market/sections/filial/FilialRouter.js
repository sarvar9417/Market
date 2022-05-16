import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'


export const FilialRouter = () => {
  return (
    <div>
      <Switch>
        {/* Services */}
        <Route path="/alo24" exact>
          <h1> Bosh sahifa</h1>
        </Route>
        <Redirect to="/alo24" />
      </Switch>
    </div>
  )
}
