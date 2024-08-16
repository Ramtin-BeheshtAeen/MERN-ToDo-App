import { useEffect, useState, React } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [task, setTask] = useState(null);

  const userId = cookies.UserId;
  const authToken = cookies.AuthToken;

  async function getData() {
    try {
      const response = await fetch(`http://localhost:8000/todo/${userId}`);
      const json = await response.json();
      setTask(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData();
    }}
  , [] );

  //Sort Tasks By Date:
  // if they exist:
  const sortedTasks = task?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  console.log(sortedTasks);

  return (
    <div className="app">
      {!authToken && <Auth />}

      {authToken && (
        <>
          <ListHeader
            listName={"Holiday Tick List"}
            userId={userId}
            getData={getData}
          />
          {sortedTasks?.map((task) => (
            <ListItem
              key={task._id}
              task={task}
              userId={userId}
              getData={getData}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
