import { React, useState, useEffect } from "react";
import BasicSelect from "../Form/MultiSelect";
import dayjs from "dayjs";

const ListModel = ({
  containers,
  listId,
  element,
  mode,
  setShowModel,
  getData,
  userId,
  listName,
  currentListContainerId,
}) => {

  useEffect(() => {
    console.log("ListModel Props:", {
      listId,
      listName,
      currentListContainerId,
    });
  }, [listId, listName, currentListContainerId]);

  const editMode = mode === "edit" ? true : false;

  const [listNewName, setListNewName] = useState(listName);
  const [selectedContainer, setSelectedContainer] = useState({
    id: currentListContainerId,
  });

  const handleListNameChange = (e) => {
    const { name, value } = e.target;
    setListNewName(value);
  };

  const handleContainerSelect = (item) => {
    setSelectedContainer(item);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const editData = {
      // _id: userId,
      name: listNewName,
      containerId: selectedContainer.id,
    };

    const formData = editMode
      ? { ...editData, updatedAt: dayjs().format() }
      : { ...editData };

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_SERVER_URL
        }/list/${userId}/${listId}`,
        {
          method: "Put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // Use 200 OK for general success responses.
      // Use 201 Created when a new resource has been created successfully.
      if (response.status === 200) {
        setShowModel(false);
        // location.reload();
        console.log(response)
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(" \n error  \n");
      console.log(err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    const editData = {
      // _id: userId,
      name: listNewName,
      containerId: selectedContainer.id,
    };

    const formData = editMode
      ? { ...editData, updatedAt: dayjs().format() }
      : { ...editData };
      
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/list/${userId}`,
        {
          method: "Post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // Use 200 OK for general success responses.
      // Use 201 Created when a new resource has been created successfully.
      if (response.status === 200) {
        setShowModel(false);
        location.reload();
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(" \n error  \n");
      console.log(err);
    }
  };

  return (
    <div className="overlay">
      <div className="model">
        <div className="form-title-container">
          <h3>
            Let's {mode} {listName}
          </h3>
          <button onClick={() => setShowModel(false)}> X </button>
        </div>

        <form>
          <BasicSelect
            label={"container"}
            currentState={currentListContainerId}
            data={containers}
            onSelect={handleContainerSelect}
          />
          <input
            required
            maxLength={100}
            name="title"
            value={listNewName}
            onChange={handleListNameChange}
          />

          <input
            type="submit"
            onClick={editMode ? handleEditSubmit : handleCreateSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default ListModel;
