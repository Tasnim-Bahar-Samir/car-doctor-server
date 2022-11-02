const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { json } = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

require("dotenv").config();

console.log(process.env.db_user)



const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.skbfv9j.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("db connected")
  client.close();
});



app.get('/',(req,res) =>{
    res.send('Server is running')
})

app.listen(port,()=>{
    console.log('Server is running on port',port)
})