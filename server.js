const   express = require('express'),
        exphbs = require('express-handlebars'),
        mongoose = require ('mongoose'),
        bodyParser = require ('body-parser');
var db = require ('./models');



//const scrape = require ('./scripts/scrape');

const PORT = process.env.PORT || 3000;
const app = express ();
//const routes = require("./routes");
app.use (express.static ('public'));

app.use(bodyParser.json());
app.use (bodyParser.urlencoded ({extended: true}));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./routes/api-routes.js')(app);
require ('./routes/html-routes.js')(app);



const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/petsdb';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)
    app.listen(PORT, function () {
        console.log("App running on port " + PORT + "!");
    })
