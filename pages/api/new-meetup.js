import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if(req.method === 'POST') {
        const data = req.body;
        // const { title, img, address, description } = data;

        try{
            const client = await MongoClient.connect('mongodb+srv://chirag6510:Chirag6510@cluster0.gkmogtq.mongodb.net/?retryWrites=true&w=majority');
        } catch (error) {
            console.log("Error Connecting db", error);
        }
        const db = client.db("meetings");

        const meetupsCollection = db.collection('meetups');
        try{
        const result = await meetupsCollection.insertOne(data);
        } catch (error) {
            console.log("Error inserting data", error);
        }

        client.close();

        res.status(201).json({message: "added meetup"});
    }
}

// var mongoose = require("mongoose");
// // mongoose.set('debug', true);
// mongoose.connect('mongodb+srv://chirag6510:Chirag6510@cluster1.8jqpn.mongodb.net/todolistdb?retryWrites=true&w=majority').then(() => {
//     console.log("Success");
// }).catch((err) => {console.log("Can't Connect DB")});


// const handler = (req, res) => {
//     if (req.method === 'POST') {
//         const data = req.body;

//         const { title, img, description,address } = data;
//     }
// }

export default handler;