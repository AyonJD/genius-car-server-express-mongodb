const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');
require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1mu84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');
        //res hisabe data pathanor jonno api ta banano hoiche, res.send korar jonno
        app.get('/service', async (req, res) => {
            const query = {};
            //jodi 1 ta data k pate cai tobe findOne r multiple pate hole only find use korte hoy
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });

        //Single service API
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service)
        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Running genius server')
})

app.listen(port, () => {
    console.log('listening to port');
})