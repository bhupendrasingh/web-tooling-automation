var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default',function(){
	console.log("Hello World");
});

gulp.task('styles',function(){
	gulp.src('sass/**/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./css'))
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('change',function(){
	gulp.watch('/sass/**/*.scss',['styles'])
});

gulp.task('copy-html',function(){
	gulp.src('./index.html')
	.pipe(gulp.dest('./dist'));
});

gulp.task('movejs',function(){
	gulp.src('./js/**/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});


//creating the distribution

gulp.task('dist',[
	'copy-html',
	'styles',
	'movejs'
]);

browserSync.init({
	server:'./'
});
browserSync.stream();