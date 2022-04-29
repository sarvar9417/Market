import React from "react";

export const InputRoom = ({
  room,
  inputHandler,
  keyPressed,
  saveHandler,
  loading
}) => {
  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="table m-0">
          <thead>
            <tr>
              <th>Xona turi</th>
              <th>Xona raqami</th>
              <th>O'rin raqami</th>
              <th>Narxi</th>
              <th>Saqlash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  style={{ minWidth: "70px" }}
                  name="type"
                  value={room.type && room.type}
                  onKeyUp={keyPressed}
                  onChange={inputHandler}
                  type="text"
                  className="form-control w-75"
                  id="type"
                  placeholder="Xona turini kiriting"
                />
              </td>
              <td>
                <input
                  style={{ minWidth: "70px" }}
                  name="number"
                  value={room.number && room.number}
                  onKeyUp={keyPressed}
                  onChange={inputHandler}
                  type="text"
                  className="form-control w-75"
                  id="number"
                  placeholder="Xona nomini kiriting"
                />
              </td>
              <td>
                <input
                  style={{ minWidth: "70px" }}
                  name="place"
                  value={room.place}
                  onKeyUp={keyPressed}
                  onChange={inputHandler}
                  type="number"
                  className="form-control w-75"
                  id="place"
                  placeholder="Yotoq o'rnini kiriting"
                />
              </td>
              <td>
                <input
                  style={{ minWidth: "70px" }}
                  name="price"
                  value={room.price}
                  onKeyUp={keyPressed}
                  onChange={inputHandler}
                  type="number"
                  className="form-control w-75"
                  id="price"
                  placeholder="Narxini kiriting"
                />
              </td>
              <td>
                {loading ? 
                <button
                  className="btn btn-info"
                  disabled
                >
                  <span class="spinner-border spinner-border-sm"></span>
                  Loading...
                </button>
                  :
                <button
                  onClick={saveHandler}
                  className="btn btn-info py-1 px-4"
                >
                  Saqlash
                </button>
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
