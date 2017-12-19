import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import User from './components/User';
import ManageUser from './components/ManageUser';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={User} />
        <Route path="user" component={ManageUser} />
	<Route path="user/:id" component={ManageUser} />
	<Route path="users" component={User} /> 
    </Route>
);
