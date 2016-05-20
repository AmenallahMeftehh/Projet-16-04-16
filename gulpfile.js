var gulp = require('gulp')
    , nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({
            script: "server.js"
            , env: 'js'
            , env: {
                PORT: 8000
            }
            // ,
            // ignore:['./node_modules/**']
        })
        .on('restart', function () {
            console.log('restarting');
        });
    
});
gulp.task('metadata', function() {
    gulp.src('./donnees/*.json')
        .pipe(mongodbData({ mongoUrl: 'mongodb://amenallahmefteh:mefteh@ds025762.mlab.com:25762/bdchallenge' }));
});