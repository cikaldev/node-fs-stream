const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 1234;

const loader = filename => {
  return path.join(__dirname, 'public', filename);
}

http.createServer((req, res) => {
  console.log(req.url)
  if (req.url != '/') {
    const filename = loader(req.url)
    const readStream = fs.createReadStream(filename)
    readStream.on('open', () => {
      readStream.pipe(res)
    })
    readStream.on('error', err => {
      res.end(
        fs.readFileSync(loader('404.html'), 'utf8')
      )
    })
  } else {
    res.end(
      fs.readFileSync(loader('index.html'), 'utf8')
    )
  }
}).listen(PORT)