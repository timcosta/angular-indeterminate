var bump = require('gulp-bump');

module.exports = function() {
    return this.gulp.src(["./package.json", "./bower.json"])
    .pipe(bump({
        type: 'prerelease',
        preid: 'rc'
    }))
    .pipe(this.gulp.dest("./"));
};
