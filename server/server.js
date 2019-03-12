const fs = require('fs'),
      express = require('express'),
      app = express(),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      request = require('request'),
      fileUpload = require('express-fileupload'),
      del = require('del'),
      cors = require('cors'),
      _ = require('lodash'),
      JSFtp = require("jsftp");

const files = require('./router/files'),
      apiHome = require('./router/home'),
      apiTemoignage = require('./router/temoignage'),
      apiQuiz = require('./router/quiz');


var port = process.env.PORT || 8081;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.use(express.static('dist'));

app.use('/api/home', apiHome);
app.use('/api/temoignage', apiTemoignage);
app.use('/api/quiz', apiQuiz);
app.use('/files', files);

app.listen(port, function () {
  console.log('Your server is running here: http://localhost:'+port);
});