const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    pid:{
        type: String,
        required: true,
        //trim: true,
        unique: true
    },
    title : {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        //trim: true
    },
    city: {
        type: String,
        

    },
    category: {
        type: String,
        required: true,
        //trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{
    type: Schema.Types.ObjectId,
   ref: 'Note',
    },
   ]

})
const Post = mongoose.model ('Post', PostSchema);

module.exports = Post;
