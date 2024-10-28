import { useState, React, useEffect } from "react";
import Model from "./Model";
import { useCookies } from "react-cookie";

function ListHeader(props) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModel, setShowModel] = useState(false);

  function signOut() {
    console.log("SignOut");
    removeCookie("AuthToken");
    removeCookie("Email");
    removeCookie("UserId");
    removeCookie("Name");
    removeCookie("LastName");
    window.location.reload();
  }

  
  return (
    <div className="list-header">
      <h1>{props.listName}</h1>
      <div className="button-container">
        <button className="success-button" onClick={() => setShowModel(true)}>
          ADD NEW
        </button>
        <button className="danger-button" onClick={signOut}>
          SIGN OUT
        </button>

         {/* <button className="primary-button" onClick={props.toggleTheme}>
        {props.isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>  */}

      <button>{props.currentListId}</button>

      </div>
      {showModel && (
        <Model
          mode={"create"}
          setShowModel={setShowModel}
          userId={props.userId}
          getData={props.getData}
          currentListId={props.currentListId}
        />
      )}
    </div>
  );
}

export default ListHeader;
