const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1mu84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('Genius car MongoDB server connected');
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('Running genius server')
})

app.listen(port, () => {
    console.log('listening to port');
})