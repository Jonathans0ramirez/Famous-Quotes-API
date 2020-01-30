//Import express, mongoose, bodyParser and routes
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./api-routes');

//OpenApi/Swagger documentation
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./docs/openApiDocumentation');

//Init app
const app = express();

//Use bodyparser to handle post requests and Api Routes in the app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Documentation routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use('/api/v1', apiRoutes);

//Connect to mongoose and set connection variable
mongoose.connect('mongodb://localhost/generate-changing-life-quote', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected sucessfully")

//Server Port
var port = process.env.PORT || 3000;

//Redirect
app.get('/', (req, res) => 
    res.redirect('/api/v1')
);

//Launch app to listen to specified port 
app.listen(port, function () {
    console.log("Server init on port " + port);
});