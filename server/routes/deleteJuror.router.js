const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  //delete a specific user based on client delete in manageJuror.js

  const queryText = `UPDATE "user" 
  SET "is_deleted" = TRUE
  WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then( (result) => {

        res.send(result.rows);
    })
    .catch((error) => {
        console.log('we have an error in delete route from USER', error);
        res.sendStatus(500);
    });
});
module.exports = router;