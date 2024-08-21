import { useEffect, useState, React } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import MyTabs from "./components/Ui/Tabs";


function App() {
  // const [listName, setListName] = useState('')
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

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  useEffect(() => {
    console.log("Tasks state updated:", task); // Log the state whenever it changes
  }, [task]);

  const sortedTasks = task?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  console.log("tasks:", sortedTasks);

  return (
    <div className="app">
      {!authToken && <Auth />}

      {authToken && (
        <div>

          <ListHeader
            listName={name + "Tick List"}
            userId={userId}
            getData={getData}
          />
          
          <br/>

          <div className="button-container">
            <button className="primary-button" onClick={() => setShowAll(true)} >
              Show All Tasks
            </button>
            <button className="primary-button"  onClick={() => setShowAll(false)}>
              Eisenhower Matrix
            </button>
          </div>

          <br/>

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
      )}
    </div>
  );
}

export default App;
