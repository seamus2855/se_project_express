const clothingItems = [
    { id: 1, name: 'T-Shirt', category: 'tops', price: 19.99 },
    { id: 2, name: 'Jeans', category: 'bottoms', price: 49.99 },
    { id: 3, name: 'Jacket', category: 'outerwear', price: 79.99 }
];

exports.getAllClothingItems = (req, res) => {
    res.json(clothingItems);
};

exports.getClothingItemById = (req, res) => {
    const item = clothingItems.find(item => item.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
};

exports.createClothingItem = (req, res) => {
    const newItem = {
        id: clothingItems.length + 1,
        ...req.body
    };
    clothingItems.push(newItem);
    res.status(201).json(newItem);
};