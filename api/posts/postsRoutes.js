const express = require('express');
const posts = express.Router();

const db = require('../../data/db');

posts.get('/', (req, res) => {
    db.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).send({ error: "The posts information could not be retrieved." })
        })
})

posts.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then((data) => {
            if (data.length ===0){
                res.status(404).send({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(data);
            }
        })
        .catch((error) => {
            res.status(500).send({ error: "The post information could not be retrieved." })
        })
})

posts.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findPostComments(id)
        .then((data) => {
            if (data.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(data);
            }
            
        })
        .catch((error) => {
            res.status(500).send({ error: "The comments information could not be retrieved." })
        })
})

posts.post('/', (req, res) => {
    const post = req.body;
    if (post.title && post.contents){
        db.insert(post)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((error) => {
            res.status(500).send({ message: 'boo' })
        })
    } else {
        res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
    }
    
})

posts.post('/:id/comments', (req, res) => {
    const text = req.body.text;
    const post_id = req.params.id;
    const comment = {
        "text": `${text}`,
        "post_id": `${post_id}`
    }
    db.findById(post_id)
        .then((post) => {
            if (post.length ===0){
                res.status(404).send({ message: "The post with the specified ID does not exist." })
            } else {
                if (text){
                    db.insertComment(comment)
                    .then((data) => {
                        res.status(201).json(data);
                    })
                    .catch((error) => {
                        res.status(500).send({ error: "There was an error while saving the comment to the database" })
                    })
                } else {
                    res.status(400).send({ errorMessage: "Please provide text for the comment." })
                }
            }
        })
        .catch((error) => {
            res.status(500).send({ error: "The post information could not be retrieved." })
        })
})


posts.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((post) => {
        if (post.length ===0){
            res.status(404).send({ message: "The post with the specified ID does not exist." })
        } else {
            db.remove(id)
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((error) => {
                    res.status(500).send({ error: "The post could not be removed" })
        })
        }
    })
    .catch((error) => {
        res.status(500).send({ error: "The post information could not be retrieved." })
    })
})


module.exports = posts;