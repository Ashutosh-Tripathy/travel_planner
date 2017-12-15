import logger from './server/logging/logger';
import express from 'express';
import bodyParser from 'body-parser';
import env from 'server/config/env';
import router from './server/router/index';
import db from './server/config/db.js';

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});

router(app, db);

app.get('/', (req, res) => {
    logger(4, "New request");
    res.send({ "test": "application" });
});

db.sequelize.sync().then(() => {
    app.listen(env.PORT, function listenHandler() {
        console.info('Running on: ' + env.PORT);
    })
});
