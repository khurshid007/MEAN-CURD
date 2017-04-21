//node modules
var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 


//sources watched for livereload
var htmlSources = ['*.html'];
var cssSources = ['public/css/*.css'];
var jsSources = ['public/javaScripts//**/*.js'];
var jsonSources = ['public/js/*.json'];
var allSources = htmlSources.concat(cssSources).concat(jsSources).concat(jsonSources);

//script paths
var jsFiles = 'public/javaScripts/**/*.js',  
    jsDest = 'public/dist/scripts';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
       // .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});





//local-server
gulp.task('server', function () {
    connect.server({
        root: 'public',
        livereload: true
    });
});

    gulp.task('default', function() {
    gulp.start('server');
     gulp.start('scripts');
     gulp.start('watch');
});

//livereload
gulp.task('livereload', function () {
    gulp.src('public/index.html')
    .pipe(connect.reload());
     console.log('index has changed');
});

//watch the file changes to trigger livereload
gulp.task('watch', function () {
	//watch({glob: 'public/index.html'}, ['livereload']).pipe(connect.reload());
    gulp.watch(['public/index.html','public/views//**/*.html'], ['livereload']);
});

//gulp default
gulp.task('default', ['server', 'watch','scripts'],function(){
});
