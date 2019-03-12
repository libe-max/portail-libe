var fs = require('fs'),
    fse = require('fs-extra'),
    express = require('express'),
    router = express.Router(),
    async = require('async')
    del = require('del'),
    temoignage = require('../make/temoignage/temoignage')

router.use(function(req, res, next) {
    console.log('App use => '+req.originalUrl)
    next();
});

router.get('/formatData/:id', function(req, res) {
  // console.log(JSON.stringify(req.body))
  fs.readFile('./dist/app/' + req.params.id + '/static/datas.json', (err, data) => {
    if (err) throw err;
    res.json({message: true, format: JSON.parse(data)})
  })
});

router.post('/clean', function(req, res) {
  // console.log(JSON.stringify(req.body))
  temoignage.clean(function () {
    console.log('ok')
    res.json({message: true});
  });
});

router.post('/show', function(req, res) {
  // console.log(JSON.stringify(req.body))
  let data = req.body.dataJson;
  temoignage.make(data, false, function () {
    console.log('ok')
    res.json({message: true});
  });
});

router.post('/save', function(req, res) {
  // console.log(JSON.stringify(req.body))
  let data = req.body.dataJson;
  temoignage.make(data, true, function () {
    console.log('ok')
    res.json({message: true});
  });
});

module.exports = router;