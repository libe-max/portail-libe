const fs = require('fs'),
      fse = require('fs-extra'),
      { URL, URLSearchParams } = require('url'),
      Mustache = require('mustache'),
      Twitter = require('twitter'),
      Moment = require('moment'),
      Async = require('Async'),
      Less = require('less'),
      rp = require('request-promise'),
      del = require('del')
      secretTwitter = require('./twitter');

var parseDate = function (date) {
  var d = new Date(date);
  return Moment(d).format('DD/MM/YYYY, H:mm')
};

var getTweet = function (id) {
  return new Promise((resolve, reject) => {
    var botTwitter = new Twitter(secretTwitter);
    botTwitter.get('statuses/show', {id: id}, function (error, tweet, response) {
      //console.log(JSON.stringify(tweet))
      if (error) reject(error)
      else resolve(tweet)
    });
  });
};

var getUrlParams = function (url, param) {
  var myUrl = new URL(url);
  return myUrl.searchParams.get(param);
}

function makeHtml (json, next) {

  // load base template
  let base = fs.readFileSync('./make/temoignage/templates/base.mustache').toString()

  // load all partials templates
  let templatePartials = {}
  let allTemplates = fs.readdirSync('./make/temoignage/templates/partials/')
  allTemplates.forEach(partials => {
    let fileName = partials.split('.')[0]
    templatePartials[fileName] = fs.readFileSync('./make/temoignage/templates/partials/' + partials).toString()
  })

  // mustache render
  let index = Mustache.render(base, json, templatePartials);
  
  // write html
  fs.writeFile('./make/temoignage/tmp/index.html', index.toString(), function (err) {
    if (err) console.log(err);
    console.log('App make => ./make/temoignage/tmp/index.html');
    next(json);
  });

}

function makeLess (json, next) {

  var mainLess = fs.readFileSync('./make/temoignage/less/main.less').toString();
  Less.render(mainLess, {
    paths: ['./make/temoignage/less'],
    filename: 'main.less',
    modifyVars: {
      'primary-color': json.mainColor,
      'side-color': json.sideColor
    }
  })
  .then(function (output) {
    fs.writeFile('./make/temoignage/tmp/static/style.css', output.css, function (err) {
      if (err) console.log(err);
      console.log('App make => ./make/temoignage/tmp/static/style.css');
      next()
    });
  },
  function (error) {
    console.log(error)
  });

}

function copyDir (destination, next) {
  del(['dist/tmp/**', '!dist/tmp'])
  .then(paths => {
    fse.copy('./make/temoignage/tmp/', destination)
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
  del(['make/temoignage/tmp/static/upload/**', '!make/temoignage/tmp/static/upload'])
  .then(paths => {
    next()
  })
}

exports.make = (data, isProduction, next) => {

  var parseData = Object.assign({}, data);
  var parseItems = [];

  Async.each(parseData.items, function (d, callback) {

    if (d.type !== 'tweet' && d.type !== 'instagram' && d.type !== 'video') {

      parseItems.push({[d.type]: d});
      callback();

    } else if (d.type === 'video') {

      if (d.videoType === 'dailymotion') d.videoId = d.videoUrl.split('/').reverse()[0];
      else if (d.videoType === 'youtube') d.videoId = getUrlParams(d.videoUrl, 'v');
      parseItems.push({[d.videoType]: d});
      callback();

    } else if (d.type === 'tweet') {
      var tweetId = d.tweet.split('/').reverse()[0];
      getTweet(tweetId).then(res => {

        d.id = res.id_str;
        d.fromname = res.user.name;
        d.fromscreenname = res.user.screen_name;
        d.text = res.text;
        d.date = parseDate(res.created_at);
        d.picture = res.user.profile_image_url;
        if (res.entities.media && res.entities.media.length > 0) {
          d.image = res.entities.media[0].media_url;
          d.text = d.text.replace(res.entities.media[0].url, "");
        }
        if (res.entities.urls && res.entities.urls.length > 0) {
          d.text = d.text.replace(res.entities.urls[0].url, "");
          d.link = true;
          d.linkUrl = res.entities.urls[0].url;
          d.linkDisplay = res.entities.urls[0].display_url;
        }
        parseItems.push({[d.type]: d});
        callback();
      }).catch(function (err) {
        console.log('Error parse Tweet', err);
        callback();
      });

    } else if (d.type === 'instagram') {
      rp({
        uri: 'https://api.instagram.com/oembed/?url='+d.instagram,
        json: true
      }).then(res => {
        d.url = d.instagram;
        d.fromname = res.author_name;
        d.image = res.thumbnail_url;
        parseItems.push({[d.type]: d});
        callback();
      }).catch(function (err) {
        console.log('Error parse Instagram', err);
        callback();
      });

    }

  }, function (err) {
    if (err) console.log(err)
    else {
      
      parseData.items = parseItems;
      let dest = isProduction ? './dist/app/' + parseData.id + '/' : './dist/tmp/'

      fs.writeFile('./make/temoignage/tmp/static/datas.json', JSON.stringify(data), function (err) {
        if (err) console.log(err);
        console.log('App make => ./make/temoignage/tmp/datas.json');
        makeHtml(parseData, json => {
          makeLess(json, _ => {
            copyDir(dest, next)
          })
        });
      });
    }
  });

}