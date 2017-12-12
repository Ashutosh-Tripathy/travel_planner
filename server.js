import logger from 'logger';
const express = require('express');
import env from 'server/config/env';
import router from './server/router/index';
import db from './server/config/db.js';

const app = express();

router(app, db);

app.get('/', (req, res) => {
    logger(4, 'New request');
    res.send({ 'test': 'application' });
});

db.sequelize.sync().then(() => {
    app.listen(env.PORT, function listenHandler() {
        console.info('Running on: ' + env.PORT);
    })
});
