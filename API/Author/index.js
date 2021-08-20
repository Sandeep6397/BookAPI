// express Router

const Router = require("express").Router();

//initializing Authors model

const AuthorModel = require("../../database/author");


///////////////GET methord

/*
Route : /author
Description : Retrive all the authors 
Parameter : id
Mathod :GET
*/ 


Router.get("/:id", async (req,res) => {
    const authors = await AuthorModel.findOne({id : req.params.id})

    // const authors = database.authors.filter((auth) => auth.id == req.params.id);
    if(authors)
        return res.json({"Authors": authors });
    return res.json({"Error": `Author with id = ${req.params.id} does not exits`});
    
});

/*
Route : /author/b
Description : Retrive list all the authors based on a book isbn 
Parameter : isbn 
Mathod :GET
*/ 

Router.get("/b/:isbn", async(req,res) => {
    const specificAuthors = await AuthorModel.findOne({books:req.params.isbn});

    //  const specificAuthors = database.authors.filter((author) => author.books.includes(req.params.isbn));
     if(specificAuthors)
        return res.json({"Authors": specificAuthors });
    return res.json({"Error": `No author found for book ${req.params.id} `});
    
});

///////////POST

/*
Route : /author/new
Description : To add new author
Parameter : NONE 
Mathod :POST
*/ 

Router.post("author/new", async(req,res) =>{
    const newAuthor = req.body.newAuthor;     
    //const {newAuthor} = req.body;   //Destructing using ES6
    const addNewAuthor = await AuthorModel.create(newAuthor);
    //database.authors.push(addNewAuthor);

    return res.json({Authors: addNewAuthor, message:"Author was added"});
});


////////////////////DELETE

/*
Route : /author/delete
Description : To delete  a book from publication
Parameter : id
Mathod :PUT
*/

Router.delete("/delete/:id", (req,res) => {

    //Update authors database
    const newAuthors = database.authors.filter((auth) => auth.id != parseInt(req.params.id) );
    database.authors = newAuthors;

    //update Book database

    database.books.forEach((book) => {
        const newAuthors = book.authors.filter((auth) => auth != parseInt(req.params.id));
        book.authors = newAuthors;
        return ;
    });

    return res.json({authors: database.authors, books: database.books,message:"Successful"});

});

module.exports = Router;
