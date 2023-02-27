import React, { Fragment, useEffect, useState } from "react";

import Input from "./input";
import Edit from "./edit";

const orderlist = () => {
    const [orderlist, setOrder] = useState([]);
  
    //delete item
    const deleteTodo = async id => {
      try {
        const deleteTodo = await fetch(`/api/orderlist/${id}`, {
          method: "DELETE"
        });
  
        setOrder(orderlist.filter(orderlist => orderlist.order_id !== id));
      } catch (err) {
        console.error(err.message);
      }
    };
  
    const getTodos = async () => {
      try {
        const response = await fetch("/api/orderlist");
        const jsonData = await response.json();
  
        setOrder(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getTodos();
    }, []);
  
    console.log(orderlist);
  
    return (
      <Fragment>
        {" "}
        <Input/>
        <table class="table table-striped mt-5 text-center">
          <thead>
            <tr>
              <th>SO number</th>
              <th>AWB</th>
              <th>Date 日期</th>
              <th>Edit 更改</th>
              <th>Delete 刪除</th>
            </tr>
          </thead>
          <tbody>
            {orderlist.map(orderlist => (
              <tr key={orderlist.order_id}>
                <td>{orderlist.sonumber}</td>
                <td>{orderlist.awb}</td>
                <td>{orderlist.date}</td>
                <td>
                  <Edit orderlist={orderlist} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(orderlist.order_id)}
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
  
  export default orderlist;
  