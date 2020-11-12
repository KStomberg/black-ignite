const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  //delete a specific user based on client delete in manageJuror.js
  console.log('made it to our delete talk router', req.params)
  const queryText = `DELETE FROM "category" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('we have an error in delete route from TALK', error);
        res.sendStatus(500);
    });
});
module.exports = router;