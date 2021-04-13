require('dotenv').config();
const mongoose = require('mongoose');
var fs = require('fs')
var https = require('https')

const privateKey = fs.readFileSync('/etc/letsencrypt/live/s-neon.xyz/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/s-neon.xyz/fullchain.pem', 'utf8')

const credentials = {
   key: privateKey,
   cert: certificate
}

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

require('./models/Warn');
const app = require('./app');

const server = https.createServer(credentials, app).listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
