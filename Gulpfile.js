var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    saveLicense = require('uglify-save-license');
    
gulp.task('modernizr', function(){
	gulp.src('./node_modules/modernizr/modernizr.js')
		.pipe(uglify({
            output: {
                comments: saveLicense
            }
        }))
        .pipe(gulp.dest('./public/js'));
});