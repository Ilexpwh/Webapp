const router = require("express").Router();
const authorizationclient = require("../middleware/authorizationclient");
const authorizationstaff = require("../middleware/authorizationstaff");
const pool = require("../db");

//all

router.get("/client", authorizationclient, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM client WHERE username = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.get("/staff", authorizationstaff, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM staff WHERE username = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});
module.exports = router;