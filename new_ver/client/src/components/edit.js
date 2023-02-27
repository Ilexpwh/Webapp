import React, { Fragment, useState } from "react";

const Edit = ({ orderlist }) => {
  const [sonumber, setsonumber] = useState(orderlist.sonumber);
  const [qty, setqty] = useState(orderlist.qty);
  const [weight, setweight] = useState(orderlist.weight);
  const [height, setheight] = useState(orderlist.height);
  const [length, setlength] = useState(orderlist.length);
  const [width, setwidth] = useState(orderlist.width);
  const [awb, setawb] = useState(orderlist.awb);
  const [companyname, setcompanyname] = useState(orderlist.companyname);

  const updateorderlsit = async e => {
    e.preventDefault();
    try {
      const body = { sonumber, qty, awb, length, weight, height, width, companyname };
      const response = await fetch(
        `/api/orderlist/${orderlist.order_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target={`#id${orderlist.order_id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${orderlist.order_id}`}
        onClick={() => setsonumber(orderlist.sonumber)}
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setsonumber(orderlist.sonumber)}
              >
                &times;
              </button>
            </div>
            
            <div class="modal-body">
            <div class="form-group col-md-5">
            <label for="inputSO">SO number</label>
              <input
                type="text"
                className="form-control"
                id = "inputSO"
                value={sonumber}
                onChange={e => setsonumber(e.target.value)}
              />
              </div>
              <div class="form-row">
              <div class="form-group col-md-4">
              <label for="inputAWB">AWB</label>
              <input
                type="text"
                className="form-control"
                id = "inputAWB"
                value={awb}
                onChange={a => setawb(a.target.value)}
              />
              </div>
              <div class="form-group col-md-4">
              <label for="inputCompany">Company</label>
              <input
                type="text"
                className="form-control"
                id = "inputCompany"
                value={companyname}
                onChange={b => setcompanyname(b.target.value)}
              />
              </div>
              </div>
              <div class="form-row">
              <div class="form-group col-md-2">
              <label for="inputL">L 長 (cm)</label>
              <input
                type="text"
                className="form-control"
                id = "inputL"
                value={length}
                onChange={c => setlength(c.target.value)}
              />
              </div>
              <div class="form-group col-md-2">
              <label for="inputW">W 寬 (cm)</label>
              <input
                type="text"
                className="form-control"
                id = "inputW"
                value={width}
                onChange={d => setwidth(d.target.value)}
              />
              </div>
              <div class="form-group col-md-2">
              <label for="inputH">H 高 (cm)</label>
              <input
                type="text"
                className="form-control"
                id = "inputH"
                value={height}
                onChange={f => setheight(f.target.value)}
              />
              </div>
              <div class="form-group col-md-2">
              <label for="inputQTY">QTY 數量</label>
              <input
                type="text"
                className="form-control"
                id = "inputQTY"
                value={test.qty}
                onChange={g => setqty(g.target.value)}
              />
              </div>
              <div class="form-group col-md-2">
              <label for="inputWeight">Weight 重量（kg）</label>
              <input
                type="text"
                className="form-control"
                id = "inputWeight"
                value={weight}
                onChange={h => setweight(h.target.value)}
              />
              </div>
              </div>
              <div class="form-group col-md-3">
              <label for="upload">UploadImage 上載圖片</label>
              <input type="file" accept="image/*" class="form-control-file" id="upload"/>
              </div>
            </div>
            
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-dark"
                data-dismiss="modal"
                onClick={e => updateorderlsit(e)}

              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-dark"
                data-dismiss="modal"
                onClick={() => setsonumber(orderlist.sonumber)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>

      </div>
      
    </Fragment>
  );
};

export default Edit;
