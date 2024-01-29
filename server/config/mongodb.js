require("dotenv").config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connect() {
    try {
        // Send a ping to confirm a successful connection
        const database = client.db('xtwitter_db');
        db = database;
        return database
    } catch (error) {
        console.log(error);
    }
}

function connectDb() {
    return db;
}

module.exports = {
    connect,
    connectDb
}