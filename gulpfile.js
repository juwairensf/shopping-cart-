//gulp的插件；
//1、http插件(服务器插件)；
//gulp-connect;

//引入gulp模块；
const gulp=require("gulp");
//gulp服务器插件；
const connect=require("gulp-connect");
//gulp合并插件；
const concat=require("gulp-concat");
//gulp js压缩插件；
const uglify=require("gulp-uglify");
//gulp编译插件；
const babel=require("gulp-babel");
//css压缩插件
const cleanCss=require("gulp-clean-css");
//sass编译插件
const sass=require("gulp-sass-china");
gulp.task('connect',function(){
	connect.server({
		port:8888,
		root:"dist/",
		livereload:true,
		middleware: function (connect, opt) {
	      var Proxy = require('gulp-connect-proxy');
	      opt.route = '/proxy';
	      var proxy = new Proxy(opt);
	      return [proxy];
    	}
	})
});

gulp.task("sass",()=>{
	return gulp.src(["sass/*.scss"])
	.pipe(sass().on("error",sass.logError))
	.pipe(gulp.dest("dist/css"));
})
gulp.task("html",()=>{
	return gulp.src("*html").pipe(gulp.dest("dist/")).pipe(connect.reload());
})
gulp.task("watch",()=>{
	gulp.watch("index.html",["html","sass"]);
	gulp.watch("sass/*.scss",["html","sass"]);
})
gulp.task("default",["watch","connect"])


//2、gulp js合并
//gulp-concat(gulp js合并插件)；

//script转存指令；
//gulp.task("script",()=>{
//	return gulp.src(["script/app/*.js","script/libs/*.js","script/module/*.js"]).pipe(gulp.dest("dist/script"));
//})


//合并插件；
//gulp.task("script",()=>{
//	return gulp.src(["script/app/*.js","script/libs/*.js","script/module/*.js"])
//	.pipe(concat("mian.js"))//main.js合并后的文件；
//	.pipe(gulp.dest("dist/script"));
//})

//压缩插件；
//gulp-uglify;
gulp.task("script",()=>{
	return gulp.src(["script/app/*.js","script/libs/*.js","!script/libs/require.js","script/module/*.js"])
	.pipe(concat("mian.js"))//main.js合并后的文件；
	.pipe(uglify())//压缩
	.pipe(gulp.dest("dist/script"));
})


//css压缩
gulp.task("css",()=>{
	return gulp.src(["css/*.css"])
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"));
})

//编译？ es6 => es5;
//借助Babel；

gulp.task("es6",()=>{
	return gulp.src("script/es2015/*.js")
	.pipe(babel({
		presets:['@babel/env']
	}))
	.pipe(gulp.dest("dist/script"));
})
