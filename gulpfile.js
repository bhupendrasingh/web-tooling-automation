var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('default',function(){
	console.log("Hello World")
});

gulp.task('styles',function(){
	gulp.src('sass/**/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./css'))
});

gulp.task('change',function(){
	gulp.watch('/sass/**/*.scss',['styles'])
});


browserSync.init({
	server:'/'
});
browserSync.stream();