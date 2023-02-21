import React, { Fragment, useState } from "react";

const ViewList = ({orderlist}) =>{
  const [orderlist,setrecord] = useState({
    sonumber: orderlist.sonumber,
    companyname: orderlist.companyname,
    date: orderlist.date,
    qty: orderlist.qty,
    weight:orderlist.weight,
    height:orderlist.height,
    length: orderlist.length,
    width: orderlist.width,
    awb:orderlist.awb,
    aid:orderlist.aid
  });
  return(
    <Fragment>
  <button 
    type="button" 
    class="btn btn-warning" 
    data-toggle="modal" 
    data-target={`#aid${orderlist.aid}`}>
    View
  </button>


  <div class="modal" id={`aid${orderlist.aid}`}>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Detail</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

       
        <div class="modal-body">
        <div class="form-group col-md-5"></div> 
        <table class="table table-border mt-5 text-left">
        <thead>
          <tr>
            <th>SO number: </th>
            <th>{orderlist.sonumber}</th>
          </tr>
          <tr>
            <th>AWB: </th>
            <th> {orderlist.awb}</th>
          </tr>
          <tr>
            <th>Companyname: </th>
            <th> {orderlist.companyname}</th>
          </tr>
          <tr>
            <th>qty: </th>
            <th>{orderlist.qty}</th>
          </tr>
          <tr>
            <th>weight: </th>
            <th>{orderlist.weight}</th>
          </tr>
          
          <tr>
            <th>height: </th>
            <th>{orderlist.height}</th>
          </tr>
          <tr>
            <th>length: </th>
            <th>{orderlist.length}</th>
          </tr>
          <tr>
            <th>width: </th>
            <th> {orderlist.width}</th>
          </tr>
        </thead> 
        </table>

        </div>

        
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>
  </Fragment>
  );
};
export default ViewList;