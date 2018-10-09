const logger = (function(req, res, next) {
    console.log(Date.now(), req.method, req.originalUrl);
    next();
});

module.exports = { logger };
