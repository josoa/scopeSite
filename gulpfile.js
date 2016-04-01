var gulp        = require('gulp');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: "./production"
	});

	gulp.watch("development/scss/*.scss", ['sass']);
	gulp.watch("development/*.html", ['fileinclude']);
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

gulp.task('fonts', function() {
	return gulp.src("development/fonts/*.*")
		.pipe(gulp.dest("production/fonts"));
});

gulp.task('img', function() {
	return gulp.src("development/img/*.*")
		.pipe(gulp.dest("production/img"));
});

gulp.task('imgFolders', function() {
	return gulp.src("development/img/*/*.*")
		.pipe(gulp.dest("production/img"));
});

//gulp.task('html', function() {
//	return gulp.src("development/*.html")
//		.pipe(gulp.dest("production/"))
//		.pipe(browserSync.stream());
//});

gulp.task('fileinclude', function() {
  gulp.src(['./development/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './development'
    }))
    .pipe(gulp.dest('production/'))
    .pipe(browserSync.stream());
});

gulp.task('fileinclude', function() {
  gulp.src(['./development/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './development'
    }))
    .pipe(gulp.dest('production/'))
    .pipe(browserSync.stream());
});


gulp.task('default', ['serve', 'fileinclude', 'copy']);
gulp.task('copy', ['js', 'img', 'imgFolders', 'fonts']);