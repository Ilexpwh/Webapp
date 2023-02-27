import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";

const ClientView = () => {

 const [orderlist, serOrderlist] = useState([]);
 const [sonumber, setSearch] =  useState("");
 const [companylist, setCompanylist] = useState([]);
 const [company, setCompany]= useState("");

 const getCompany = async () => {
   try{
       const res = await fetch(`/api/companyname`);
       const jsonData = await res.json();
       setCompanylist(jsonData);
   }catch(err) {
       console.error(err.message);
   }
 };

 const getOrder = async () => {
   try {
    const response = await fetch(`/api/orderlist`);
    const jsonData = await response.json();
    setOrderlist(jsonData);
   } catch(err) {
       console.error(err.message);
   }
 
 };
 
 const getsonumber = async (username,sonumber) => {
    try {
      const slength = sonumber.length;
      const ulength = username.length;
      //console.log(username);
      
      if(slength > 0 && ulength > 0){
        if(username="all"){
          const response1 = await fetch(`/${sonumber}`);
          const jsonData1 = await response1.json();
          setOrderlist(jsonData1);
        }
        else{
          const response1 = await fetch(`/${username}/${sonumber}`);
          const jsonData1 = await response1.json();
          setOrderlist(jsonData1);
        }
      }
      else if(slength <= 0 && ulength > 0){
        if(username=="all"){
          const response1 = await fetch(`/api/orderlist`);
          const jsonData1 = await response1.json();
          setOrderlist(jsonData1);
        }else{
          const response1 = await fetch(`/api/orderlist/${username}`);
          const jsonData1 = await response1.json();
          setOrderlist(jsonData1);
        }
        
      }else if(slength > 0 && ulength <= 0 ){
        const response1 = await fetch(`/api/orderlist/item/${sonumber}`);
        const jsonData1 = await response1.json();
        setOrderlist(jsonData1);
      }else{
        alert("Please input SOnumber or select company!");
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const reset = async ()=>{
    setSearch("");
    setCompany("");
  }
  
  useEffect(() => {
    getTodos();
    getCompany();
  }, []);

 return(
  <Fragment>
      <p>hi i am such a fool.</p>
  </Fragment>
 );

};

export default ClientView;
