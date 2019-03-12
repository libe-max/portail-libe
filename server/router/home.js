var fs = require('fs'),
    fse = require('fs-extra'),
    express = require('express'),
    router = express.Router(),
    async = require('async')
    del = require('del'),
    index = require('../make/index')

router.use(function(req, res, next) {
    console.log('App use => '+req.originalUrl)
    next();
});

router.get('/index', function(req, res) {
  // console.log(JSON.stringify(req.body))
  index.all((allFormat) => {
    res.json({message: true, index: allFormat})
  })
});

router.post('/edit', function(req, res) {
  // console.log(JSON.stringify(req.body))
  temoignage.clean(function () {
      console.log('ok')
      fse.copy('./dist/app/' + req.body.dataJson.id + '/static/upload/', './make/' + req.body.dataJson.type + '/tmp/static/upload')
        .then(() => {
          console.log('success!')
          res.json({message: true});
        })
        .catch(err => {
          console.error(err)
        })
    });
});

router.post('/delete', function(req, res) {
  // console.log(JSON.stringify(req.body))
  let data = req.body.dataJson;
  del('./dist/app/' + data)
  .then(paths => {
    index.all((allFormat) => {
      res.json({message: true, index: allFormat})
    })
  })
});

module.exports = router;