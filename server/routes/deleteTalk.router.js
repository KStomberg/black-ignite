const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  //soft delete category from category table
  //actually just sets is_deleted to TRUE so it is ignored 

  const queryText = `UPDATE "category" 
  SET "is_deleted" = TRUE
  WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then( (result) => {

        res.send(result.rows);
    })
    .catch((error) => {
        console.log('we have an error in delete route from TALK', error);
        res.sendStatus(500);
    });
});
module.exports = router;