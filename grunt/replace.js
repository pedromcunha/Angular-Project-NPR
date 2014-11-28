module.exports = {
    dist: {
      options: {
          patterns: [{
              match: /http:\/\/localhost:1337/g,
              replacement: 'https://trailer-parke.herokuapp.com'
          }]
      },
      files: [{
          expand: true,
          flatten: true,
          src: ['public/js/main.js'],
          dest: 'public/js/'
      }]
    },
    dev: {
      options: {
          patterns: [{
              match: /https:\/\/trailer-parke.herokuapp.com/g,
              replacement: 'http://localhost:1337'
          }]
      },
      files: [{
          expand: true,
          flatten: true,
          src: ['public/js/main.js'],
          dest: 'public/js/'
      }]
    }
};