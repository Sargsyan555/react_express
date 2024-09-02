//  import express from 'express';
//  const app = express();
//  app.use(express.static("./client/build"))
//  app.get("/data", (req, res) => {
//     res.send({
//         fn: "b"
//     })
//  })
//  app.listen(process.env.PORT || 3003);
const express = require('express');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const path = require('path');

const app = express();
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'productdb';
const upload = multer({ dest: 'public/uploads/' }); // Save images to the 'public/uploads' folder

app.use(express.static('public'));

// Connect to MongoDB
async function connectToMongo() {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
}

let db;
connectToMongo().then(database => {
    db = database;

    // API Routes
    app.get('/api/products', async (req, res) => {
        try {
            const products = await db.collection('products').find().toArray();
            res.json(products);
        } catch (error) {
                ires.status(500).json({ error: 'Failed to fetch products' });
        }
    });

    app.post('/api/products', upload.single('image'), async (req, res) => {
        try {
            const { name, price, description } = req.body;
            const imageUrl = `/uploads/${req.file.filename}`; // Get image path relative to the public directory

            const result = await db.collection('products').insertOne({ name, price, description, imageUrl });
            res.json(result.ops[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add product' });
        }
    });

    app.listen(3019, () => {
        console.log('Server is running on http://localhost:3019');
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
});