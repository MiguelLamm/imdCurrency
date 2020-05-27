const imagemin = require('gulp-imagemin');
const gulp = require('gulp');

gulp.task('default', () => {
  gulp.src('./sources/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'))
});