const db = require ('../models');
module.exports=(app)=>{
    app.get("/", (req, res)=>{
        res.render("home", { head: "Welcome" })
    });
    app.get("/kittens", (req, res)=>{
        db.Post.find({ category: "kitten" }, [], { sort: { date: -1 } } )
        .then((post)=>{
            res.render("home", {post :post, head: "Kittens" })
        })
        .catch((err)=>{
            res.render("home", {error: err})
        })

    })
    app.get("/puppies", (req, res) => {
        db.Post.find({ category: "puppy" }, [], {sort: {date: -1}})
        .then((post) => {
            res.render("home", { post: post , head: "Puppies" })
        })
            .catch((err) => {
                res.render("posts", { error: err })
            })

    })
    app.get ('/saved', (req, res) => {
        db.Post.find({ saved: true }, [], { sort: { date: -1 } })
        .then ((post) => {
        res.render ('home', {post: post, head: "Saved Posts"});
        }).catch ((err) => {
        res.render ('home', {error: err});
        })
});
app.get("/post/notes/:id", (req, res) =>{
    db.Post.findOne({ _id: req.params.id })
        .populate("notes")
        .then((post) => {
            res.render("post", {post: post})
        })
        .catch((err) => {
            res.json(err);
        })
})


}