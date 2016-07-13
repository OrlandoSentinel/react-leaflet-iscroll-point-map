var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
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

gulp.task('autoprefixer', function(){
	gulp.src('./css/build/app.css')
	    .pipe(postcss([ 
	        autoprefixer({ 
	            browsers: [
                    'Firefox >= 1',
                    'Chrome >= 1',
                    'Safari >= 5',
                    'Edge >= 1',
                    'IE >= 9',
                    'iOS >= 6',
                    'ChromeAndroid >= 1',
                    'FirefoxAndroid >= 1',
                    'Android >= 4'
			    ]
	        }) 
	    ]))
        .pipe(gulp.dest('./css/build'));
});