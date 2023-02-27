import React, { Fragment, useState } from "react";

const ViewList = ({test}) =>{
  const [orderlist,setOrderlist] = useState({
    sonumber: test.sonumber,
    companyname: test.companyname,
    date: test.date,
    qty: test.qty,
    weight:test.weight,
    height:test.height,
    length: test.length,
    width: test.width,
    awh:test.awb,
    aid:test.order_id
  });
  return(
    <Fragment>
  <button 
    type="button" 
    class="btn btn-warning" 
    data-toggle="modal" 
    data-target={`#aid${record.order_id}`}>
    View
  </button>


  <div class="modal" id={`aid${record.order_id}`}>
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
            <th>{record.sonumber}</th>
          </tr>
          <tr>
            <th>AWB: </th>
            <th> {record.awb}</th>
          </tr>
          <tr>
            <th>Companyname: </th>
            <th> {record.companyname}</th>
          </tr>
          <tr>
            <th>qty: </th>
            <th>{record.qty}</th>
          </tr>
          <tr>
            <th>weight: </th>
            <th>{record.weight}</th>
          </tr>
          
          <tr>
            <th>height: </th>
            <th>{record.height}</th>
          </tr>
          <tr>
            <th>length: </th>
            <th>{record.length}</th>
          </tr>
          <tr>
            <th>width: </th>
            <th> {record.width}</th>
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