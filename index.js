const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

async function run(){
    try{
        const servicesCollection = client.db('carDoctor').collection('services');
        const ordersCollection = client.db('carDoctor').collection('orders')
        app.get('/services',async(req,res) =>{
            const query= {}
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/services/:id', async (req,res) =>{
            const id = req.params.id;
            const query = {_id :ObjectId(id)}
            const service = await servicesCollection.findOne(query)
            res.send(service)
        })

        app.get('/orders', async (req,res) =>{
            let query = {};
            if(req.query.email){
                query = {
                    email : req.query.email
                }
            }
            const cursor = ordersCollection.find(query)
            const orders = await cursor.toArray()
            res.send(orders)
        })

        app.post('/orders', async(req,res) =>{
            const order= req.body;
            const result = await ordersCollection.insertOne(order)
            res.send(result);
        })

        app.patch('/orders/:id',async(req,res) =>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)}
            const status = req.body.sratus;
            const updateOrder = {
                $set : {
                    status: status
                }
            }
            const result = await ordersCollection.updateOne(query,updateOrder)
            res.send(result)
        })

        app.delete('/orders/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)}
            const result = await ordersCollection.deleteOne(query)
            res.send(result)
        })

       
    }
    finally{

    }

}

run().catch(e => console.log(e))


app.get('/',(req,res) =>{
    res.send('Server is running')
})

app.listen(port,()=>{
    console.log('Server is running on port',port)
})