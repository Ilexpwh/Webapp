import React, { Fragment, useEffect, useState } from "react";
import InputTodo from "./InputTodo";
const Add = ({setAuth2}) =>{
    const logout = async e =>{
        try {
          e.preventDefault();
          localStorage.removeItem("token");
          setAuth2(false);
          
        } catch (err) {
          console.error(err.message);
        }
        
      };
    return(
    <Fragment>
        {" "}
        <p align="right">
          <button onClick={e => logout(e)} className="btn btn-primary">
              Logout
            </button>
        </p>
        <InputTodo/>
    </Fragment>
);
};
export default Add;