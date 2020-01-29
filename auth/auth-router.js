const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("./auth-config");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let user = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res.status(200).json({
          token, // adds token to res
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// creates and signs the token
function signToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "2h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
