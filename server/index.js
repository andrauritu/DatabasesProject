const mongoose = require('mongoose');
const Greenhouse = require('./models/greenhouse');
const express = require('express');
const app = express();
app.use(express.json());


// Replace with your connection string
const uri = "mongodb+srv://andrauritu:Popcorn2408@project.fdk62hm.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("We're connected to the database!");
});

app.use('/api/plants', require('./routes/plants'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));