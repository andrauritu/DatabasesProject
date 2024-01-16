// In your routes file (e.g., routes/api.js)
const express = require('express');
const router = express.Router();
const Visit = require('../models/visit'); // Make sure to replace with the actual path to your Visit model


router.get('/join-visits', async (req, res) => {
    try {
        const results = await Visit.aggregate([{
            $lookup: {
                from: "visitprices",
                localField: "_id",
                foreignField: "visitId",
                as: "pricingDetails"
            }
        },
        {
            $lookup: {
                from: "visittimes",
                localField: "_id",
                foreignField: "visitId",
                as: "timingDetails"
            }
        },
        {
            $unwind: {
                path: "$pricingDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: "$timingDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                greenhouseId: 1,
                date: 1,
                userId: 1,
                price: "$pricingDetails.price",
                duration: "$timingDetails.duration"
            }
        }
        ]);
        res.json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
