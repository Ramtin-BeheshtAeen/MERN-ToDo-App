import { useEffect, useState, React } from "react";
import { createPortal } from "react-dom";
import { useCookies } from "react-cookie";
import { usePopper } from 'react-popper';

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import GroupModel from "./components/ContainerModel";
import ListModel from "./components/ListModel";
import MyTabs from "./components/Ui/Tabs";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function App() {
  const { collapseSidebar } = useProSidebar();
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  
  const { styles, attributes } = usePopper(referenceElement, popperElement, {placement:"bottom"})
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

  async function getData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/tasks/${userId}`
      );
      const json = await response.json();
      setTask(json);
    } catch (err) {
      console.log(err);
    }
  }

  async function getSpecificListData({ listId }) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/tasks/${userId}` /
          `${listId}`
      );
      const json = await response.json();
      setTask(json);

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
    setCurrentListId(listId);
    setCurrentListName(listName);
    setCurrentListContainerId(listContainerId);
    setShowEditListModel(true);
  }

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const makeNewContainer = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
    collapseSidebar();
  };

  useEffect(() => {
    if (authToken) {
      getData();
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
        <div className={`app ${isNavbarOpen ? "blurred" : ""}`}>
          <div className="side-bar">
            <Sidebar style={{ height: "90vh" }}>
              <Menu>
                <MenuItem
                  icon={<MenuOutlinedIcon />}
                  onClick={toggleNavbar}
                  style={{ textAlign: "center" }}>
                  {" "}
                  <h4>Admin</h4>
                </MenuItem>

                <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
                <hr />

                {containers.map((container, index) => (
                  <SubMenu label={container.name} icon={<LibraryBooksIcon />}>
                    {container.lists.map((list, index) => (
                      <MenuItem icon={<ViewListIcon />}>
                        <div onClick={() => getListData(list._id)} ref={setReferenceElement}>
                          {list.name}

                          <MoreVertIcon onClick={togglePopup}/>
                          {showPopup &&
                            createPortal(
                              <div class="options" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                              
                                <div class="option">
                                  <EditIcon
                                    fontSize="lg"
                                    onClick={() =>
                                      editList(
                                        list._id,
                                        list.name,
                                        container._id
                                      )
                                    }
                                  /> Edit 
                                </div>

                                <div class="option">
                                  <DeleteOutlineIcon fontSize="lg" />
                                  Delete
                                </div>
                              </div>, document.body
                            )}
                        </div>
                      </MenuItem>
                    ))}
                  </SubMenu>
                ))}

                <div
                  style={{
                    display: "flex",
                    marginTop: "90hv",
                    position: "absolute",
                    bottom: "0",
                  }}>
                  <MenuItem onClick={() => setShowCreateListModel(true)}>
                    + New List
                  </MenuItem>
                  <MenuItem onClick={() => setShowGroupModel(true)}>
                    New Group
                  </MenuItem>
                </div>
                <br></br>
              </Menu>
            </Sidebar>
          </div>

          {(!isNavbarOpen || !isMobile) && (
            <div className="tasks-container">
              <ListHeader
                listName={name + "Tick List"}
                userId={userId}
                getData={getData}
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
                      getData={getData}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <MyTabs
                    tasks={sortedTasks}
                    userId={userId}
                    getData={getData}
                  />
                </div>
              )}

              {showGroupModel && (
                <GroupModel
                  element={"Group"}
                  mode={"create"}
                  setShowModel={setShowGroupModel}
                  userId={userId}
                  getData={getData}
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
                  getData={getData}
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
                  getData={getData}
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
