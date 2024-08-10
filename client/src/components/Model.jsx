import { React, useState } from "react";
import DateTimePicker from "./Form/DateTimePicker";
import RadioButtonGroup from "./Form/RadioButtonGroup";
import dayjs from "dayjs";

const Model = () => {
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

  const [data, setData] = useState({
    _id: "",
    title: "",
    dueDate: selectedDate.format('YYYY-MM-DD'),
    dueTime: selectedTime.format('HH:mm'),
    priority: priority,
    urgency: urgency,
    status: "",
    createdAt: mode === 'create' ? dayjs().format() : undefined,
    updatedAt: " ",
  })


  const handleChange = () => {};

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

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Model;
