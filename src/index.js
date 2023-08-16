const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');

const userroute = require('./routes/user.js')

const mongoString = "mongodb://0.0.0.0:27017/sample"

mongoose.connect(mongoString)

let database = mongoose.connection;
database.on('error',(error)=>{
    console.log(error);
})

database.once('connected', () =>{
    console.log("Database Connected");
})


const app = express()
app.use(cors());

app.use(express.json());

app.use('/songs', express.static('songs'));

app.use('/', userroute);


app.use((req,res,next) => {
    res.status (404).send({"status":404,"message":"Api url not found","error":true})
})

app.listen(5000,()=>{
    console.log(`server started at ${5000}`)
})