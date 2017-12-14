
//////////////////////Logging-start////////////////////////////
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
// { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }


var winston = require('winston');
var logLevel = getLogLevel();
var moment = require('moment');
//Set unhandeld exception behaviour
winston.handleExceptions(new winston.transports.File({ filename: '/var/log/travel_planner/exceptions.log' }));

//     new (winston.transports.Console)({ json: false, timestamp: function (){
// return moment.utc().format("YYYY-MM-DD HH:mm:ss.SSS");},level: logLevel, colorize:true }),

var winston = new (winston.Logger)({
    transports: [
        new winston.transports.File({
            filename: '/var/log/travel_planner' + '/app.log', json: false,
            json: false, timestamp: getLogTime, colorize: true, level: logLevel
        }),
        new (winston.transports.Console)({
            json: false, timestamp: getLogTime, colorize: true, level: logLevel
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: '/var/log/travel_planner' + '/exceptions.log', json: false,
            json: false, timestamp: getLogTime, colorize: true, level: logLevel
        }),
        new (winston.transports.Console)({
            json: false, timestamp: getLogTime, colorize: true, level: logLevel
        })
    ],
    exitOnError: false,
});
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

//Function to log messages.
const logger = function (logType, logMessage) {
    // logMessage = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' - ' + logMessage;
    switch (logType) {
        case 0:
            winston.error(logMessage);
            break;
        case 1:
            winston.warn(logMessage);
            break;
        case 2:
            winston.info(logMessage);
            break;
        case 3:
            winston.verbose(logMessage);
            break;
        case 4:
            winston.debug(logMessage);
            break;
        case 5:
            winston.silly(logMessage);
        default:
            break;
    }
};


function getLogTime() {
    return moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss.SSS");
}

//Detect environment and set log level
function getLogLevel() {
    var logLevel;
    if (process.env.NODE_ENV == 'production') {
        logLevel = 'verbose';
        // app.use(morgan('common', { skip: function (req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
    } else {
        logLevel = 'debug';
        // app.use(morgan('dev', { skip: function (req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
    }
    return logLevel;
}

export default logger;
//////////////////////Logging-end////////////////////////////
