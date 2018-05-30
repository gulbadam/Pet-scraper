

const db =require("../models");
const scrape = require ('../scripts/scrape.js');



module.exports = (app) => {
    app.get('/api/kittens', (req, res)=>{
        let category = "kitten"
        scrape(category)
        .then((data)=>{
            console.log("?????????????????????")
            console.log(data)
            if (data && data.length){
                console.log(data.length)
                db.Post.collection.insertMany(
                    data, 
                    {ordered: false}, (err, posts)=>{
                if (err) {
                     res.json({
                           scraped: data.length,
                             stored: err.result.nInserted
                         })
                    }
                    else{
                        res.json({
                             scraped: data.length,
                             stored: posts.insertedCount
                        });
                     }
                  });
                }
                else{
                 res.json({ scraped: 0, stored: 0 });
                } 
         })
        .catch ((error) => {
            console.log (`caught the error: ${error}`);

    res.json({
        message: "error"})
        })
            
})
    app.get('/api/puppies', (req, res) => {
        let category = "puppy"
        scrape(category)
            .then((data) => {
                console.log("?????????????????????")
                console.log(data)
                if (data && data.length) {
                    console.log(data.length)
                    db.Post.collection.insertMany(
                        data,
                        { ordered: false }, (err, posts) => {
                            if (err) {
                                res.json({
                                    scraped: data.length,
                                    stored: err.result.nInserted
                                })
                            }
                            else {
                                res.json({
                                    scraped: data.length,
                                    stored: posts.insertedCount
                                });
                            }
                        });
                }
                else {
                    res.json({ scraped: 0, stored: 0 });
                }
            })
            .catch((error) => {
                console.log(`caught the error: ${error}`);

                res.json({
                    message: "error"
                })
            })

    })
    app.get("/api/category/kittens", (req, res)=>{
        db.Post.find({category: "kitten"})
        .then((dbKitten)=>{
            res.json(dbKitten)
        })
        .catch((err)=>{
            res.json(err)
        })
    })

 app.get("/",(req, res)=>{
     
db.Post.find({})
    .then((dbPost)=>{
        res.json(dbPost)
     })
    .catch (function(err) {
       res.json(err);
})

})
}
