var gulp =require('gulp'),
nodemon = require('gulp-nodemon');

gulp.task('default',function(){
nodemon({
  script : "index.js",
  env:'js',
  env:{
    PORT:8000
  }
  // ,
  // ignore:['./node_modules/**']
})
.on('restart',function(){
  console.log('restarting');
});
});
