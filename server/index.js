const mongoose = require('mongoose');
const Greenhouse = require('./models/greenhouse');
const express = require('express');
const app = express();
const cors = require('cors');
const joinRoutes = require('./routes/joins'); // Replace with the actual path to your joins route file

app.use(cors());
app.use(express.json());


// Replace with your connection string
const uri = "mongodb+srv://andrauritu:Popcorn2408@project.fdk62hm.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("We're connected to the database!");
});
app.use('/api', joinRoutes); // This will prefix '/api' to your new route

app.use('/api/plants', require('./routes/plants'));
app.use('/api/ecosystems', require('./routes/ecosystems'));
app.use('/api/greenhouses', require('./routes/greenhouses'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/pesticides', require('./routes/pesticides'));
app.use('/api/photos', require('./routes/photos'));
app.use('/api/plantHarvests', require('./routes/plantHarvests'));
app.use('/api/plantLifeCycles', require('./routes/plantLifeCycles'));
app.use('/api/plantNutrientLevels', require('./routes/plantNutrientLevels'));
app.use('/api/soilTypes', require('./routes/soilTypes'));
app.use('/api/species', require('./routes/species'));
app.use('/api/terrains', require('./routes/terrains'));
app.use('/api/users', require('./routes/users'));
app.use('/api/visits', require('./routes/visits'));
app.use('/api/visitPrices', require('./routes/visitPrices'));
app.use('/api/visitTimes', require('./routes/visitTimes'));
app.use('/api/watering', require('./routes/watering'));
app.use('/api/weatherData', require('./routes/weatherData'));
app.use('/api/workers', require('./routes/workers'));
app.use('/api/workSchedules', require('./routes/workSchedules'));





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));