import { useState } from "react";
import "./task.css";

const Task = ({
  item,
  index,
  taskArray,
  setTaskArray,
  completedTask,
  setCompletedTasks,
}) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(item);

  const deleteTask = async (e, taskIndex) => {
    e.preventDefault();
    console.log(taskIndex);

    try {
      const res = await fetch(`http://localhost:1000/${taskIndex}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTaskArray((prevArray) =>
          prevArray.filter((item) => item.taskId !== taskIndex)
        );
        setCompletedTasks((prev) => prev - 1);
        console.log("Task deleted");
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };
  const editTask = (e) => {
    setIsEditing(!isEditing);
  };
  const handleEditChange = (e) => {
    setEditedTask(e.target.value);
  };
  const handleSave = async (e, taskId) => {
    if (!editedTask.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      const response = await fetch(`http://localhost:1000/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: editedTask }),
      });

      if (response.ok) {
        const updatedTask = await response.json();

        setTaskArray((prevArray) =>
          prevArray.map((task) =>
            task.taskId === taskId ? { ...task, task: updatedTask.task } : task
          )
        );
        setIsEditing(false);
      } else {
        console.log("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleCheckBoxClick = (e) => {
    const isChecked = e.target.checked;
    setCheckboxValue(isChecked);

    if (isChecked) {
      setCompletedTasks((prev) => prev + 1);
    } else {
      setCompletedTasks((prev) => prev - 1);
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={checkboxValue}
        onChange={handleCheckBoxClick}
      />
      {isEditing ? (
        <input
          className="task"
          value={editedTask}
          onChange={handleEditChange}
        ></input>
      ) : (
        <p key={index}>{item}</p>
      )}
      {isEditing ? (
        <>
          <button className="edit" onClick={(e) => handleSave(e, index)}>
            Save
          </button>
          <button className="delete" onClick={() => handleCancel()}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className="edit" onClick={(e) => editTask(e, index)}>
            Edit
          </button>
          <button className="delete" onClick={(e) => deleteTask(e, index)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Task;
