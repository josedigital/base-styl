
var gulp        = require('gulp');
var harp        = require('harp')
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var shell       = require('gulp-shell');

/**
 * Serve the Harp Site
 */
gulp.task('serve', function () {
  harp.server(__dirname, {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    /**
     * Watch for stylus changes, tell BrowserSync to refresh master.css
     */
    gulp.watch("./css/**/*.styl", function () {
      reload("./css/master.css", {stream: true});
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["./**/*.jade", "./**/*.json", "./**/*.md"], function () {
      reload();
    });
  })
});





/**
 * Serve the site in production
 */
 gulp.task('production', function () {
  return gulp.src('')
    .pipe(shell([
      'NODE_ENV=production sudo harp server --port 80'
    ]))
});



/**
 * Build the Harp Site
 */
gulp.task('build', function () {
  return gulp.src('')
    .pipe(shell([
      'harp compile . dist'
    ]))
});


/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);