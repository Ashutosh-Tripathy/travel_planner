import logger from './server/logging/logger';
import express from 'express';
import bodyParser from 'body-parser';
import env from 'server/config/env';
import router from './server/router/index';
import db from './server/config/db';
import verifytoken from './server/middleware/verifytoken';
import authorize from './server/middleware/authorize';

const app = express();
app.set('superSecret', env.SECRET);

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});
app.use(verifytoken);

app.use("/user*", authorize("admin", "manager"));
app.use("/trip*", authorize("admin"));

router(app, db);

app.get('/', (req, res) => {
    logger(4, "New request");
    res.send({ "message": "Welcome!" });
});

db.sequelize.sync().then(() => {
    app.listen(env.PORT, function listenHandler() {
        console.info('Running on: ' + env.PORT);
    })
});

