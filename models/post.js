const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Post Schema
let postSchema = new mongoose.Schema({
    title:   {type: String, default: ""},
    content: {type: String, default: ""},
    publishDate: {type: Date, default: Date.now},
    views: {type: Number, default: 0},
    // Array of sub-documents
    comments: [{
        commenter: String, // this allow the field to be missing
        content: {type: String, default: ""}
    }],
    // Store an id (ObjectId) of a "User" model
    author: {type: Schema.Types.ObjectId, ref: "User"}
    // _id by default is instered
})

module.exports = mongoose.model("Post", postSchema)