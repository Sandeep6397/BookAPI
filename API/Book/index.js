
//  Initialize express router
const Router = require("express").Router();

const { Error } = require("mongoose");
//database Modal
const BookModel = require("../../database/book");


// To get all Books

/*
Route : /
Description : Retrive all book 
Parameter : NONE
Method : GET
*/ 
Router.get("/", async(req,res) => {
    const getAllBook =await BookModel.find()
    return res.json({"Books": getAllBook});
});

// to Retrive Specific book 

/*
Route : /isbn
Description : Retrive Specific book 
Parameter : isbn
Mathod :GET
*/ 
Router.get("/isbn/:isbn", async(req,res) => {

    const specificBook = await BookModel.findOne({ISBN:req.params.isbn})
    // const specificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if(specificBook)
        return res.json({"Books": specificBook});
    return res.json({"Error": `No book found for ISBN:${req.params.isbn}`});
      
}); 


////////////////////POST

/*
Route : /book/new
Description : To add new book
Parameter : NONE 
Mathod :POST
*/ 

Router.post("/new", async(req,res) =>{
    try {
        const {newBook} = await req.body;
        // const newBook = req.body.newBook;     
        //const {newBook} = req.body;   //Destructing using ES6
        const addNewBook = await BookModel.create(newBook);
            
    } catch (error) {
        
        return res.json({error:error});
    }

    // database.books.push(addnewBook);


    return res.json({books:addNewBook, message:"Book was added"});
});
 ///////////UPDATE

 /*
Route : /book/author/update
Description : To update Author of book
Parameter : isbn 
Mathod :PUT
*/ 

Router.put("/author/update/:isbn", async(req,res) => {
    // //update book database

    // database.books.forEach((book) =>{
    //     if(book.ISBN ==  req.params.isbn)
    //     {
    //         return book.authors.push(req.body.newAuthor);
    //     }
    // });

    // //update author database
    // database.authors.forEach((auth) =>{

    //     if(auth.id === req.body.newAuthor)
    //     {
    //         return auth.books.push(req.params.isbn);
    //     }

    // });
    // return res.json({books:database.books, authors: database.authors , message : "New Author was added"});


    const updateBookAuthor = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            $addToSet :{
                authors:req.body.newAuthor,
            }
        },
        {
            new:true,
        }
    )
    const updateAuthor = await AuthorModel.findOneAndUpdate(
        {
            id:req.body.newAuthor,

        },
        {
            $push:{
                books: req.params.isbn,
            },
            
        },
        {
            new:true,
        }
    )
    return res.json({books: updateBookAuthor, authors: updateAuthor , message : "New Author was added"});
});


//???????????????????????DELETE

/*
Route : /book/delete
Description : To delete a book 
Parameter : isbn 
Mathod :PUT
*/

Router.delete("/delete", async(req,res) =>{

    //const dbooks = database.books.filter((book) => book.ISBN != req.params.isbn ); ///using parameter from url
    // const dbooks = database.books.filter((book) => book.ISBN != req.body.isbn ); ///using body
    const dbooks = await BookModel.findOneAndDelete ({ISBN: req.body.isbn});
    // database.books = dbooks;
    return res.json({ books: dbooks, message: "Deleted succuessfully"});

});


////////////////////Delete
/* 
Route : /book/delete/author
Description : To delete a author from a book 
Parameter : isbn, authorid
Mathod :PUT
*/

Router.delete("/delete/author/:isbn/:authorid", async(req,res) =>{
    //update book database 
    // database.books.forEach((book) => {
    //     if(book.ISBN == req.params.isbn)
    //     {
    //         const newAuthorList = book.authors.filter((auth) => auth != parseInt(req.params.authorid)); 
    //         book.authors = newAuthorList;

    //         return ;
    //     };
        
    // });

    //???????????????????? Using Mongo
    //update book database            /////wrong
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.authorid
        },
        {
            $pull:{
                authors:parseInt(req.params.authorid),
            }
        },
        {
            new:true,
        }

    );


    //update author database
    // database.authors.forEach((author) => {
    //     if(author.id == parseInt(req.params.authorid))
    //     {
    //         const newBookList = author.books.filter((book) => book.ISBN  != req.params.isbn);
    //         author.books = newBookList;
    //          return
    //     };
    //     ;
    // });

    //????????????? Using Mongo

    //update author database
    const updateAuthor = await AuthorModel.findOneAndUpdate(
        {
            id:parseInt(req.params.authorid),
        },
        {
            books: req.params.isbn,
        },
        {
            new:true,
        }
    );
    return res.json({ books: updateBook, authors: updateAuthor, message: "Deleted succuessfully"});
});


module.exports = Router;