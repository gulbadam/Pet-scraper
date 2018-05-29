

const db =require("../models");
const fetchController = require ('../controllers/fetch');
module.exports = (app) => {
    app.get('/kittens', fetchController.scrapeKittens);
    app.get('/puppies', fetchController.scrapePuppies);
}


