import React, { Fragment, useState } from "react";

const clientpage = () => {
    //variables
    const [orderlist, setOrderlist] = useState([]);
    const [sonumber, setSearch] = useState("");
    const [company, setCompany] = useState("");

    //get all_orders
    const getOrder = async() => {
        try {
            const response = await fetch('/api/orderlist');
            const jsonData = await response.json();
            setOrderlist(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    //get company_list
    const getCompanylist = async() => {
        try {
            const response = await fetch('/api/companyname');
            const jsonData = await response.json();
            setCompanylist(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    //search engine

    //reset

    //return components 
    return ( 
     <Fragment>
         
     </Fragment>
    );
};

export default clientpage;