import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [sonumber, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const body = { sonumber };
      if(sonumber==""){
        alert("Please input SOnumber!")
      }else{
        const response = await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        
        });
        const parseResponse = await response.json();
        //console.log(parseResponse);
        console.log('print body: %s', body)
        window.location = "/staff/add";
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };



  return (
    <Fragment>
      <h1 className="text-center mt-5">Order List</h1>
      
      {<form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={sonumber}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-dark">Add</button>
        
      </form>}
    </Fragment>
  );
};

export default InputTodo;