const express = require('express');
const cors = require('cors')
const configureDB = require('./config/Database');
const router = require('./config/Routes');

 
const app = express();
const port = process.env.PORT || 3025; 
app.use(express.json());
app.use(cors());
configureDB();

// Route Handlers || Request Handlers
app.get('/', (req, res) => {
  res.send('Welcome to app');
});

app.use('/', router);

app.listen(port, () => {
  console.log('listening to the port,', port);

});