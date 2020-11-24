const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//change the amount of votes a juror has every time they hit the vote button
router.put('/:id', rejectUnauthenticated, async (req, res) => {
    try {
      let queryString = `UPDATE "submission" SET "likes" = "likes" + 1 WHERE "id" = $1 RETURNING "id";`;
      let result = await pool.query(queryString, [req.params.id]);
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
  //get the amount of likes a user has
  router.get('/', rejectUnauthenticated, (req, res) => {

    let queryString = `SELECT * FROM "like" WHERE "user_id" = $1;`;
    pool
      .query(queryString, [req.user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.error('/likes GET/likes/ failed', err);
        res.sendStatus(500);
      });
  });
//how many likes they have at most (assigned when making user)
  router.get('/max/', rejectUnauthenticated, (req, res) => {

    let queryString = `	SELECT "likes" FROM "user" WHERE "id" = $1;`;
    pool 
      .query(queryString, [req.user.id])
      .then((results) => {
          res.send(results.rows[0]);

      })
      .catch((err) => {
        console.error('/likes GET/likes/user/ failed', err);
        res.sendStatus(500);
      });
  });
  
  module.exports = router;