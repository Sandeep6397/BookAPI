//FrameWork
const express = require("express");

//importing Database
const database = require("./database/index");

// Initializing Express
const shapeAI = express();

// Configuration
shapeAI.use(express.json());

// To get all Books

/*
Route : /
Description : Retrive all book 
Parameter : NONE
Method : GET
*/ 
shapeAI.get("/", (req,res) => {
    return res.json({"Books": database.books});
});

// to Retrive Specific book 

/*
Route : /isbn
Description : Retrive Specific book 
Parameter : isbn
Mathod :GET
*/ 
shapeAI.get("/isbn/:isbn", (req,res) => {
    const specificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if(specificBook.length != 0)
        return res.json({"Books": specificBook});
    return res.json({"Error": `No book found for ISBN:${req.params.isbn}`});
      
}); 

/*
Route : /c
Description : Retrive Specific book based on category
Parameter : category
Mathod :GET
*/ 
shapeAI.get("/c/:category", (req,res) => {
    const specificBooks = database.books.filter((book) => book.category.includes(req.params.category));
    if(specificBooks.length != 0)
        return res.json({"Books": specificBooks});
    return res.json({"Error": `No book found for Category:${req.params.category}`});
      
}); 

/*
Route : /author
Description : Retrive all the authors 
Parameter : NONE
Mathod :GET
*/ 
shapeAI.get("/author", (req,res) => {
    return res.json({"Authors": database.authors});
});

/*
Route : /author
Description : Retrive all the authors 
Parameter : id
Mathod :GET
*/ 

shapeAI.get("/author/:id", (req,res) => {

    const authors = database.authors.filter((auth) => auth.id == req.params.id);
    if(authors.length == 0)
        return res.json({"Error": `Author with id = ${req.params.id} does not exits`});
    return res.json({"Authors": authors });
});

/*
Route : /author/b
Description : Retrive list all the authors based on a book isbn 
Parameter : isbn 
Mathod :GET
*/ 

shapeAI.get("/author/b/:isbn", (req,res) => {

     const specificAuthors = database.authors.filter((author) => author.books.includes(req.params.isbn));
     if(specificAuthors.length == 0)
        return res.json({"Error": `No author found for book ${req.params.id} `});
    return res.json({"Authors": specificAuthors });
});  

/*
Route : /publications
Description : Retrive  all Publications 
Parameter : NONE 
Mathod :GET
*/ 

shapeAI.get("/publications", (req,res)=>{
    return res.json({"Publications": database.publications});
})

/*
Route : /publications
Description : Retrive specific publications 
Parameter : id 
Mathod :GET
*/ 

shapeAI.get("/publications/b/:id", (req,res)=>{

    const specificPublication = database.publications.filter((pub) => pub.id == req.params.id);
    if(specificPublication.length == 0)
        return res.json({"Error": `Publication with id=${req.params.id} does not exits`});

    return res.json({"Publications": specificPublication[0]});

});

/*
Route : /publications/book
Description : Retrive list all the authors based on a book isbn 
Parameter : isbn 
Mathod :GET
*/ 

shapeAI.get("/publications/book/:isbn", (req,res) => {

    const specificPublication = database.publications.filter((pub) => pub.books.includes(req.params.isbn));
    if(specificPublication.length == 0)
       return res.json({"Error": `No author found for book ${req.params.isbn}`});
   return res.json({"Error": specificPublication});
});



/////                                POST

/*
Route : /book/new
Description : To add new book
Parameter : NONE 
Mathod :POST
*/ 

shapeAI.post("/book/new", (req,res) =>{
    const newBook = req.body.newBook;     
    //const {newBook} = req.body;   //Destructing using ES6

    database.books.push(newBook);

    return res.json({books: database.books, message:"Book was added"});
});

/*
Route : /author/new
Description : To add new author
Parameter : NONE 
Mathod :POST
*/ 

shapeAI.post("/author/new", (req,res) =>{
    const newAuthor = req.body.newAuthor;     
    //const {newAuthor} = req.body;   //Destructing using ES6

    database.authors.push(newAuthor);

    return res.json({Authors: database.authors, message:"Author was added"});
});

/*
Route : /publication/new
Description : To add new publication
Parameter : NONE 
Mathod :POST
*/ 


shapeAI.post(" ", (req,res) =>{
    const newPublication = req.body.newPublication;     
    //const {newAuthor} = req.body;   //Destructing using ES6

    database.publications.push(newPublication);

    return res.json({Publications: database.publications, message:"Publications was added"});
});

///////////////////////////////UPDATE

/*
Route : /book/update/
Description : To update title of book
Parameter : isbn 
Mathod :PUT
*/ 

shapeAI.put("/book/update/:isbn", (req,res) => {

    database.books.forEach((book) =>{
        if(book.ISBN == req.params.isbn)
        {
            book.title = req.body.newTitle;
            return;
        }
        return res.json({books:database.books});
    });
});

/*
Route : /book/author/update
Description : To update Author of book
Parameter : isbn 
Mathod :PUT
*/ 

shapeAI.put("/book/author/update/:isbn",  (req,res) => {
    //update book database

    database.books.forEach((book) =>{
        if(book.ISBN ==  req.params.isbn)
        {
            return book.authors.push(req.body.newAuthor);
        }
    });

    //update author database
    database.authors.forEach((auth) =>{

        if(auth.id === req.body.newAuthor)
        {
            return auth.books.push(req.params.isbn);
        }

    });
    return res.json({books:database.books, authors: database.authors , message : "New Author was added"});


});
shapeAI.listen(3000, () => console.log("Server is running"));