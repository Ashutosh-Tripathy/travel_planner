import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Cart from './components/Cart';
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Cart} />
    </Route>
);