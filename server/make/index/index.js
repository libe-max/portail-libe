const fs = require('fs'),
      async = require('async')

exports.all = (next) => {
  let allFormat = []
  fs.readdir('./dist/app/', (err, dirs) => {
    if (err) throw err;
    async.each(dirs, (dir, callback) => {
      if (dir !== '.DS_Store') {
        fs.readFile('./dist/app/' + dir + '/static/datas.json', (err, data) => {
          if (err) throw err;
          allFormat.push(JSON.parse(data))
          callback()
        })
      } else callback()
    }, (err) => {
      // if any of the file processing produced an error, err would equal that error
      if (err) {
        console.log(err)
      } else {
        console.log('All files have been processed successfully')
        next(allFormat)
      }
    })
  })
}