const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
 // return res.send(JSON.stringify(books, null,4));
 const username = req.body.username;
 const password = req.body.password;
 // Check if both username and password are provided
 if (username && password) {
     // Check if the user does not already exist
     if (!isValid(username)) {
         // Add the new user to the users array
         users.push({"username": username, "password": password});
         return res.status(200).json({message: "User successfully registered. Now you can login"});
     } else {
         return res.status(404).json({message: "User already exists!"});
     }
 }
 // Return error if username or password is missing
 return res.status(404).json({message: "Unable to register user."});


});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return  res.send(JSON.stringify(books, null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

public_users.get('/list/:author', function(req, res){
    let filter_book = [];
    let author= req.params.author;
    //res.send("hello");
    console.log(author);
 for (i = 1; i<11; i++){
    filter_book = books[i];
      

 }
   console.log(books[2].author);


});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  

  const isbn = req.params.isbn;
 
  if (parseInt(isbn) >0 || parseInt(isbn) <11){
        return res.send(books[isbn]);
  }else {
      return res.status(300).json({message: "Not found"});
  }
      
 
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  let filtered_books = books;

   filtered_books.forEach(book => { 
    
   });

  
  //return res.send(filtered_books[1]);


  
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
