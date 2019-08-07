const express = require('express');
const posts = express.Router();

const db = require('../../data/db');

posts.get('/', (req, res) => {
    db.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).send({ message: 'boo' })
        })
})

posts.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).send({ message: 'boo' })
        })
})

posts.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findPostComments(id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).send({ message: 'boo' })
        })
})

posts.post('/', (req, res) => {
    const post = req.body;
    db.insert(post)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).send({ message: 'boo' })
        })
})

posts.post('/:id/comments', (req, res) => {
    // could retrieve ID from URL and combine it with body to automate post_id key
    const comment = req.body;
    db.insertComment(comment)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).send({ message: 'boo' })
        })
})


posts.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            console.log("ERRRRR", error)
            res.status(500).send({ message: 'boo' })
        })
})








module.exports = posts;