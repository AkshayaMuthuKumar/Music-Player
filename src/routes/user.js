const express = require ('express');

const usermodel = require('../models/user.js')

const router = express.Router()

router.post('/postsongs', async (req,res) =>{
    const reqdata = req.body;
    console.log("reqbody",req.body);

    let userdata = new usermodel({
        title : reqdata.title,
        artist : reqdata.artist,
        song : reqdata.song

    })
    try {
        let finaluserdata = await userdata.save()
        res.status(200).json({"status":200, "data":finaluserdata, "message":"Song added successfully","error": false})
    }
    catch(error){
        res.status(400).json({"status":400, "message":error.message,"error": true})
    }
})

  // GET request to fetch all users
  router.get('/getsongs', async (req, res) => {
    try {
      // Fetch all users from the database
      let getuserdata = await usermodel.find();
      var userdata = {
        "finaldata" : getuserdata
      }
      // Send the users as the response
      res.status(200).json({"status":200, "data":userdata, "message":"User fetch successfully","error": false})
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message, error: true });
    }
  });

module.exports = router;