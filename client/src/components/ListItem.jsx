import { useState, React } from "react";
import TickIcon from "./Tick";
import ProgressBar from "./ProgressBar";
import Model from "./Model";


function ListItem({ task, userId, getData }) {
  const [showModel, setShowModel] = useState(false);

  const handleDelete = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/delete-to-do/${userId}/${task._id}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'}
        })
    if (response.status === 200){
        getData()
    }
    }catch(err) {
        console.log(" \n error in handleDelete \n");
        console.log(err);
    }
  }

  return (
    <div className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="edit" onClick={()=>(setShowModel(true))}>EDIT</button>
        <button className="delete" onClick={handleDelete} >DELETE</button>
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
