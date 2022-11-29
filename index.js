const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


const app = express();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x6hwmbl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

    try{
        const catagoriesCollection = client.db('MobileWorld').collection('catagories');

        app.get('/catagories',async(req, res) =>{
            const query = {};
            const options = await catagoriesCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally{

    }

}
run().catch(console.log);


app.get('/', async(req, res) =>{
    res.send('Mobile world server is working')
})

app.listen(port, () => console.log(`Mobile world running on ${port}`));