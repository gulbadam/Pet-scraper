const db = require ('../models');
const scrape = require ('../scripts/scrape');
module.exports = {
    scrapeKittens:(req, res)=>{
        return scrape(kitten)
        .then((pst)=>{
            return db.Post.create(pst);
        })
        .then((dbPost) =>{
            if (dbPost.length===0) {
                res.json({
                    message: "No new post today"
                })
            }else{
                res.json({
                    message: "Added " + dbPost.length + " new posts!"
                });
            }
        })
        .catch((err)=>{
            res.json({
                message: "Scrape complete!!"  
            })
        })
    },
    scrapePuppies: (req, res) => {
        return scrape(puppy)
            .then((pst) => {
                return db.Post.create(pst);
            })
            .then((dbPost) => {
                if (dbPost.length === 0) {
                    res.json({
                        message: "No new post today"
                    })
                } else {
                    res.json({
                        message: "Added " + dbPost.length + " new posts!"
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