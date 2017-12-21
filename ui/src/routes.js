import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import User from './components/user/User';
import Trip from './components/trip/Trip';
import ManageUser from './components/user/ManageUser';
import ManageTrip from './components/trip/ManageTrip';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={User} />
        <Route path="user" component={ManageUser} />
        <Route path="user" component={ManageUser} />
        <Route path="user/:id" component={ManageUser} />
        <Route path="users" component={User} />
        <Route path="trip" component={ManageTrip} />
        <Route path="trip/:id" component={ManageTrip} />
        <Route path="trips" component={Trip} />
    </Route>
);
