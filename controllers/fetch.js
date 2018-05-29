const db = require ('../models');
const scrape = require ('../scripts/scrape');

module.exports = {
    scrapeKittens:(req, res)=>{
        let category = "kitten"
        return scrape(category)
        .then(function (posts){
            console.log(posts)
            return db.Post.create(posts);
        })
            .then((petsdb) =>{
                if (petsdb.length===0) {
                res.json({
                    message: "No new post today"
                })
            }else{
                res.json({
                    message: "Added " + petsdb.length + " new posts!"
                });
            }
        })
        .catch((err)=>{
            console.log(err)
            res.json({
                message: "Scrape complete!!"  
            })
        })
    },
    scrapePuppies: (req, res) => {
        let category = 'puppy';

        return scrape(category)
            .then((posts) => {
                return db.Post.create(posts);
            })
            .then((petsdb) => {
                if (petsdb.length === 0) {
                    res.json({
                        message: "No new post today"
                    })
                } else {
                    res.json({
                        message: "Added " + petsdb.length + " new posts!"
                    });
                }
            })
            .catch((err) => {
                res.json({
                    message: "Scrape complete!!"
                })
            })
    },

};