const fs = require('fs'),
      fse = require('fs-extra'),
      { URL, URLSearchParams } = require('url'),
      Mustache = require('mustache'),
      Twitter = require('twitter'),
      Moment = require('moment'),
      Async = require('Async'),
      Less = require('less'),
      rp = require('request-promise'),
      del = require('del');

var parseDate = function (date) {
  var d = new Date(date);
  return Moment(d).format('DD/MM/YYYY, H:mm')
};

function copyDir (destination, next) {
  del(['dist/tmp/**', '!dist/tmp'])
  .then(paths => {
    fse.copy('./make/quiz/tmp/', destination)
    .then(() => {
      console.log('success!')
      next()
    })
    .catch(err => {
      console.error(err)
    })
  })
}

exports.clean = (next) => {
  del(['make/quiz/tmp/static/upload/**', '!make/quiz/tmp/static/upload'])
  .then(paths => {
    next()
  })
}

exports.make = (data, isProduction, next) => {

  let dest = isProduction ? './dist/app/' + data.id + '/' : './dist/tmp/'

  fs.writeFile('./make/quiz/tmp/static/datas.json', JSON.stringify(data), function (err) {
    if (err) console.log(err);
    console.log('App make => ./make/quiz/tmp/data.json');
    copyDir(dest, next)
  });
}