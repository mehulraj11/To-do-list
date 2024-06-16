import React, { useState } from "react";
import "./task.css";

const Task = ({
  taskArray,
  setTaskArray,
  item,
  index,
  setCompletedTasks,
  completedTasks,
}) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState("");

  const handleClick = () => {
    setCheckboxValue(!checkboxValue);
    if (checkboxValue) {
      setCompletedTasks(completedTasks - 1);
    } else {
      setCompletedTasks(completedTasks + 1);
    }
  };

  const deleteTask = (taskIndex) => {
    const updatedTaskArray = [...taskArray];
    const filtered = updatedTaskArray.filter(
      (item, index) => index !== taskIndex
    );
    setTaskArray(filtered);
    console.log(index + " has been deleted");
  };

  const handleEditChange = (e) => {
    setEditedTask(e.target.value);
  };
  const handleEditClick = () => {
    setIsEditing(true);
    console.log(isEditing);
    setEditedTask(item);
  };
  const handleSave = (index) => {
    if (editedTask) {
      const updatedTaskArray = [...taskArray];
      updatedTaskArray[index] = editedTask;
      setTaskArray(updatedTaskArray);
      setIsEditing(false);
    } else {
      alert(`Enter task`);
    }
  };
  function handleClear() {
    setEditedTask("");
  }
  return (
    <div className="task">
      <input type="checkbox" checked={checkboxValue} onChange={handleClick} />
      {isEditing ? (
        <input type="text" value={editedTask} onChange={handleEditChange} />
      ) : (
        <p>{item}</p>
      )}
      {isEditing ? (
        <button onClick={() => handleSave(index)}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
      {isEditing ? (
        <button onClick={handleClear}>Clear</button>
      ) : (
        <button onClick={() => deleteTask(index)}>Delete</button>
      )}
    </div>
  );
};

export default Task;
