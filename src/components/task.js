import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./Task.css";

const Task = () => {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [currTask, setCurrTask] = useState({ title: "", id: "" });
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    fetchtask();
  }, []);

  useEffect(() => {
    if (currTask.id !== "") {
      EditTask();
    }
    // eslint-disable-next-line
  }, [currTask]);

  const fetchtask = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/task`);
      // console.log(response.data);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const createTask = async () => {
    setUpdateMode(false);
    try {
      await axios.post(`${process.env.REACT_APP_API}/task`, {
        newTask,
      });

      await fetchtask();

      setNewTask("");
    } catch (error) {
      console.error("Error creating Task:", error);
    }
  };

  const EditTask = async () => {
    try {
      const id = currTask.id;
      const title = currTask.title;
      await axios.put(`${process.env.REACT_APP_API}/task/${id}`, {
        title,
      });
      await fetchtask();
    } catch (error) {
      console.error("Error deleting Task:", error);
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/task/${id}`);
      await fetchtask();
    } catch (error) {
      console.error("Error deleting Task:", error);
    }
  };

  const toggleisCompleted = async (id, isCompleted) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API}/task/${id}`, {
        isCompleted: !isCompleted,
      });
      await fetchtask();
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  return (
    <div className="task">
      <h1>To-Do-List</h1>

      <div className="task-form">
        <input
          type="text"
          className="createTask"
          placeholder="Try Typing 'Pay Utility bill by Friday 6pm'"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={createTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`task-item ${task.isCompleted ? "completed" : ""}`}
          >
            <div className="checkbox-title">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleisCompleted(task._id, task.isCompleted)}
              />
              {updateMode ? (
                <input
                  type="text"
                  className="editTask"
                  onChange={(e) => {
                    setCurrTask({ title: e.target.value, id: task._id });
                  }}
                />
              ) : (
                <input
                  type="text"
                  className="editTask"
                  value={task.title}
                  onChange={(e) => {
                    setUpdateMode(true);
                    setCurrTask({ title: e.target.value, id: task._id });
                  }}
                />
              )}
            </div>
            <div className="task-buttons">
              <button onClick={() => deleteTask(task._id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
