const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  concat = require('gulp-concat'),
  notify = require("gulp-notify");



// sass tasks
gulp.task('sass', () =>
  gulp.src('src/scss/main.scss')
    .pipe(postcss([autoprefixer()]))
    .pipe(sass({
      sourceComments: false,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('public/css/'))
    .pipe(notify("Sass Complete!"))
);   

// javascript tasks
gulp.task('js', () =>
  gulp.src('src/js/main.js')
  .pipe(babel({ presets: ['env'] }))
  .pipe(uglify())
  .pipe(gulp.dest('public/js/'))
  .pipe(notify("JS Complete!"))
);

// sass lint
gulp.task('sass_lint', lintCssTask = () => {
  const gulpStylelint = require('gulp-stylelint');
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

// images optimization works with jpeg, jpg, svg, gif, png
gulp.task('images', () =>
  gulp.src('src/images/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('public/images/'))
    .pipe(notify("Images Complete!"))
);
// copy php to distribution folder
gulp.task('php', () =>
  gulp.src(['src/index.php', 'src/partials/**/*'], { "base" : "src/" })
    .pipe(gulp.dest('public/'))
    .pipe(notify("PHP Complete!"))
);

// copy fonts
/*
gulp.task('fonts', function() {
    gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('public/fonts/'));
});
*/

// copy fa webfonts
gulp.task('fontawesome', function() {
    gulp.src('node_modules/@fortawesome/fontawesome-free/js/all.min.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js/'))
    .pipe(notify("FontAwesome Complete!"))
});


gulp.task('default', ['sass', 'js', 'images', 'php', 'fontawesome']);

gulp.task('watch', ['sass', 'js', 'images', 'php', 'fontawesome'], () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/main.js', ['js']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('src/index.php', ['php']);
});
