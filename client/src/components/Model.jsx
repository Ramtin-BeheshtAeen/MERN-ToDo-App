import { React, useState } from "react";
import DateTimePicker from "./Form/DateTimePicker";
import RadioButtonGroup from "./Form/RadioButtonGroup";
import dayjs from "dayjs";

const Model = ({userId}) => {
  const mode = "Create";

  const [title, setTitle] = useState('')

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const [urgency, setUrgency] = useState("Urgent"); 
  const [priority, setPriority] = useState("High");

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
        :  { ...baseData, status: "pending", createdAt: dayjs().format() }

      
    //   console.log('Form Data:', formData);
      try {
        const response = await fetch(`http://localhost:8000/post-to-do/${userId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        console.log(response)
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
          <button> X </button>
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

          <input type="submit" onClick={ editMode ? "" : handleSubmit}/>
        </form>
      </div>
    </div>
  );
};

export default Model;
