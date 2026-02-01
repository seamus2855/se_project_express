const clothingItems = require('../models/clothingItemsModel');

// Example function to get all clothing items
const getAllClothingItems = (req, res) => {
    clothingItems.find({}, (err, items) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving items' });
        }
        res.status(200).json(items);
    });
};

module.exports = {
    getAllClothingItems,
};