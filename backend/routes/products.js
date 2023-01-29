const express = require('express');
const router = express.Router();

const Product = require('../model/products');

// Get all products
router.get('/', (req, res) => {
  Product.fetchAll()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// Get a single product by id
router.get('/:id', (req, res) => {
  Product.where({ id: req.params.id }).fetch()
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.json(product);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// Create a new product
router.post('/new-product', (req, res) => {
  Product.forge({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }).save()
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// Update an existing product
router.put('/update/:id', (req, res) => {
  Product.where({ id: req.params.id }).fetch()
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        product.save({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
        })
          .then(product => {
            res.json(product);
          })
          .catch(err => {
            res.status(500).json({ message: err.message });
          });
      }
    });
});

// Delete an existing product
router.delete('/delete/:id', (req, res) => {
  Product.where({ id: req.params.id }).fetch()
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        product.destroy()
          .then(() => {
            res.json({ message: 'Product deleted' });
          })
          .catch(err => {
            res.status(500).json({ message: err.message });
          });
      }
    });
});

// You can also create similar routes for User, Order and Payment 

module.exports = router;