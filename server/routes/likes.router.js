const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.put('/:id', async (req, res) => {
    try {
      console.log('hit update likes put', req.params.id);
      let queryString = `UPDATE "submission" SET "likes" = "likes" + 1 WHERE "id" = $1 RETURNING "id";`;
      let result = await pool.query(queryString, [req.params.id]);
      console.log(result.rows.map((submission) => submission.id));
      let submissionId = Number(result.rows.map((submission) => submission.id));
      let queryStringTwo = `UPDATE "user" SET "likes" = "likes" - 1 WHERE "id" = $1;`;
      await pool.query(queryStringTwo, [req.user.id]);
      let queryStringThree = `INSERT INTO "like" ("submission_id", "user_id") VALUES ($1, $2);`;
      await pool.query(queryStringThree, [submissionId, req.user.id]);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
    }
  });
  
  router.get('/', (req, res) => {
    console.log('hit get likes', req.user.id);
    let queryString = `SELECT * FROM "like" WHERE "user_id" = $1;`;
    pool
      .query(queryString, [req.user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.error('/submissions GET/likes/ failed', err);
        res.sendStatus(500);
      });
  });
  
  module.exports = router;