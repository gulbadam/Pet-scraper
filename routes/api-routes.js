const db =require("../models");
const scrape = require ('../scripts/scrape.js');

module.exports = (app) => {
    //scrape kittens
    app.get('/api/kittens', (req, res)=>{
        let category = "kitten"
        scrape(category)
        .then((data)=>{
            if (data && data.length){
                console.log(data.length)
                db.Post.collection.insertMany(
                    data, 
                    {ordered: false}, (err, posts)=>{
                if (err) {
                    console.log ('err' + data.length);
                    console.log('err' + err.result.nInserted)
                    res.json({
                        scraped: data.length,
                        stored: err.result.nInserted
                        })
                    }
                    else{
                        console.log("Data"+data)
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
    //scrape puppies
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
    //render kittens category
    app.get("/api/category/kittens", (req, res)=>{
        db.Post.find({category: "kitten"})
        .then((dbKitten)=>{
            res.json(dbKitten)
        })
        .catch((err)=>{
            res.json(err)
        })
    })
    //render puppies category
    app.get("/api/category/puppies", (req, res) => {
        db.Post.find({ category: "puppy" })
            .then((dbKitten) => {
                res.json(dbKitten)
            })
            .catch((err) => {
                res.json(err)
            })
    })
    //save post
    app.put("/api/posts/save/:id", (req, res) => {
        db.Post.update({ _id: req.params.id }, { saved: true })
            .then((dbPost) => {
                res.json(dbPost)
            })
            .catch((err) => {
                res.json(err)
            })
    })
    //delete post and notes
    app.delete("/api/posts/delete/:id", (req, res)=>{
        db.Post.findByIdAndRemove({'_id': req.params.id}, (err, pst)=>{
            if(err) res.json(err);
            //for (let i = 0; i < pst.notes.length; i++) {
                //db.Note.remove({ _id: pst.notes[i] }).exec();
                
            //}
            res.json(pst);
        })
    })
//     app.get ("/api/posts/:id", (req, res)=>{
//         db.Post.findOne({ _id: req.params.id })
//             .then((dbPost) => { res.json(dbPost)})
//             .catch((err) => {
//                 res.json(err);
//     })
// })
//show post and notes
    app.get("/api/posts/notes/:id",(req, res)=>{
        db.Post.findOne({ _id: req.params.id})
        .populate("notes")
        .then((post)=>{
            
            res.render ('post', {post: post});

        })
            .catch( (err)=> {
                res.json(err);
    })
})
//add notes
    app.post("/api/posts/notes/:id", (req, res)=>{
        db.Note.create(req.body)
        .then((dbNote)=>{
            return db.Post.findByIdAndUpdate({_id: req.params.id}, {$push: {notes: dbNote._id}}, {new: true})
        })
        .then((dbNote)=>{
            db.Post.findOne({ _id: req.params.id })
            .populate("notes")
                .then((post) => {

                    res.render('post', { post: post });
        
        })
    })
            .catch((err) => {
                res.json(err);
    })
})
//delete note
app.delete("/api/note/delete/:n_id",(req, res)=>{
    let p_Id= req.body.p_id;
    let n_Id =req.params.n_id;
    db.Note.remove({_id: n_Id})
    .then((dbNote)=>{
        return db.Post.findOneAndUpdate({_id: p_Id}, {$pull: {notes: n_Id}})

    })
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        res.json(err)
    })

})
}
