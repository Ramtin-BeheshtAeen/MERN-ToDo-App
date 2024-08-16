import { useState, React } from "react";
import Model from "./Model";
import {useCookies} from 'react-cookie'


function ListHeader(props) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [showModel, setShowModel] = useState(false);

  function signOut() {
    console.log("SignOut");
    removeCookie("AuthToken")
    removeCookie("Email")
    removeCookie("UserId")
    window.location.reload()
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
