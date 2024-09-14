import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ListItem from "./ListItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function MyTabs({ tasks, userId, getData }) {
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(tasks);

  const [value, setValue] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterTasks = (urgency, priority) => {
    return tasks.filter(
      (task) => task.urgency === urgency && task.priority === priority
    );
  };

  return (
    <div>
      <Box className="task-header-box">
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? "scrollable": "fullWidth" }
          className={isMobile ? "mobile-tabs" : " "}
          aria-label="basic tabs example">
          <Tab label="Do" />
          <Tab label="Delegate" />
          <Tab label="Schedule" />
          <Tab label="Delete" />
        </Tabs>

        <TabPanel value={value} index={0}>
          {filterTasks("Urgent", "High").map((task) => (
            <ListItem
              text={"Urgent & Important Tasks:"}
              key={task._id}
              task={task}
              userId={userId}
              getData={getData}
            />
          ))}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {filterTasks("Urgent", "Low").map((task) => (
            <ListItem
              text={"Urgent & Not Important Tasks:"}
              key={task._id}
              task={task}
              userId={userId}
              getData={getData}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {filterTasks("Not Urgent", "High").map((task) => (
            <ListItem
            text={'Not Urgent & Important Tasks:'}
              key={task._id}
              task={task}
              userId={userId}
              getData={getData}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {filterTasks("Not Urgent", "Low").map((task) => (
            <ListItem
            text={'Not Urgent & Not Important Tasks:'}
              key={task._id}
              task={task}
              userId={userId}
              getData={getData}
            />
          ))}
        </TabPanel>
      </Box>
    </div>
  );
}

export default MyTabs;
