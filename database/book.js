const mongoose = require("mongoose");

//creating a schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pub_Date: String,
    noOfPage: Number,
    category: [String],
    publication:  Number,
});


//Create  a book model->(model-> documnet model of MONGOBD)

const BookModel =  mongoose.model("books",BookSchema);

module.exports=BookModel;