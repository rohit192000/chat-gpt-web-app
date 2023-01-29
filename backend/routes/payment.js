// const express = require('express');
// const router = express.Router();
// const knex = require('knex');
// const bookshelf = require('bookshelf')(knex);

// // Import payment model
// const Payment = require('../models/Payment');

// // Create a route for retrieving all payments
// router.get('/payments', (req, res) => {
//     Payment.fetchAll()
//         .then(payments => {
//             res.json(payments);
//         })
//         .catch(err => {
//             res.status(500).json({error: err.message});
//         });
// });

// // Create a route for retrieving a single payment by id
// router.get('/payments/:id', (req, res) => {
//     Payment.where({id: req.params.id}).fetch()
//         .then(payment => {
//             if(!payment) {
//                 res.status(404).json({error: 'Payment not found'});
//             } else {
//                 res.json(payment);
//             }
//         })
//         .catch(err => {
//             res.status(500).json({error: err.message});
//         });
// });

// // Create routes for creating, updating and deleting payments
// router.post('/payments', (req, res) => { ... });
// router.put('/payments/:id', (req, res) => { ... });
// router.delete('/payments/:id', (req, res) => { ... });

// module.exports = router;
