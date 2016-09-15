var coffee = require('gulp-coffee');

module.exports = function() {
    return this.gulp.src("src/*.coffee")
    .pipe(coffee())
    .pipe(this.gulp.dest("dist"));
};
