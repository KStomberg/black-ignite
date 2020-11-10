const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    let queryString = `SELECT * FROM "submission" ORDER BY "id" DECS;`;
    pool.query(queryString)
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.error('/submissions GET failed', err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let queryString = `INSERT INTO "submission" ("category_id", "full_name", "email", "instagram", "linkedin", "twitter", "comments", "video_url")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryString, [req.body.category, req.body.fullName, req.body.email, req.body.instagram, req.body.linkedIn,
            req.body.twitter, req.body.comments, req.body.file])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.error('/submissions POST failed', err);
            res.sendStatus(500);
        });
});

module.exports = router;
