const mongoose = require('mongoose');

const workScheduleSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    date: {
        type: Date,
        required: true
    },
    workHours: {
        type: Number,
        required: true
    },
    workerId: {
        type: Number,
        ref: 'Worker', // Reference to the Worker model
        required: true
    }
});

const WorkSchedule = mongoose.model('WorkSchedule', workScheduleSchema);

module.exports = WorkSchedule;
