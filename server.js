const express = require('express'),
      mongoose = require('mongoose'),
	  app = express();

const env = require('./config/database.js'),
	environment = new env();

//load expressjs configs/headers/defaults.  for more info, check expressjs.com, pass in app and overall config
require('./config/express_config')(app);

mongoose.connect(environment.connstring)
// load model
const ExchangeRecord = require('./models/exchanges.js')(mongoose);

//loading up my routes and passing the app instance to it
require("./routes")(app, ExchangeRecord);

app.listen(environment.port);
console.log('listening on port ' + environment.port)

/* from right to left:  assigning the app function to module.exports,
   which in turn is implicitely assigning it to the exports variable.
   Now exports = app everywhere.
   More Info:  http://bites.goodeggs.com/posts/export-this/#namespace
*/

exports = module.exports = app;