import { useEffect, useState, React } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import MyTabs from "./components/Ui/Tabs";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function App() {
  const { collapseSidebar } = useProSidebar();
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [task, setTask] = useState([]); // Initialize as an empty array
  const [showAll, setShowAll] = useState(true);

  const userId = cookies.UserId;
  const authToken = cookies.AuthToken;
  const name = cookies.Name;

  async function getData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/todo/${userId}`
      );
      const json = await response.json();
      console.log("Fetched data:", json); // Log the fetched data
      setTask(json);
    } catch (err) {
      console.log(err);
    }
  }

  const makeNewList = async () => {
    try {
      
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  useEffect(() => {
    console.log("Tasks state updated:", task); // Log the state whenever it changes
  }, [task]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedTasks = task?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  console.log("tasks:", sortedTasks);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
    collapseSidebar();
  };

  return (
    <div>
      {!authToken &&  <div className="auth-outer-container"><Auth /></div>}

      {authToken && (!isNavbarOpen || !isMobile) && (
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
                <div
                  style={{
                    display: "flex",
                    marginTop: "90hv",
                    position: "absolute",
                    bottom: "0",
                  }}>
                  <MenuItem onClick={makeNewList}>+ New List</MenuItem>
                  <MenuItem  onClick={makeNewGroup}>New Group</MenuItem>
                </div>
                <br></br>
              </Menu>
            </Sidebar>
          </div>

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
                <MyTabs tasks={sortedTasks} userId={userId} getData={getData} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
