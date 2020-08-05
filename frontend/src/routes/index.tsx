import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Accounts from '../pages/Accounts';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/accounts/:id" component={Accounts} />
  </Switch>
);

export default Routes;
