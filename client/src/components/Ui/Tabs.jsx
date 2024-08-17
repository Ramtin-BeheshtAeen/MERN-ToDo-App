import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ListItem from "../ListItem";


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
  console.log(tasks)
  
  const [value, setValue] = useState(0);

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
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example">
        <Tab label="Urgent & Important" />
        <Tab label="Urgent & Not Important" />
        <Tab label="Not Urgent & Important" />
        <Tab label="Not Urgent & Not Important" />
      </Tabs>

      <TabPanel value={value} index={0}>
        {filterTasks("Urgent", "High").map((task) => (
          <ListItem key={task._id} task={task} userId={userId}
                getData={getData} />
        ))}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {filterTasks("Urgent", "Low").map((task) => (
          <ListItem key={task._id} task={task} userId={userId}
                getData={getData} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {filterTasks("Not Urgent", "High").map((task) => (
          <ListItem key={task._id} task={task} userId={userId}
                getData={getData} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {filterTasks("Not Urgent", "Low").map((task) => (
          <ListItem key={task._id} task={task} userId={userId}
                getData={getData}/>
        ))}
      </TabPanel>
    </div>
  );
}

export default MyTabs;
