const router = require('express').Router();
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);

module.exports = router;
