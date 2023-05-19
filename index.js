require('dotenv').config()
const express = require('express');
var mongo = require('mongodb');
const cors = require("cors");
var MongoClient = require('mongodb').MongoClient;
const app = express();
const router = express.Router();
const uri = process.env.MONGODB
const PORT = process.env.PORT
var bodyparser = require("body-parser");
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));
//const bcrypt = require("bcrypt")
app.use(router);
app.use(cors({
    origin : "*",
    credentials : false
}));
 


app.post('/CreateProject', async(req, res)=>{

    console.log(req.body)
   var data = req.body
    const client = new MongoClient(uri);
    var title = data.title;
    var icon = data.icon;
    var link = data.link;
    var description = data.description;
    var tech = data.stack;
    
    const newdata = {
        title : title,
        icon : icon,
        link : link,
        description : description,
        stack : tech,
    }

    try {
        const database = client.db("portfolio");
        const app_db = database.collection("projects");
        const result = await app_db.insertOne(newdata);
        console.log(`A document has ben inserted with the id : ${result.insertedId}`);
        
    } finally{

        await client.close();
        
    

        return res.send("Successfull");
}



}

);

app.get('/getProjects', async(req, res)=>{
        const client = new MongoClient(uri);
    try{
        const database = client.db("portfolio");
        const library_db = database.collection('projects');
        const result =  await library_db.find({}).toArray();
        res.send(result);
        
    }finally{
        await client.close();
    }
});

app.listen(8000, ()=> console.log('Running Server'));