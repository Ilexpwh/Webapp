import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditTodo from "./EditTodo";
import ViewList from "./ViewList";
import InputTodo from "./InputTodo";
//import './Staff.css';


const Staff = ({setAuth2}) => {
  const [todos, setTodos] = useState([]);
  const [sonumber, setSearch] = useState("");
  const [companylist,setCompanylist] = useState([]);
  const [company,setCompany] = useState("");
  //delete todo function
  const getCompany = async () => {
    try{
    const res = await fetch(`/companyname`);
    const jsonData = await res.json();
    
    setCompanylist(jsonData);
    }catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`/orderlist/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(test => test.aid !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(`/orderlist`);
      const jsonData = await response.json();
      //console.log(jsonData);

      setTodos(jsonData);
     
      //console.log(todos);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getsonumber = async (username,sonumber) => {
    try {
      const slength = sonumber.length;
      const ulength = username.length;
      console.log(username);
      
      if(slength > 0 && ulength > 0){
        if(username="a"){
          const response1 = await fetch(`/item/${sonumber}`);
          const jsonData1 = await response1.json();
          setTodos(jsonData1);
        }
        else{
          const response1 = await fetch(`/${username}/${sonumber}`);
          const jsonData1 = await response1.json();
          setTodos(jsonData1);
        }
      }
      else if(slength <= 0 && ulength > 0){
        if(username=="a"){
          const response1 = await fetch(`/orderlist`);
          const jsonData1 = await response1.json();
          setTodos(jsonData1);
        }else{
          const response1 = await fetch(`/orderlist/${username}`);
          const jsonData1 = await response1.json();
          setTodos(jsonData1);
        }
        
      }else if(slength > 0 && ulength <= 0 ){
        const response1 = await fetch(`/item/${sonumber}`);
        const jsonData1 = await response1.json();
        setTodos(jsonData1);
      }else{
        alert("Please input SO number or select company!");
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const reset = async ()=>{
    setSearch("");
    setCompany("");
  }

  const logout = async e =>{
    try {
      e.preventDefault();
      localStorage.removeItem("token");
      setAuth2(false);
      
    } catch (err) {
      console.error(err.message);
    }
    
  };

  const handleChangeOnUpdating = (e) => {
    setCompany(e);
  };

  useEffect(() => {
    getTodos();
    getCompany();
  }, []);

  return (
    <Fragment>
      {" "}
      <p align="right">
      <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </p>
      <br></br>
      {/* <Link to = "/staff/search" className = "btn btn-primary">Search</Link> 
      <Link to = "/staff/add" className = "btn btn-primary ml-3">Add</Link>  */}
      <br></br>
      <label>Search SO number:</label>
      <input
        type="text" 
        name="search"
        placeholder = "Search here"
        className="form-control"
        value={sonumber}
        onChange={e => setSearch(e.target.value)}
      />
      <Form.Group>
        <Form.Label>Select company:</Form.Label>
        <Form.Control
          name="company"
          value={company}
          className="form-control"
          onChange={e => setCompany(e.target.value)}
          as="select"
        >
          <option value=""> -- select an option -- </option>
          <option value="a">All</option>
          {companylist.map(company => (
            <option key={company.companyname}>{company.companyname}</option>
          
          ))}
        </Form.Control>
      </Form.Group>
      <button onClick={() => getsonumber(company,sonumber)}className="btn btn-primary">
        Search
      </button>

      <button onClick={() => reset()}className="btn btn-primary ml-3">
        Reset
      </button>
      <InputTodo/>

      
      
      <table class="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th>SO number</th>
            <th>AWB</th>
            <th>Date 日期</th>
            <th>View 查看</th>
            <th>Edit 更改</th>
            <th>Delete 刪除</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(test => (
            <tr key={test.aid}>
              <td>{test.sonumber}</td>
              <td>{test.awh}</td>
              <td>{test.date}</td>
              <td>
                <ViewList test={test}/>
              </td>
              <td>
                <EditTodo test={test} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(test.aid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </Fragment>
  );
};

export default Staff;