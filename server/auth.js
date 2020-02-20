const router = require('express').Router();
const { User } = require('./db');
module.exports = router;

router.put('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (user) {
      req.session.userId = user.id;
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', async (req, res, next) => {
  try {
    req.session.destroy();
    res.sendStatus(204);
  }
  catch (error) {
    next(error);
  }
})
