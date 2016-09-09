var path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, reqa, res, next) {
            res.status(err.status || 500);
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });
};