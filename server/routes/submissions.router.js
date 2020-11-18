const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    let queryString = `SELECT * FROM "submission" ORDER BY "id" DESC;`;
    pool.query(queryString)
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.error('/submissions GET failed', err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let queryString = `INSERT INTO "submission" ("category_id", "full_name", "email", "instagram", "linkedin", "twitter", "comments", "time_stamp", "video_url")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    pool.query(queryString, [req.body.category, req.body.fullName, req.body.email, req.body.instagram, req.body.linkedIn,
            req.body.twitter, req.body.comments, req.body.date, req.body.fileUrl])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.error('/submissions POST failed', err);
            res.sendStatus(500);
        });
});

router.get('/:id', (req, res) => {
    let queryString = `SELECT * FROM "submission" WHERE "id" = $1;`;
    pool.query(queryString, [req.params.id])
        .then(results => {
            res.send(results.rows);
        }).catch(err => {
            console.error('/submissions GET/:id failed', err);
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    console.log('hit update submission put', req.params);
    let queryString = `UPDATE "submission" SET "form_status" = true WHERE "id" = $1;`;
    pool.query(queryString, [req.params.id])
        .then(results => {
            res.send(results.rows);
        }).catch(err => {
            console.error('/submissions put/:id form failed', err);
            res.sendStatus(500);
        });
});

router.put('/likes/:id', async (req, res) => {
    try{
    console.log('hit update likes put', req.params.id);
    let queryString = `UPDATE "submission" SET "likes" = "likes" + 1 WHERE "id" = $1 RETURNING "id";`;
    let result = await pool.query(queryString, [req.params.id]);
    console.log(result.rows.map(submission => submission.id));
    let submissionId = Number(result.rows.map(submission => submission.id));
    let queryStringTwo = `UPDATE "user" SET "likes" = "likes" - 1 WHERE "id" = $1;`
    await pool.query(queryStringTwo, [req.user.id]);
    let queryStringThree = `INSERT INTO "like" ("submission_id", "user_id") VALUES ($1, $2);`
    await pool.query(queryStringThree, [submissionId, req.user.id]);
    res.sendStatus(200);
    
    }
    catch(err){
        console.error(err)
    }
});

router.get('/likes/:id', (req, res) => {
    console.log('hit get likes', req.params.id);
    let queryString = `SELECT * FROM "like" WHERE "user_id" = $1;`;
    pool.query(queryString, [req.params.id])
        .then(results => {
            res.send(results.rows);
        }).catch(err => {
            console.error('/submissions GET/likes/:id failed', err);
            res.sendStatus(500);
        });
})

module.exports = router;
