const db = require ('../models');
module.exports=(app)=>{
    app.get("/", (req, res)=>{
        res.render("home", { head: "home" })
    });
    app.get("/kittens", (req, res)=>{
        db.Post.find({ category: "kitten"})
        .then((post)=>{
            res.render("home", {post :post, head: "Kittens" })
        })
        .catch((err)=>{
            res.render("home", {error: err})
        })

    })
    app.get("/puppies", (req, res) => {
        db.Post.find({ category: "puppy" }, null, { sort: { date: -1 } })
        .then((post) => {
            res.render("posts", { post: post , head: "Puppies" })
        })
            .catch((err) => {
                res.render("posts", { error: err })
            })

    })
    app.get ('/saved', (req, res) => {
        db.Post.find({ saved: true }, null, { sort: { date: -1 } });
        then ((post) => {
        res.render ('posts', {post: post, head: "Saved Posts"});
        }).catch (err => {
        res.render ('posts', {error: err});
        });
});


}