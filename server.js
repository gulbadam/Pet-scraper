const   express = require('express'),
        exphbs = require('express-handlebars'),
        mongoose = require ('mongoose'),
        bodyParser = require ('body-parser');


//const scrape = require ('./scripts/scrape');

const PORT = process.env.PORT || 3000;
const app = express ();
//const routes = require("./routes");
app.use (express.static ('public'));
app.engine ('handlebars', exphbs ({defaultLayout: 'main'}));
app.set ('view engine', 'handlebars');
app.use (bodyParser.urlencoded ({extended: false}));
app.use (bodyParser.json ());
require ('./routes/api-routes.js') (app);
//require ('./routes/html-routes.js') (app);



const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/petsdb';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
//category = 'kitten';

//scrape(category)
app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});