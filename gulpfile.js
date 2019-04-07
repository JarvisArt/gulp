const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

gulp.task('clear', (done) => {
  del.sync('build');
  done();
});

gulp.task('less', (done) => {
  gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 5 version', 'Firefox > 20'],
      cascade: false
    }))
    .pipe((cleanCSS()))
    .pipe(gulp.dest('build'))
  done();
});

gulp.task('default', gulp.parallel('clear', 'less'), (done) => {
  console.log('done!');
  done();
});

gulp.task('watch', (done) => {
  const watcher = gulp.watch('src/**/*', gulp.parallel('default'));
  watcher.on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  done();
})