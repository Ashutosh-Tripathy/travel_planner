import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import User from './components/user/User';
import Trip from './components/trip/Trip';
import ManageUser from './components/user/ManageUser';
import ManageTrip from './components/trip/ManageTrip';
import Authenticate from './components/authenticate/Authenticate';
import { getToken } from './actions/localStoreAction';

function requireAuth(nextState, replace) {
    if (!getToken()) {
        replace({
            pathname: '/authenticate'
        })
    }
}
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Trip} onEnter={requireAuth} />
        <Route path="user" component={ManageUser} />

        <Route path="authenticate" component={Authenticate} />
        <Route path="user" component={ManageUser} onEnter={requireAuth} />
        <Route path="user/:id" component={ManageUser} onEnter={requireAuth} />
        <Route path="users" component={User} onEnter={requireAuth} />
        <Route path="trip" component={ManageTrip} onEnter={requireAuth} />
        <Route path="trip/:id" component={ManageTrip} onEnter={requireAuth} />
        <Route path="trips" component={Trip} onEnter={requireAuth} />
    </Route>
);
