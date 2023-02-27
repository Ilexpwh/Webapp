import React, { Fragment, useState } from "react";

const Input = () => {
    const [sonumber, setInput] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt_token", localStorage.token);
            const body = { sonumber };
            if(sonumber==""){
                alert("Please input SOnumber!")
            }else{
                const response = await fetch("/api/orderlist", {
                   method: "POST",
                   headers: myHeaders,
                   body: JSON.stringify(body), 
                
                });
                const parseResponse = await response.json();
                console.log(parseResponse);
            }
        } catch (err){
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
              onChange={e => setInput(e.target.value)}
            />
            <button className="btn btn-dark">Add</button>
        
            </form>}
        </Fragment>    
    );
};

export default Input;