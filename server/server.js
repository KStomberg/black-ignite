const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');
// Route includes
const userRouter = require('./routes/user.router');
const talksRouter = require('./routes/category.router');
const submissionsRouter = require('./routes/submissions.router');
const usersRouter = require('./routes/users.routers');
const deleteJuror = require('./routes/deleteJuror.router');
const deleteTalk = require('./routes/deleteTalk.router');
const rankingsRouter = require('./routes/rankings.router')
const addCategory = require('./routes/categoryPost.router');
const likesRouter = require('./routes/likes.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */

app.use('/api/ranking', rankingsRouter);
app.use('/api/users', usersRouter);
app.use('/api/user', userRouter);
app.use('/api/talks', talksRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/likes', likesRouter)
app.use('/api/delete', deleteJuror);
app.use('/api/delete/talk', deleteTalk);
app.use('/api/category', addCategory);
app.use('/s3', UploaderS3Router({
  bucket: process.env.BUCKET_NAME,                // required
  region: 'ca-central-1',                            // optional
  headers: {'Access-Control-Allow-Origin': '*'},  // optional
  ACL: 'public-read',                             // this is the default - set to `public-read` to let anyone view uploads
}));



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
