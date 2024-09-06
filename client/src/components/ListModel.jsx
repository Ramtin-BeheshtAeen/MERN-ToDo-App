import { React, useState, useEffect } from "react";

const ListModel = ({
  containers,
  listId,
  element,
  mode,
  setShowModel,
  getData,
  userId,
  listName,
}) => {
  const editMode = mode === "edit" ? true : false;
  const [listNewName, setListNewName] = useState(listName);

  const handleListNameChange = (e) => {
    const { name, value } = e.target;
    setListNewName(value);
  };

  const handleEditSubmit = () => {
    console.log("Submitted");
  };
  const handleSubmit = () => {
    console.log("Submitted");
  };
  return (
    <div className="overlay">
      <div className="model">
        <div className="form-title-container">
          <h3>Let's {mode} {listName} </h3>
          <button onClick={() => setShowModel(false)}> X </button>
        </div>

        <form>
          <input
            required
            maxLength={100}
            name="title"
            value={listNewName}
            onChange={handleListNameChange}
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

export default ListModel;
