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


// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const randomQuote = require('./third-parties/random-quote');
// const randomPicture = require('./third-parties/random-picture');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// let Quote = {
//     id: String,
//     quote: String,
//     image: String
// }


// app.get('/', function (req, res) {
//     res.send('Saludos desde express');
// });

// app.route('/api/v1/generate-changing-life-quote')
// .get(function (req, res) {
//     console.log(randomQuote);
//     res.send(randomQuote);
// })
// .post(function (req, res) {
//     if(!req.body.quote || !req.body.image) {
//      respuesta = {
//       error: true,
//       codigo: 502,
//       mensaje: 'El campo nombre y apellido son requeridos'
//      };
//     } else {
//      if(Quote.id !== '' || Quote.quote !== '' || Quote.image !== '') {
//       respuesta = {
//        error: true,
//        codigo: 503,
//        mensaje: 'El usuario ya fue creado previamente'
//       };
//      } else {
//       Quote = {
//        id: req.body.id,
//        quote: req.body.quote,
//        image: req.body.image
//       };
//       respuesta = {
//        error: false,
//        codigo: 200,
//        mensaje: 'Usuario creado',
//        respuesta: usuario
//       };
//      }
//     }    
//     res.send(respuesta);
// });

// app.use(function(req, res, next) {
//     respuesta = {
//      error: true, 
//      codigo: 404, 
//      mensaje: 'URL no encontrada'
//     };
//     res.status(404).send(respuesta);
// });

// app.listen(3000, () => {
//     console.log("Server init at 3000");
// });