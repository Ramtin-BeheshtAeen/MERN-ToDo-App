import { useState, React } from "react";
import TickIcon from "./Tick";
import ProgressBar from "./ProgressBar";
import Model from "./Model";


function ListItem({ task, userId, getData }) {
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="edit" onClick={()=>(setShowModel(true))}>EDIT</button>
        <button className="delete">DELETE</button>
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
