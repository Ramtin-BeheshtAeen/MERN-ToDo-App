import { useEffect, useState, React } from "react";
import { useCookies } from "react-cookie";

import "./assets/dark-index.css"; // Ensure you import your CSS file



import ListHeader from "./components/Ui/ListHeader";
import ListItem from "./components/Ui/ListItem";
import Auth from "./components/Ui/Auth";
import GroupModel from "./components/Ui/ContainerModel";
import ListModel from "./components/Ui/ListModel";
import MyTabs from "./components/Ui/Tabs";
import SideBar from "./components/Ui/SideBar";

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

  const [currentListId, setCurrentListId] = useState("");
  const [currentListName, setCurrentListName] = useState("");
  const [currentListContainerId, setCurrentListContainerId] = useState("");

  const [showEditListModel, setShowEditListModel] = useState(false);
  const [showCreateListModel, setShowCreateListModel] = useState(false);

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
        `${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/tasks/${userId}/${currentListId}`
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
    console.log("Edit List")
    setCurrentListId(listId);
    setCurrentListName(listName);
    setCurrentListContainerId(listContainerId);
    setShowEditListModel(true);
  }


  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply the theme class to the body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

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
    <div >
      {!authToken && (
        <div className="auth-outer-container">
          <Auth />
        </div>
      )}
      {/* //(!isNavbarOpen || !isMobile) && */}

      {authToken && (
        <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        
          <div className="side-bar">
            <SideBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
              containers={containers}
              setShowCreateListModel={setShowCreateListModel}
              setShowGroupModel={setShowGroupModel}
              editList={editList}
              getTasksInList={getTasksInList}
            />
          </div>


          {(!isNavbarOpen || !isMobile) && (
            <div className="tasks-container">
              <ListHeader
                listName={name + "Tick List"}
                userId={userId}
                getData={getTasksInList}
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
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

              {showGroupModel && (
                <GroupModel
                  element={"Group"}
                  mode={"create"}
                  setShowModel={setShowGroupModel}
                  userId={userId}
                  getData={getTasksInList}
                />
              )}

              {showEditListModel && (
                <ListModel
                  containers={containers}
                  listId={currentListId}
                  element={"List"}
                  mode={"edit"}
                  setShowModel={setShowEditListModel}
                  userId={userId}
                  getData={getTasksInList}
                  listName={currentListName}
                  currentListContainerId={currentListContainerId}
                />
              )}

              {showCreateListModel && (
                <ListModel
                  containers={containers}
                  listId={currentListId}
                  element={"List"}
                  mode={"create"}
                  setShowModel={setShowCreateListModel}
                  userId={userId}
                  getData={getTasksInList}
                  listName={currentListName}
                  currentListContainerId={currentListContainerId}
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
