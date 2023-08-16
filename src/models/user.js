const mongoose = require('mongoose');

const user = new mongoose.Schema({
    title :{
        type : String,
        required : true,
    },
    artist :{
        type : String,
        required : true,
    },
    song :{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('user',user)