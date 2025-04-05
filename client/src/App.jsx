import { useEffect, useState } from "react";
import Task from "./Task";
import "./task.css";

export default function App() {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:1000/");
        const data = await res.json();
        setTaskList(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    const trimmedTask = taskInput.trim();
    if (!trimmedTask) {
      alert("No empty task is allowed");
      return;
    }

    const newTask = { task: trimmedTask };

    try {
      const res = await fetch("http://localhost:1000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (res.ok) {
        setTaskList((prev) => [...prev, newTask]);
        setTaskInput("");
      } else {
        console.log("Failed to add task");
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const renderTasks = taskList.map((task) => (
    <Task
      key={task.taskId}
      index={task.taskId}
      taskArray={taskList}
      setTaskArray={setTaskList}
      item={task.task}
      completedTasks={completedCount}
      setCompletedTasks={setCompletedCount}
    />
  ));

  return (
    <div className="container">
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter your task"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>

      {renderTasks}

      {taskList.length > 0 && (
        <p>{`${completedCount} / ${taskList.length} tasks completed`}</p>
      )}
    </div>
  );
}
