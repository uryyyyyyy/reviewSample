var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');

gulp.task('cleanBuild', function (cb) {
	var rimraf = require('rimraf');
	rimraf('./build/', cb);
});

gulp.task('copyIndexAndCss', ['cleanBuild'], function () {
	return gulp.src([
		'./src/index.html',
		'./src/styles/*.css',
		'./node_modules/react-widgets/dist/**/*.*',
		'./node_modules/react-select/dist/default.css'
	])
	.pipe(gulp.dest('./build/'));
});

gulp.task('webpackInc', function (cb) {
	var config = {
		entry: './src/main.js',
		output: {
			filename: './build/bundle.js'
		},
		devtool: 'inline-source-map',
		module: {
			loaders: [
				{ test: /\.js$/, loader: 'babel-loader' }
			]
		},
		resolve: {
			extensions: ['', '.js']
		},
		watch: true,
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('development')
				}
			}),
			new webpack.optimize.DedupePlugin()
		]
	};

	return gulp.src('')
	.pipe(gulpWebpack(config))
	.pipe(gulp.dest(''));
});

gulp.task('copyBower', ['copyIndexAndCss'], function () {
	return gulp.src('./src/bower_components/**')
	.pipe(gulp.dest('./build/bower_components/'));
});

gulp.task('webpack', ['copyBower'], function (cb) {
	var config = {
		entry: './src/main.js',
		output: {
			filename: './build/bundle.js'
		},
		module: {
			loaders: [
			{ test: /\.js$/, loader: 'babel-loader' }
			]
		},
		resolve: {
			extensions: ['', '.js']
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin()
		]
	};

	return gulp.src('')
	.pipe(gulpWebpack(config))
	.pipe(gulp.dest(''));
});

gulp.task('easymock', function () {
	var MockServer = require('easymock').MockServer;
	var options = {
		keepalive: true,
		port: 3000,
		path: './webAPI'
	};
	var server = new MockServer(options);
	server.start();
});

gulp.task('devServer', ['easymock'], function() {
	var webserver = require('gulp-webserver');
	gulp.src('./build/')
	.pipe(webserver({
		livereload: false,
		directoryListing: false,
		port:9001,
		open: false,
		proxies: [{
			source: '/webAPI',
			target: 'http://localhost:3000/'
		}]
	}));
});

gulp.task('watch', ['webpackInc'], function () {
	gulp.watch(['./src/**/*.js', './src/index.html'], ["webpackInc"]);
});

gulp.task("develop", ["devServer", "watch", "copyBower"]);
gulp.task("build", ["devServer", "webpack"]);
