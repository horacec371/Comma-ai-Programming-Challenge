const express = require('express');
const bodyParser = require('body-parser')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')
var fileSystem = require( "fs" );
const {createServer} = require('http')

const normalizePort = port => parseInt(port,10)
const PORT = normalizePort(process.env.PORT || 3001)

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
const server = createServer(app)

// PRODUCTION||DEVELOPMENT CONFIG
const dev = app.get('env') !== 'production'
if(!dev){
  console.log('PRODUCTION')
  app.disable('x-powered-by')
  app.use(compression())
  app.use(morgan('common'))

  app.use(express.static(path.resolve(__dirname, '../build')))

  app.get('*',(req,res,next) => {
    if (req.url === '/api/files')
      return next();
    else
      res.sendFile(path.resolve(__dirname,'../build', 'index.html'))
  })
}
else{
  console.log('DEVELOPMENT')
  app.use(morgan('dev'))
}

let trips_data = []

function onFileContent(content,index){
  if(!trips_data[index])
    trips_data[index] = content
  else
    trips_data[index] += content

}

 function read2(dirname, filename,index){
    const stream = fileSystem.createReadStream(dirname + filename, {encoding: 'utf8'});
      stream.on('close', () => {
      });
      stream.on('data', data => {
        onFileContent(data,index)
      });
      stream.on('end',() => {
        stream.destroy()
      })

      stream.on('error',(err) => {
        res.end(err)
      })
}



function readFiles(dirname, onFileContent, onError) {
fileSystem.readdir(dirname,async function(err, filenames) {
  if (err) {
    onError(err);
    return;
  }
  for(let i=0;i<filenames.length;i++){
    await read2(dirname,filenames[i],i)
  }
});
}

//calls the function that enables the stream processing for every file in the trips/ directory
readFiles('trips/',(filename,content) => {
  trips_data.push(content)
  },(err) => {
   throw err;
  })





//Only route which is used to send the a big json file of trips back to the client for further processing
app.get('/api/files', (req,res,next) => {
   if(res.statusCode === 200)
      res.send(trips_data)
   else
      res.send(res.statusCode)
})





server.listen(PORT, err => {
  if(err) throw err
  console.log(`Server started`)
});
