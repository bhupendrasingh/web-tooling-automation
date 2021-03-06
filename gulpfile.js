var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');

gulp.task('default',['dist']function(){
	console.log("Making Dist");
	gulp.watch('/sass/**/*.scss',['styles']);
	gulp.watch('./dist/index.html').on('change',browserSync.reload);

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

//lint checking

gulp.task('lint-check',function(){
	return gulp.src('js/**/*.js')
	.pipe(eslint)
	//formatiing the output
	.pipe(eslint.format())
	//exit with proper error code
	.pipe(eslint.failonError);
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