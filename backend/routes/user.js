const express = require('express');
const router = express.Router();
const User = require('../model/user');

// create a new user
router.post('/new', (req, res) => {
  User.forge(req.body).save()
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

// get all users
router.get('/', (req, res) => {
  User.fetchAll()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// get a single user by id
router.get('/:id', (req, res) => {
  User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    })
    .catch(err => res.status(500).json(err));
});

// update a user by id
router.put('/update/:id', (req, res) => {
  User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        user.save(req.body)
          .then(user => res.json(user))
          .catch(err => res.status(500).json(err));
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete a user by id
router.delete('/delete/:id', (req, res) => {
  User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        user.destroy()
          .then(() => res.json({ message: 'User deleted' }))
          .catch(err => res.status(500).json(err));
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
