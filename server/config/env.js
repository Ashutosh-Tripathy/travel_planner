'use strict';

const env = {
    PORT: process.env.PORT || 8080,
    //   DATABASE_URL: process.env.DATABASE_URL || 'jdbc:postgresql://localhost/travel_planner',
    DATABASE_NAME: process.env.DATABASE_NAME || 'travel_planner',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'username',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'password',
    //   DATABASE_PORT: process.env.DATABASE_PORT || 5432,
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'sqlite',

    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_PATH: process.env.DATABASE_PATH || '../../db/travel_planner.sqlite',
    SECRET: 'APPSECRET'
};

module.exports = env;
