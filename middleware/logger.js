const moment = require('moment');

const logger = (req, res, next) => {
    var log = {
        'reqUrl': `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        'reqTime': moment().format()
    }
    next();
    console.log(log);
}

module.exports = logger;