const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 3001;
//const fileUpload = require('express-fileupload'); //pending need upload image to AWS S.3

//middleware
app.use(cors());
app.use(express.json()); //req.body
//app.use(fileUpload()); //pending

// not sure if neccesary
//const path =require("path");
/*if (process.env.NODE_ENV === "production") {
	//server static content
	//npm run build
	app.use(express.static(path.join(_dirname, "client/build")));
}*/

//ROUTE
app.use("/api/auth", require("./routes/jwtAuth"));
app.use("/api/dashboard", require("./routes/dashboard"));


//get full list 
app.get("api/orderlist", async (req, res) => {
 try {
     const printorder = await pool.query("SELECT * FROM orderlist order by date");
     res.json(printorder.rows);
 } catch (err){
     console.error(err.message);
 }
});

//get by id
app.get("/api/orderlist/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const byid = await pool.query("SELECT * FROM orderlist WHERE aid = $1", [
        id
      ]);
  
      res.json(byid.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

//get by company
  app.get("/api/orderlist/:companyname", async (req, res) => {
    try {
      const { companyname } = req.params;
      const bycom = await pool.query("SELECT * FROM record WHERE companyname = $1", [
        companyname
      ]);
  
      res.json(bycom.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get by sonumber
  app.get("/api/orderlist/item/:sonumber",async(req,res) => {
    try {
      const { sonumber } = req.params;
      const byso = await pool.query("SELECT * FROM record WHERE sonumber = $1", [
        sonumber
      ]);
  
      res.json(byso.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

//get by sonumber in companyname
  app.get("/api/orderlist/:companyname/:sonumber",async(req,res) => {
    try {
      const { companyname,sonumber } = req.params;
      const bycomso = await pool.query("SELECT * FROM record WHERE sonumber = $1 and companyname = $2", [
        sonumber,
        companyname
      ]);
  
      res.json(bycomso.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

//get name of company
  app.get("/api/companyname", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT distinct companyname FROM record order by companyname");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

//post everything here (massive here whole list of orders)
app.post("/api/orderlist", async (req, res) => {
    try {
      const { sonumber, awb, qty, weight, length, width, height, companyname } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO record (sonumber, awb, qty, weight, length, width, height, companyname) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [sonumber, awb, qty, weight, length, width, height, companyname]
      );
  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

//update order by id
app.put("/api/orderlist/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { sonumber, weight, width, length, height, qty, awb, companyname } = req.body;
      const update = await pool.query(
        "UPDATE record SET sonumber = $1, awb = $2, qty = $3, weight = $4, length = $5,  width = $6, height = $7, companyname = $8 WHERE aid = $9",
        [sonumber, awb, qty, weight, length, width, height, companyname, id]
      );
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
    
     

//delete order by id
app.delete("/api/orderlist/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteorder = await pool.query("DELETE FROM orderlist WHERE aid = $1", [
        id
      ]);
      res.json("Item is Deleted!");
    } catch (err) {
      console.log(err.message);
    }
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
