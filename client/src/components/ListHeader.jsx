import { useState, React } from "react";
import Model from "./Model";

function ListHeader(props) {
  const [showModel, setShowModel] = useState(false);

  function signOut() {
    console.log("SignOut");
  }

  return (
    <div className="list-header">
      <h1>{props.listName}</h1>
      <div className="button-container">
        <button className="create" onClick={()=>(setShowModel(true))}>ADD NEW</button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModel && (
        <Model
          mode={"create"}
          setShowModel={setShowModel}
          userId={props.userId}
          getData={props.getData}
        />
      )}
    </div>
  );
}

export default ListHeader;
