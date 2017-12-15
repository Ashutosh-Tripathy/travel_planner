'use strict'

const routes = [
    require('./routes/authenticate'),
    require('./routes/users'),
    require('./routes/trips')
];


// Add access to the app and db objects to each route
const router = (app, db) => {
    return routes.forEach((route) => {
        route(app, db);
    });
};

export default router;
