import logger from 'logger';
const express = require("express");

import config from 'config';

const app = express();

app.get('/', (req, res) => {
    logger(4, "New request");
    res.send({ "test": "application" });
});

app.listen(config.port, function listenHandler() {
    console.info("Running on: " + config.port);
});
