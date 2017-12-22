'use strict';
import { getToken } from '../actions/localStoreAction';
// const toke = getToken();
const env = {
    PORT: process.env.PORT || 8081,
};

module.exports = env;
