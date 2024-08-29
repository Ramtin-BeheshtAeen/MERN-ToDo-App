import { React, useState, useEffect } from "react";
import DateTimePicker from "./Form/DateTimePicker";
import RadioButtonGroup from "./Form/RadioButtonGroup";
import dayjs from "dayjs";

const Model = ({ element, mode, setShowModel, getData, userId, existingData }) => {
  const [title, setTitle] = useState("");

  const editMode = mode === "edit" ? true : false;
  const listMode = element === "list" ? true : false;

  const handleTitleChange = (e) => {
    const {name, value} = e.target
    setTitle(value)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseData = {
      // _id: userId,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER_URL}//${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // Use 200 OK for general success responses.
      // Use 201 Created when a new resource has been created successfully.
      if (response.status === 201) {
        setShowModel(false);
        getData();
      }
    } catch (err) {
      console.log(" \n error in Model.jsx/ line 76 \n");
      console.log(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="overlay">
      <div className="model">
        <div className="form-title-container">
          <h3>Let's {mode} a Container</h3>
          <button onClick={() => setShowModel(false)}> X </button>
        </div>

        <form>
          <input
            required
            maxLength={100}
            placeholder="Container Name"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />

          <input
            type="submit"
            onClick={editMode ? handleEditSubmit : handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default Model;
