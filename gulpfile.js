var gulp       = require('gulp'), // Подключаем Gulp
  sass         = require('gulp-sass'), //Подключаем Sass пакет,
	less         = require('gulp-less'), //Подключаем Less пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
  autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
  LessAutoprefix = require('less-plugin-autoprefix'),
  autoprefix = new LessAutoprefix({ browsers: ['last 55 versions'] });
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	//del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	//pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	


gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('gulp/sass/**/*.sass') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('gulp/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
	
    
gulp.task('less', function(){ // Создаем таск Sass
	return gulp.src('gulp/less/**/*.less') // Берем источник
    .pipe(less({
      plugins: [autoprefix]
    }))
		.pipe(gulp.dest('gulp/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		proxy: 'filesystem', // указываем имя домена
		notify: false // Отключаем уведомления
	});
});


gulp.task('scripts', function() {
	return gulp.src('gulp/js/*.js')  // Берем все необходимые библиотеки
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('gulp/jsmin')); // Выгружаем в папку app/jsmin
});


gulp.task('css-libs', ['less'], function() {
	return gulp.src('app/css/libs.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});


gulp.task('watch', ['browser-sync', 'less'], function() {
	gulp.watch('gulp/less/**/*.less', ['less']); // Наблюдение за less файлами
	gulp.watch('**/*.html').on('change', browserSync.reload);
  gulp.watch('**/*.js').on('change', browserSync.reload);
  gulp.watch('**/*.php').on('change', browserSync.reload);
});


gulp.task('img', () =>
  gulp.src('img/src/*')
  .pipe(imagemin())
  .pipe(gulp.dest('img/dest'))
);


gulp.task('default', ['watch']);


/*
gulp.task('img', function() {
//	return gulp.src('img/src/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('img/dest')); // Выгружаем на продакшен
});
*/

/*
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))
*/
  
	//var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
  
  
  
	//.pipe(gulp.dest('dist/fonts'))

	//var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
  
    
	//.pipe(gulp.dest('dist/js'))

	//var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	//.pipe(gulp.dest('dist'));

//});

/*
gulp.task('clear', function (callback) {
	return cache.clearAll();
})
*/


/*
gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});
*/
