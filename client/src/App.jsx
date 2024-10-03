import { useEffect, useState,useRef, React } from "react";
import { useCookies } from "react-cookie";

// import "./assets/dark-index.css"; // Ensure you import your CSS file

import ListHeader from "./components/Ui/ListHeader";
import ListItem from "./components/Ui/ListItem";
import Auth from "./components/Ui/Auth";
import GroupModel from "./components/Ui/ContainerModel";
import ListModel from "./components/Ui/ListModel";
import MyTabs from "./components/Ui/Tabs";
import SideBar from "./components/Ui/SideBar";
import DeleteModel from "./components/Ui/DeleteModel";

function App() {
  //////////////////////////////////////////////////////////////////////////////
  ///// Use States //////
  //////////////////////////////////////////////////////////////////////////////
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [task, setTask] = useState([]);
  const [containers, setContainers] = useState([]);
  const [showAll, setShowAll] = useState(true);

  //Use This For Fetching the Data Of The List
  const [currentListId, setCurrentListId] = useState("");
  //Use This For Editing/Deleting The List

  const currentListIdRef = useRef(null);
  const currentListNameRef = useRef(null);
  const currentListContainerIdRef = useRef(null);

  const [showEditListModel, setShowEditListModel] = useState(false);
  const [showCreateListModel, setShowCreateListModel] = useState(false);

  const [showDeleteModel, setShowDeleteModel] = useState(false);

  const [showGroupModel, setShowGroupModel] = useState(false);

  //////////////////////////////////////////////////////////////////////////////
  ///// Const //////
  //////////////////////////////////////////////////////////////////////////////
  const userId = cookies.UserId;
  const authToken = cookies.AuthToken;
  const name = cookies.Name;

  //////////////////////////////////////////////////////////////////////////////
  ///// Functions //////
  //////////////////////////////////////////////////////////////////////////////

  async function getTasksInList() {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_SERVER_URL
        }/tasks/${userId}/${currentListId}`
      );
      const json = await response.json();
      setTask(json);
    } catch (err) {
      console.log(err);
    }
  }

  async function getContainers() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/containers/${userId}`
      );
      const json = await response.json();
      console.log("Fetched data:", json); // Log the fetched data
      setContainers(json);
    } catch (err) {
      console.log("Error While Getting Container And List Data: \n" + err);
    }
  }

  function editList(listId, listName, listContainerId) {
    console.log("Edit List");
    currentListIdRef.current = listId;
    currentListNameRef.current = listName;
    currentListContainerIdRef.current = listContainerId;
    setShowEditListModel(true);
    console.log("Test", currentListIdRef.current, currentListNameRef.current, currentListContainerIdRef.current);
  }

  function deleteList(listId, listName, listContainerId) {
    console.log("Edit List");
    currentListIdRef.current = listId
    currentListNameRef.current = listName
    currentListContainerIdRef.current = listContainerId;
    setShowDeleteModel(true);
  }

  // const [isDarkMode, setIsDarkMode] = useState(false);

  // // Toggle the theme
  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  // // Apply the theme class to the body
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }
  // }, [isDarkMode]);

  const makeNewContainer = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getTasksInList();
      getContainers();
    }
  }, [authToken]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        collapseSidebar();
      }
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedTasks = Array.isArray(task)
    ? task.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    : [];

  console.log("tasks:", sortedTasks);
  console.log("containers:", containers);

  return (
    <div>
      {!authToken && (
        <div className="auth-outer-container">
          <Auth />
        </div>
      )}
      {/* //(!isNavbarOpen || !isMobile) && */}

      {authToken && (
        /* <div className={`app ${isDarkMode ? "dark-mode" : ""}`}> */
        <div className="app">
          <div className="side-bar">
            <SideBar
              setCurrentListId={setCurrentListId}
              isNavbarOpen={isNavbarOpen}
              setIsNavbarOpen={setIsNavbarOpen}
              containers={containers}
              setShowCreateListModel={setShowCreateListModel}
              setShowGroupModel={setShowGroupModel}
              editList={editList}
              deleteList={deleteList}
              getTasksInList={getTasksInList}
            />
          </div>

          {(!isNavbarOpen || !isMobile) && (
            <div className="tasks-container">
              <ListHeader
                listName={name + "Tick List"}
                userId={userId}
                listId={currentListId}
                getData={getTasksInList}
                // toggleTheme={toggleTheme}
                // isDarkMode={isDarkMode}
              />

              <br />

              <div className="button-container">
                <button
                  className="primary-button"
                  onClick={() => setShowAll(true)}>
                  Show All Tasks
                </button>
                <button
                  className="primary-button"
                  onClick={() => setShowAll(false)}>
                  Eisenhower Matrix
                </button>
              </div>

              <br />

              {showAll ? (
                <div>
                  {sortedTasks?.map((task) => (
                    <ListItem
                      key={task._id}
                      task={task}
                      userId={userId}
                      getData={getTasksInList}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <MyTabs
                    tasks={sortedTasks}
                    userId={userId}
                    getData={getTasksInList}
                  />
                </div>
              )}

              {/* //Create New Container */}
              {showGroupModel && (
                <GroupModel
                  element={"Group"}
                  mode={"create"}
                  setShowModel={setShowGroupModel}
                  userId={userId}
                  getData={getTasksInList}
                />
              )}

              {/* //Edit the Current List */}
              {showEditListModel && (
                <ListModel
                  containers={containers}
                  listId={currentListIdRef.current}
                  element={"List"}
                  mode={"edit"}
                  setShowModel={setShowEditListModel}
                  userId={userId}
                  getData={getTasksInList}
                  listName={currentListNameRef.current}
                  currentListContainerId={currentListContainerIdRef.current}
                  
                />
              )}

              {/* //Make New List */}
              {showCreateListModel && (
                <ListModel
                  containers={containers}
                  element={"List"}
                  mode={"create"}
                  setShowModel={setShowCreateListModel}
                  userId={userId}
                  getData={getTasksInList}
                  listName={currentListNameRef.current}
                  currentListContainerId={currentListContainerIdRef.current}
                />
              )}

              {showDeleteModel && (
                <DeleteModel
                  setShowModel={setShowDeleteModel}
                  userId={userId}
                  listId={currentListIdRef.current}
                  listName={currentListNameRef.current}
                />
              )}

            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
