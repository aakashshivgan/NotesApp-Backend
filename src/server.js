
// import express 
const express = require('express');
const app = express();

// import MongoDb
const mongoose = require('mongoose');
const Note =require('./models/notes');

// import and use bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// connecting mongoDb to backend
mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://aakashshivgan:A%40kash1oo@cluster0.nuapyve.mongodb.net/notesdb").then(function(){

// this home
    app.get("/" , function (req ,res){
        const response ={message:"Api is working"};
        res.json(response);
    });
    //  fetch data from Mongodb for specific user with userId
    app.post("/notes/list/", async function(req ,res){
        var notes = await Note.find({userId:req.body.userId });
        res.json(notes);
    });

    //  fetch  all data from Mongodb 
    app.get("/notes/list", async function(res ,res){
        var note = await Note.find();
        res.json(note);
    });
//  write/create data in mongodb with body param like id userId title content
    app.post("/notes/add", async function(req ,res){
        //  res.json(req.body);

// update data of specific user
await Note.deleteOne({id :req.body.id});

        // note model used
        const newNote = new Note({
            id :req.body.id,
            userId:req.body.userId,
            title:req.body.title,
            content:req.body.content,
        
        });
        await newNote.save();
        const response ={message:"New note created  " + `id: ${req.body.id}`};
        res.json(response);
    });

    // delete a note in Mongodb using a id of note 

    app.post("/notes/delete", async function(req ,res){

        await Note.deleteOne({id :req.body.id});
        const response ={message:" note deleted  " + `id: ${req.body.id}`};
        res.json(response);

    });
});



// function to start the server
const port = process.env.PORT || 5000;
app.listen(port ,function(){
    console.log('server up at Localhost:5000' + $port);
});
