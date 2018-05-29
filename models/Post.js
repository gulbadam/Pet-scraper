const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    pid:{
        type: String,
        required: true,
        trim: true,
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
        trim: true
    },
    city: {
        type: String,
        trim: true

    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    posted_date: {
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
var Post = mongoose.model ('Post', PostSchema);

module.exports = Post;
