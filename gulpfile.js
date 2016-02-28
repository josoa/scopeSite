var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./production"
    });

    gulp.watch("development/scss/*.scss", ['sass']);
    gulp.watch("development/*.html", ['html']);
    gulp.watch("development/js/*.js", ['js']);
    browserSync.reload;
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("development/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("production/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("development/js/*.js")
        .pipe(gulp.dest("production/js"))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    return gulp.src("development/img/*.*")
        .pipe(gulp.dest("production/img"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src("development/*.html")
        .pipe(gulp.dest("production/"))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);
gulp.task('copy', ['js', 'img', 'html']);