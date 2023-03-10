const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorizeentication

router.post("/register",  async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM staff WHERE username = $1", 
    [username]
      );

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO staff (username, password) VALUES ($1, $2) RETURNING *",
      [username, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login/staff", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM staff WHERE username = $1", [
      username
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify/staff", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.json(false);  
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;