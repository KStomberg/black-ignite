const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(`in our talks router.get`);
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


module.exports = router;