const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// get all talks from category table where DELETED is false
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(`in our talks router.get`, req.body);
    queryText = `SELECT * FROM "category" 
    WHERE "is_deleted" = FALSE ORDER BY "id" DESC;`;
    pool.query(queryText)
    .then(response => {
        res.send(response.rows);
    }).catch(err => {
        console.log(`got an error in category GET`, err);
        res.sendStatus(500);
    })
});
//grab all talks for speakers who do NOT login to the application
//displays all talks at /user
router.get('/unauthenticated', (req, res) => {
    console.log(`in our talks router.get`);
    queryText = `SELECT * FROM "category" 
    WHERE "is_deleted" = FALSE;`;
    pool.query(queryText)
    .then(response => {
        res.send(response.rows);
    }).catch(err => {
        console.log(`got an error in category GET`, err);
        res.sendStatus(500);
    })
});

router.get('/unauthenticated/:id', (req, res) => {
    console.log(`in our talks router.get`, req.params.id);
    queryText = `SELECT * FROM "category" 
    WHERE "is_deleted" = FALSE AND "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response.rows[0]);
    }).catch(err => {
        console.log(`got an error in category GET`, err);
        res.sendStatus(500);
    })
});

//grabbing specific talk from category table
router.get('/:id', (req, res) => {
    console.log(`in our talks router.get`, req.params.id);
    queryText = `SELECT * FROM "category" 
    WHERE "is_deleted" = FALSE AND "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response.rows);
    }).catch(err => {
        console.log(`got an error in submission GET`, err);
        res.sendStatus(500);
    })
});
//update a talk with the correct information from /edittalk view
router.put('/edit', rejectUnauthenticated, (req, res) => {
    console.log(`in our talks router.get`, req.body);
    queryText = `UPDATE "category" SET "title" = $1, "description_url" = $2, "image_url" = $3
    WHERE "id" = $4;`;
    pool.query(queryText, [req.body.title, req.body.description, req.body.poster, req.body.id])
    .then(response => {
        res.send(response.rows);
    }).catch(err => {
        console.log(`got an error in category GET`, err);
        res.sendStatus(500);
    })
});


module.exports = router;