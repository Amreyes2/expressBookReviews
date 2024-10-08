const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let authenticatedUser = require("./auth_users.js").authenticated;
const axios = require('axios').default;
const public_users = express.Router();


const connectToURL = (url) =>  {
    const req =  axios.get(url);
    console.log(req);
    req.then(resp => {
        console.log("Fulfilled");
        console.log(resp.data);
      req.finally();

       
    }    
    ) 
        .catch(err => {
            console.log("Rejected for url");
            console.log (err.toString());

        });


}

const getdata = () =>{
connectToURL("http://localhost:5000/");

}
public_users.post("/register2", (req,res) => {
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
public_users.post("/login", (req, res) => {
const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    getdata();
  //Write your code here
  return  res.send(JSON.stringify(books, null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
 
});


public_users.get('/list/:author', function(req, res){
    let filter_book = [];
    let author= req.params.author;
    //res.send("hello");
   // console.log(author);
   getdata();
   

let contador = 0;
 for (i = 1; i<11; i++){
  
      if (books[i].author === author) {

      console.log(books[i].author + " author correcto");
    filter_book[contador] = books[i];
    contador=contador+1;
    console.log(contador);
      }      

      
 }

   //console.log(books[2].author);
   //console.log(filter_book[2].author);


 return res.send(JSON.stringify(filter_book, null,4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  getdata();

  const isbn = req.params.isbn;
 
  if (parseInt(isbn) >0 || parseInt(isbn) <11){
        return res.send(books[isbn]);
  }else {
      return res.status(300).json({message: "Not found"});
  }
      
 
 });
  
// Get book details based on author
public_users.get('/author/',function (req, res) {
 let filter_book = [];
    let author= req.body.author;
    //res.send("hello");
   // console.log(author);
   getdata();
let contador = 0;
 for (i = 1; i<11; i++){
  
      if (books[i].author === author) {

   //   console.log(books[i].author + " author correcto");
    filter_book[contador] = books[i];
    contador=contador+1;
   // console.log(contador);
      }      

      
 }

   //console.log(books[2].author);
   //console.log(filter_book[2].author);


 return res.send(JSON.stringify(filter_book, null,4));
});

// Get all books based on title



public_users.get('/title/',function (req, res) {
   let filter_book = [];
    let title= req.body.title;
    //res.send("hello");
   // console.log(author);

let contador = 0;
 for (i = 1; i<11; i++){
  
      if (books[i].title === title) {

   //   console.log(books[i].author + " author correcto");
    filter_book[contador] = books[i];
    contador=contador+1;
   // console.log(contador);
      }      

      
 }

   //console.log(books[2].author);
   //console.log(filter_book[2].author);


 return res.send(JSON.stringify(filter_book, null,4));
});






//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  

  const isbn = req.params.isbn;
 
  if (parseInt(isbn) >0 || parseInt(isbn) <11){
        return res.send(books[isbn]);
  }else {
      return res.status(300).json({message: "Not found"});
  }
      
});

module.exports.general = public_users;
