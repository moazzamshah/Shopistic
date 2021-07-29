const Item = require('../models/Item');
const User = require('../models/User');

// get all the products
exports.allProducts = (req, res) => {
    Item.find()
        .populate('seller', '_id name')
        .sort({ date: -1 })
        .then((items) => res.json(items))
        .catch((err) => res.status(404).json({ noItemsFound: 'No items found' }));
}


// get a single product
exports.singleProduct = (req, res) => {
    Item.findById(req.params.item_id)
        .then((item) => res.json(item))
        .catch((err) =>
            res.status(404).json({ noItemsFound: 'No item found with that ID' })
        );
}

// get items of a specific user
exports.myProducts = (req, res) => {
    Item.find({ seller: req.params.userId }, (err, items) => {
        if (err) throw err;
        res.json(items);
    });
}

// update the products
exports.updateProduct = (req, res) => {
    Item.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                picture: req.body.picture,
            },
        }
    ).then((item) => {
        if (item) {
            User.findById(item.seller).then((user) => {
                if (user) {
                    const filter = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    };
                    res.json({ item, user: filter });
                }
            });
        }
    });
}

// Deleting the product by the User
exports.deleteProduct = (req, res) => {
    Item.findByIdAndRemove(req.params.item_id, (err) => {
        if (err) res.send(err);
        else
            res.json({
                message: 'the product has been deleted',
            });
    });
}