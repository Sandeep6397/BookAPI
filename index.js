require("dotenv").config(); // To secure our password
//FrameWork
const express = require("express");
const mongoose = require("mongoose"); 

//importing Database
const database = require("./database/index");

// Model
const BookModel = require("./database/book"); 
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication"); 

//Micro service Routes 
const Books = require("./API/Book");

const Authors = require("./API/Author");

const Publications = require("./API/Publication");

// Initializing Express
const Router = express();

// Configuration
Router.use(express.json());
 
//Establish database connection
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
).then(() => console.log("Mongoose Connection Successfull")); 

 // Initializing Micro services
 Router.use("/book", Books);

 Router.use("/author", Authors);

 Router.use("./publication", Publications);




Router.listen(3000, () => console.log("Server is running"));