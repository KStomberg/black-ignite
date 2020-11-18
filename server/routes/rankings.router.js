const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    queryText = 
    `SELECT * FROM "submission" ORDER BY "likes" DESC;`;
    pool.query(queryText)
    .then(response => {
        res.send(response.rows);
    }).catch(err => {
        console.log(`got an error in submission GET`, err);
        res.sendStatus(500);
    })
});
router.post('/', rejectUnauthenticated, (req, res) => {
    let queryText;
    console.log(`in our rankings router.get`, req.body);
    if (req.body === undefined){
        queryText = 
        `SELECT * FROM "submission" ORDER BY "likes" DESC;`;
        pool.query(queryText)
        .then(response => {
            res.send(response.rows);
        }).catch(err => {
            console.log(`got an error in submission GET`, err);
            res.sendStatus(500);
        })
    }
    else{
        queryText = 
        `SELECT * FROM "submission" WHERE "category_id" = $1 ORDER BY "likes" DESC;`;
        pool.query(queryText, [req.body.talkId])
        .then(response => {
            res.send(response.rows);
        }).catch(err => {
            console.log(`got an error in submission GET`, err);
            res.sendStatus(500);
        })
    }
});

module.exports = router;