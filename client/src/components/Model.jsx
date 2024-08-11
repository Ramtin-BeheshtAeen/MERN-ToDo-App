import { React, useState, useEffect } from "react";
import DateTimePicker from "./Form/DateTimePicker";
import RadioButtonGroup from "./Form/RadioButtonGroup";
import dayjs from "dayjs";

const Model = ({mode, setShowModel, getData, userId, existingData}) => {

  const [title, setTitle] = useState('')

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const [urgency, setUrgency] = useState("Urgent"); 
  const [priority, setPriority] = useState("High");

  useEffect(() => {
    if (mode === 'edit' && existingData) {
      setTitle(existingData.title);
      setSelectedDate(dayjs(existingData.dueDate));
      setSelectedTime(dayjs(existingData.dueTime));
      setUrgency(existingData.urgency);
      setPriority(existingData.priority);
    }
  }, [mode, existingData]);

  const handleTitleChange = (e) => {
    const {name, value} = e.target
    setTitle(value)
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const handleUrgencyChange = (event) => {
    setUrgency(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const urgencyOptions = [
    { value: "Urgent", label: "Urgent" },
    { value: "Not Urgent", label: "Not Urgent" },
  ];

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "High", label: "High" },
  ];

 
  const editMode = mode === 'edit' ? true : false

  const handleSubmit = async (e) => {
    e.preventDefault()
    const baseData = {
        // _id: userId,
        title: title,
        dueDate: selectedDate.format('YYYY-MM-DD'),
        dueTime: selectedTime.format('HH:mm'),
        priority: priority,
        urgency: urgency,
      };

      const formData = editMode
        ?  { ...baseData, updatedAt: dayjs().format() }
        :  { ...baseData, status: "Pending", createdAt: dayjs().format() }

      
    //   console.log('Form Data:', formData);
      try {
        const response = await fetch(`http://localhost:8000/post-to-do/${userId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        // Use 200 OK for general success responses.
        // Use 201 Created when a new resource has been created successfully.
        if (response.status === 201) {
            
            setShowModel(false)
            getData()
        }
      }catch(err){
        console.log(" \n error in Model.jsx/ line 76 \n")
        console.log(err)
      }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const baseData = {
        // _id: userId,
        title: title,
        dueDate: selectedDate.format('YYYY-MM-DD'),
        dueTime: selectedTime.format('HH:mm'),
        priority: priority,
        urgency: urgency,
      };

      const formData = editMode
        ?  { ...baseData, updatedAt: dayjs().format() }
        :  { ...baseData, status: "Pending", createdAt: dayjs().format() }

      
    //   console.log('Form Data:', formData);
      try {
        const response = await fetch(`http://localhost:8000/edit-to-do/${userId}/${existingData._id}`, {
            method: "Put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        // Use 200 OK for general success responses.
        // Use 201 Created when a new resource has been created successfully.
        if (response.status === 200) {
            
            setShowModel(false)
            getData()
        }
      }catch(err){
        console.log(" \n error in Model.jsx/ line 76 \n")
        console.log(err)
      }
  };


  return (
    <div className="overlay">
      <div className="model">
        <div className="form-title-container">
          <h3>Let's {mode} a Task</h3>
          <button  onClick={()=>(setShowModel(false))}> X </button>
        </div>

        <form>
          <input
            required
            maxLength={100}
            placeholder="Task Name"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />

          <br />
          <label for="range"> </label>
          <div className="form-radio-datepicker-container">
            <RadioButtonGroup
              label="Select Urgency"
              options={urgencyOptions}
              selectedValue={urgency}
              onChange={handleUrgencyChange}
            />
            <RadioButtonGroup
              label="Select Priority"
              options={priorityOptions}
              selectedValue={priority}
              onChange={handlePriorityChange}
            />
            <DateTimePicker
              id="date"
              timeLabel="Select Due Time"
              dateLabel="Select Due Date"
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={handleDateChange}
              onTimeChange={handleTimeChange}
            />
          </div>
          <br />

          <input type="submit" onClick={ editMode ? handleEditSubmit : handleSubmit}/>
        </form>
      </div>
    </div>
  );
};

export default Model;
