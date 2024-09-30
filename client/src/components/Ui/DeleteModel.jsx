import { React, useState, useEffect } from "react";
import BasicSelect from "../Form/MultiSelect";
import dayjs from "dayjs";

const DeleteModel = ({ setShowModel, userId, listId }) => {

  const handleDelete = async () => {
    console.log("Item deleted");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_SERVER_URL
        }/list/${userId}/${listId}`,
        {
          method: 'DELETE',
        }
      );
      const json = await response.json();       
      console.log(json)
    } catch (err) {
      console.log(err);
    }
    setShowModel(false);
  };

  const handleCancel = () => {
    setShowModel(false);
  };

  return (
    <div className="overlay">
      <div className="model">
        <div className="form-title-container">
          <h3>{/* Let's {mode} {listName} */}</h3>
          <button onClick={() => setShowModel(false)}> X </button>
        </div>

        <div className="dialog">
          <p>Are you sure you want to delete this item?</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
