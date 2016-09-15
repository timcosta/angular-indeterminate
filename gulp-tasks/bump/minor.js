var bump = require('gulp-bump');

module.exports = function() {
    return this.gulp.src(["./package.json", "./bower.json"])
    .pipe(bump({
        type: 'minor',
        preid: 'rc'
    }))
    .pipe(this.gulp.dest("./"));
};
