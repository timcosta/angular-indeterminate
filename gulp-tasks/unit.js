var Server = require('karma').Server;

module.exports = function(done) {
    return new Server({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: true
    }, done).start();
};
