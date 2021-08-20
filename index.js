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


// Initializing Express
const shapeAI = express();

// Configuration
shapeAI.use(express.json());
 
//Establish database connection
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
).then(() => console.log("Mongoose Connection Successfull")); 

// To get all Books

/*
Route : /
Description : Retrive all book 
Parameter : NONE
Method : GET
*/ 
shapeAI.get("/", async(req,res) => {
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
shapeAI.get("/isbn/:isbn", async(req,res) => {

    const specificBook = await BookModel.findOne({ISBN:req.params.isbn})
    // const specificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if(specificBook)
        return res.json({"Books": specificBook});
    return res.json({"Error": `No book found for ISBN:${req.params.isbn}`});
      
}); 

/*
Route : /c
Description : Retrive Specific book based on category
Parameter : category
Mathod :GET
*/ 
shapeAI.get("/c/:category", async(req,res) => {
    const specificBooks = await BookModel.findOne({category:req.params.category});
    // const specificBooks = database.books.filter((book) => book.category.includes(req.params.category));
    if(specificBooks)
        return res.json({"Books": specificBooks});
    return res.json({"Error": `No book found for Category:${req.params.category}`});
      
}); 

/*
Route : /author
Description : Retrive all the authors 
Parameter : NONE
Mathod :GET
*/ 
shapeAI.get("/author", async(req,res) => {
    const allAuthors = await AuthorModel.find();
    return res.json({"Authors": allAuthors});
});

/*
Route : /author
Description : Retrive all the authors 
Parameter : id
Mathod :GET
*/ 

shapeAI.get("/author/:id", async (req,res) => {
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

shapeAI.get("/author/b/:isbn", async(req,res) => {
    const specificAuthors = await AuthorModel.findOne({books:req.params.isbn});

    //  const specificAuthors = database.authors.filter((author) => author.books.includes(req.params.isbn));
     if(specificAuthors)
        return res.json({"Authors": specificAuthors });
    return res.json({"Error": `No author found for book ${req.params.id} `});
    
});  

/*
Route : /publications
Description : Retrive  all Publications 
Parameter : NONE 
Mathod :GET
*/ 

shapeAI.get("/publications", async(req,res)=>{
    const allPublications = await PublicationModel.find();
    return res.json({"Publications":allPublications});
})

/*
Route : /publications
Description : Retrive specific publications 
Parameter : id 
Mathod :GET
*/ 

shapeAI.get("/publications/b/:id", async(req,res)=>{

    const specificPublication  = await PublicationModel.findOne({id: req.params.id });
    // const specificPublication = database.publications.filter((pub) => pub.id == req.params.id);
    if(specificPublication)
        return res.json({"Publications": specificPublication});
    return res.json({"Error": `Publication with id=${req.params.id} does not exits`});

});

/*
Route : /publications/book
Description : Retrive list all the authors based on a book isbn 
Parameter : isbn 
Mathod :GET
*/ 
/////////////////Not working
shapeAI.get("/publications/book/:isbn", async(req,res) => {

    const specificPublication = await PublicationModel.find({books:req.params.isbn})
    // const specificPublication = database.publications.filter((pub) => pub.books.includes(req.params.isbn));
    if(specificPublication)
        return res.json({"Publications": specificPublication});
    return res.json({"Error": `No author found for book ${req.params.isbn}`});
   
});



/////                                POST

/*
Route : /book/new
Description : To add new book
Parameter : NONE 
Mathod :POST
*/ 

shapeAI.post("/book/new", async(req,res) =>{
    const {newBook} = await req.body;
    // const newBook = req.body.newBook;     
    //const {newBook} = req.body;   //Destructing using ES6
    const addNewBook = await BookModel.create(newBook);

    // database.books.push(addnewBook);


    return res.json({books:addNewBook, message:"Book was added"});
});

/*
Route : /author/new
Description : To add new author
Parameter : NONE 
Mathod :POST
*/ 

shapeAI.post("/author/new", async(req,res) =>{
    const newAuthor = req.body.newAuthor;     
    //const {newAuthor} = req.body;   //Destructing using ES6
    const addNewAuthor = await AuthorModel.create(newAuthor);
    //database.authors.push(addNewAuthor);

    return res.json({Authors: addNewAuthor, message:"Author was added"});
});

/*
Route : /publication/new
Description : To add new publication
Parameter : NONE 
Mathod :POST
*/ 


shapeAI.post("/publication/new", async(req,res) =>{
    const newPublication = req.body.newPublication;     
    //const {newAuthor} = req.body;   //Destructing using ES6

    const addNewPublication = await PublicationModel.create(newPublication);

    //database.publications.push(newPublication);

    return res.json({Publications: addNewPublication, message:"Publications was added"});
});

///////////////////////////////UPDATE

/*
Route : /book/updated/
Description : To update title of book
Parameter : isbn 
Mathod :PUT
*/ 

shapeAI.put("/book/updated/:isbn", async(req,res) => {

    // database.books.forEach((book) =>{
    //     if(book.ISBN == req.params.isbn)
    //     {
    //         book.title = req.body.newTitle;
    //         return;
    //     }
    //     return res.json({books:database.books});
    // });

    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            title: req.body.Title,
        },
        {
            new:true, // to get updated data
        });

    return res.json({books:updateBook});
});

/*
Route : /book/author/update
Description : To update Author of book
Parameter : isbn 
Mathod :PUT
*/ 

shapeAI.put("/book/author/update/:isbn", async(req,res) => {
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

/*
Route : /publication/update/book
Description : To update or add new book publications
Parameter : isbn 
Mathod :PUT
*/

shapeAI.put("/publication/update/book/:isbn", (req,res) =>{
     // update the publication database

     database.publications.forEach((publication) =>{
        if(publication.id == req.body.pubID)
        {
           return publication.books.push(req.params.isbn);
        }
     });

     // update the  book database
     database.books.forEach((book) => {
        if(book.ISBN == req.params.isbn)
        {
            book.publication = req.body.pubID;
            return;
        }
     });
     return res.json({books:database.books, publications: database.publications , message : "Suucessfully updated publication"});
});


/////////////////////DELETE

/*
Route : /book/delete
Description : To delete a book 
Parameter : isbn 
Mathod :PUT
*/

shapeAI.delete("/book/delete", async(req,res) =>{

    //const dbooks = database.books.filter((book) => book.ISBN != req.params.isbn ); ///using parameter from url
    // const dbooks = database.books.filter((book) => book.ISBN != req.body.isbn ); ///using body
    const dbooks = await BookModel.findOneAndDelete ({ISBN: req.body.isbn});
    // database.books = dbooks;
    return res.json({ books: dbooks, message: "Deleted succuessfully"});

});

/* 
Route : /book/delete/author
Description : To delete a author from a book 
Parameter : isbn, authorid
Mathod :PUT
*/

shapeAI.delete("/book/delete/author/:isbn/:authorid", async(req,res) =>{
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


/*
Route : /author/delete
Description : To delete  a book from publication
Parameter : id
Mathod :PUT
*/

shapeAI.delete("/author/delete/:id", (req,res) => {

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



/*
Route : /publication/delete/book
Description : To delete  a book from publication
Parameter : isbn,pubID
Mathod :PUT
*/

shapeAI.delete("/publication/delete/book/:isbn/:pubID", (req,res) => {
    //update publication database
    database.publications.forEach((publication) =>{
        if(publication.id == parseInt(req.params.pubID));
        {
            const newBooks = publication.books.filter((book) => book != req.params.isbn);
            publication.books = newBooks;
            return;
        }
    });

    //update book database
    database.books.forEach((book) => {
        if(book.ISBN != req.params.isbn)
        {
            book.publication = 0; // No publication avalilble
        }
    });
    return res.json({publications:database.publications, Books: database.books ,message:"Successful"}); 

});


shapeAI.listen(3000, () => console.log("Server is running"));