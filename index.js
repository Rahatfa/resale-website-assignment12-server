const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 5000;


const app = express();


app.use(cors());
app.use(express.json());

app.get('/', async(req, res) =>{
    res.send('Mobile world server is working')
})

app.listen(port, () => console.log(`Mobile world running on ${port}`));