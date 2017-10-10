const gulp = require('gulp'),
  clean = require('gulp-clean'),
  es = require('event-stream'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  runSequence = require('run-sequence'),
  bootstrapBase = './node_modules/startbootstrap-stylish-portfolio',
  bootstrapFoldersToCopy = ['css', 'font-awesome', 'fonts', 'img', 'js'].map((value => `${bootstrapBase}/${value}/**`)),
  filesToCopy = ['robots.txt', 'index.html', 'error.html', 'js/**', 'img/**'].map((value => `./staticSite/${value}`)),
  allStaticSiteFiles = bootstrapFoldersToCopy.concat(filesToCopy);

gulp.task('clean', () => {
  return gulp.src('staticSite/dist', {read: false})
    .pipe(clean());
});

gulp.task('moveBootstrap', () => {
  return gulp.src(bootstrapFoldersToCopy, {base: bootstrapBase})
      .pipe(gulp.dest('staticSite/dist'))
});

gulp.task('moveSite', () => {
  return gulp.src(filesToCopy, {base: './staticSite'})
    .pipe(gulp.dest('staticSite/dist'));
});

gulp.task('sass', function () {
  return gulp.src('./staticSite/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./staticSite/dist/css'));
});

gulp.task('watch', ['dist'], () => {
  return gulp.watch(allStaticSiteFiles.concat('./staticSite/scss/**/*.scss'), ['dist']);
});

gulp.task('server', function () {
  return connect.server({
    root: 'staticSite/dist',
    port: process.env.PORT || 3000
  });
});

gulp.task('dist', (cb) => {
  runSequence('clean', 'moveBootstrap', 'moveSite', 'sass', cb)
});

gulp.task('dev', ['watch', 'server']);
