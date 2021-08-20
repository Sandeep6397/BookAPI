//  Initialize express router
const Router = require("express").Router();

//database Modal
const BookModel = require("../../database/publication");

/*
Route : /publications
Description : Retrive  all Publications 
Parameter : NONE 
Mathod :GET
*/ 

Router.get("/", async(req,res)=>{
    const allPublications = await PublicationModel.find();
    return res.json({"Publications":allPublications});
})

/*
Route : /publications
Description : Retrive specific publications 
Parameter : id 
Mathod :GET
*/ 

Router.get("/b/:id", async(req,res)=>{

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
Router.get("/book/:isbn", async(req,res) => {

    const specificPublication = await PublicationModel.find({books:req.params.isbn})
    // const specificPublication = database.publications.filter((pub) => pub.books.includes(req.params.isbn));
    if(specificPublication)
        return res.json({"Publications": specificPublication});
    return res.json({"Error": `No author found for book ${req.params.isbn}`});
   
});



/////                                POST


/*
Route : /publication/new
Description : To add new publication
Parameter : NONE 
Mathod :POST
*/ 


Router.post("/new", async(req,res) =>{
    const newPublication = req.body.newPublication;     
    //const {newAuthor} = req.body;   //Destructing using ES6

    const addNewPublication = await PublicationModel.create(newPublication);

    //database.publications.push(newPublication);

    return res.json({Publications: addNewPublication, message:"Publications was added"});
});

///////////////////////////////UPDATE

/*
Route : /publication/update/book
Description : To update or add new book publications
Parameter : isbn 
Mathod :PUT
*/

Router.put("/update/book/:isbn", (req,res) =>{
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
Route : /publication/delete/book
Description : To delete  a book from publication
Parameter : isbn,pubID
Mathod :PUT
*/

Router.delete("/delete/book/:isbn/:pubID", (req,res) => {
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

module.exports = Router;