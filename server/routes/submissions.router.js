const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
//get all submissions
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryString = `SELECT * FROM "submission" ORDER BY "id" DESC;`;
  pool
    .query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('/submissions GET failed', err);
      res.sendStatus(500);
    });
});
//post into our submission table
router.post('/', (req, res) => {
  let queryString = `INSERT INTO "submission" ("category_id", "full_name", "email", "instagram", "linkedin", "twitter", "comments", "time_stamp", "video_url")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
  pool
    .query(queryString, [
      req.body.category,
      req.body.fullName,
      req.body.email,
      req.body.instagram,
      req.body.linkedIn,
      req.body.twitter,
      req.body.comments,
      req.body.date,
      req.body.fileUrl,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('/submissions POST failed', err);
      res.sendStatus(500);
    });
});
// grab submission at specific id
router.get('/:id', rejectUnauthenticated, (req, res) => {
  let queryString = `SELECT * FROM "submission" WHERE "id" = $1;`;
  pool
    .query(queryString, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.error('/submissions GET/:id failed', err);
      res.sendStatus(500);
    });
});
//update the form status to be sent on click
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('hit update submission put', req.params);
  let queryString = `UPDATE "submission" SET "form_status" = true WHERE "id" = $1;`;
  pool
    .query(queryString, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.error('/submissions put/:id form failed', err);
      res.sendStatus(500);
    });
});

module.exports = router;
