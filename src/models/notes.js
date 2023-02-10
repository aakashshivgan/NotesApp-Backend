const mongoose = require('mongoose');


const noteSchema = mongoose.Schema({
    id:{
        type:String,
        unique :true,
        required : true
    },
    userId :{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    createdAt:{
        type:Date,
        defalut:Date.now
    }
});

module.exports = mongoose.model("note",noteSchema);