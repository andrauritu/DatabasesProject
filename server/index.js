const mongoose = require('mongoose');
const Greenhouse = require('./models/greenhouse');


// Replace with your connection string
const uri = "mongodb+srv://andrauritu:Popcorn2408@project.fdk62hm.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("We're connected to the database!");
});

const newGreenhouse = new Greenhouse({
    _id: 6, // This is optional if you want to set a custom ID
    name: 'test Greenhouse'
});

newGreenhouse.save()
    .then(savedGreenhouse => {
        console.log('Greenhouse saved successfully:', savedGreenhouse);
    })
    .catch(err => {
        console.error('Error saving greenhouse:', err);
    });