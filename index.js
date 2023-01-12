const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
        const singleCatagory = require('./singleCatagory.json');

        app.post('/jwt', (req, res)=>{
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '8d'})
            res.send({token})
        })

        // app.get('/all-catagories', (req,res)=>{
        //     res.send(catagories)
        // })

        app.get('/catagories',async(req, res) =>{
            const query = {};
            const options = await catagoriesCollection.find(query).toArray();
            res.send(options);
        });

        // app.get('/catagories/:id', (req, res) => {
        //     const id = req.params.id;
        //     const selectedCatagories = catagoriesCollection.find(c => c._id.products === id);
        //     res.send(selectedCatagories);
        // });
        
        // app.get('/singleCatagory/:name', (req, res) => {
        //     const name = req.params.name;
        //     const selectedCatagory = singleCatagory.filter(s => s.brand === name);
        //     res.send(selectedCatagory)
        //     // console.log(req.params.name);
        // })

        app.get('/catagories/:name', (req, res) => {
            const name = req.params.name;
            const selectedCatagory = singleCatagory.filter(s => s.name === name);
            res.send(selectedCatagory)
            // console.log(req.params.name);
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