import { useEffect, useState, React } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import ListAndGroupModel from "./components/ListAndGroupModel";

import { useCookies } from "react-cookie";
import MyTabs from "./components/Ui/Tabs";
import { Sidebar, Menu, MenuItem,SubMenu, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function App() {
  const { collapseSidebar } = useProSidebar();

  //////////////////////////////////////////////////////////////////////////////
  ///// Use States //////
  //////////////////////////////////////////////////////////////////////////////
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [task, setTask] = useState([]);
  const [containers, setContainers] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const [showListModel, setShowListModel] = useState(false);
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
      console.log(json);

      setTask(json);
    } catch (err) {
      console.log(err);
    }
  }

  async function getSpecificListData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/tasks/${userId}`
      );
      const json = await response.json();
      console.log(json);

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

  const sortedTasks = task?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

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
                  <SubMenu label={container.name}>
                    {" "}
                    {container.lists.map((list, index) => (
                      <MenuItem>{list.name}</MenuItem>
                    ))}{" "}
                  </SubMenu>
                ))}

                <div
                  style={{
                    display: "flex",
                    marginTop: "90hv",
                    position: "absolute",
                    bottom: "0",
                  }}>
                  <MenuItem onClick={() => setShowListModel(true)}>
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
                <ListAndGroupModel
                  element={"Group"}
                  mode={"create"}
                  setShowModel={setShowGroupModel}
                  userId={userId}
                  getData={getData}
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
