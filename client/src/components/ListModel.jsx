import { React, useState, useEffect } from "react";
import BasicSelect from "./Ui/MultiSelect";

const ListModel = ({
  containers,
  listId,
  element,
  mode,
  setShowModel,
  getData,
  userId,
  listName,
  currentListContainerId
}) => {
  const editMode = mode === "edit" ? true : false;

  const [listNewName, setListNewName] = useState(listName);
  const [selectedContainer, setSelectedContainer] = useState(null);

  const handleListNameChange = (e) => {
    const { name, value } = e.target;
    setListNewName(value);
  };

  const handleContainerSelect = (item) => {
    setSelectedContainer(item)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Edit Submitted");
    console.log(selectedContainer)
    

  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <BasicSelect label={'container'} currentState={currentListContainerId} data={containers}  onSelect={handleContainerSelect}/>
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
