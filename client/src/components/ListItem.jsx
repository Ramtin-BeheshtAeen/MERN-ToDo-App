import { useState, useEffect, React } from "react";
import TickIcon from "./Tick";
import ProgressBar from "./ProgressBar";
import Model from "./Model";
import EmptyTickIcon from "./EmptyTick";

function ListItem({ task, userId, getData }) {
  const [showModel, setShowModel] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (task.status === 'Pending') {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  }, [task.status]);

  const setTaskDoneFunction = () => {
    console.log("Setting task to done");
    setIsDone(true);
  };

  const setTaskPendingFunction = () => {
    console.log("Setting task to pending");
    setIsDone(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/delete-to-do/${userId}/${task._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.log("Error in handleDelete:", err);
    }
  };

  return (
    <div className="list-item">
      <div className="info-container">

        {isDone ? (
          <div onClick={setTaskPendingFunction}>
          <TickIcon />
          </div>
        ) : (
          <div  onClick={setTaskDoneFunction}>
          <EmptyTickIcon />
          </div>
        )}

        <p className="task-title" style={{'textDecoration': isDone ? 'line-through' : ' ' }}>{task.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModel(true)}>EDIT</button>
        <button className="delete" onClick={handleDelete}>DELETE</button>
      </div>

      {showModel && (
        <Model
          mode={"edit"}
          setShowModel={setShowModel}
          userId={userId}
          getData={getData}
          existingData={task}
        />
      )}
    </div>
  );
}

export default ListItem;
