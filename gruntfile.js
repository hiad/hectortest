module.exports = function(grunt) {
  // the general grunt function that is run

  grunt.initConfig({
    // here we setup our config object with package.json and all the tasks

    pkg: grunt.file.readJSON("package.json"),

    sass: {
      // sass tasks
      dist: {
        options: {
          style: "expanded" // we don't want to compress it
        },
        files: {
          "public/styles/main.css": "sass/main.scss" // this is our main scss file
        }
      }
    },

    cssmin: {
      // minifying css task
      dist: {
        files: {
          "public/styles/main.min.css": "public/styles/main.css"
        }
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: {
          "public/build/main.min.js": ["src/main.js"]
        }
      }
    },

    watch: {
      // watch task for general work
      sass: {
        files: ["sass/*.scss"],
        tasks: ["sass"]
      },
      styles: {
        files: ["public/styles/main.css"],
        tasks: ["cssmin"]
      }
    },
    browserSync: {
      default_options: {
        bsFiles: {
          src: ["public/styles/*.css", "public/*.html"]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "public/"
          }
        }
      }
    }
  });

  // all the plugins that is needed for above tasks
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-run");
  grunt.loadNpmTasks("grunt-browser-sync");

  // registering the default task that we're going to use along with watch
  grunt.registerTask("default", [
    "browserSync",
    "watch",
    "sass",
    "cssmin"
  ]);
};
