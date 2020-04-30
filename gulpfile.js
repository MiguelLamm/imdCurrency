const { src, dest } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
sass2css = function(){
  return src('sources/sass/app.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('dist/app.css'));
}
exports.default = function(){
  watch("./sources/sass/**/*.scss", sass2css);
};