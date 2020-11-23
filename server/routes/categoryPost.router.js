const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//post into category table from /edittalk view with new talk
router.post('/', rejectUnauthenticated, (req, res) => {
    
    queryText = `INSERT INTO "category" ("title", "description_url", "image_url") VALUES($1, $2, $3);`;
    pool.query(queryText, [req.body.title, req.body.description, req.body.poster])
    .then(response => {
        res.send(response.rows);
    }).catch(err => {
        console.log(`got an error in category GET`, err);
        res.sendStatus(500);
    })
});

module.exports = router;