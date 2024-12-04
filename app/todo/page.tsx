'use client';
import { useState, useEffect } from 'react';

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTasks = [
        ...tasks,
        { id: Date.now(), text: newTask, completed: false },
      ];
      setTasks(newTasks);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTaskId(taskId);
    setEditTaskText(taskToEdit.text);
  };

  const handleSaveEditTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, text: editTaskText } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskText('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Todo App</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            padding: '10px',
            width: 'calc(100% - 120px)',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: '10px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Task
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              backgroundColor: task.completed ? '#d3d3d3' : '#fff',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  style={{ flex: 1, padding: '5px', marginRight: '10px' }}
                />
                <button
                  onClick={handleSaveEditTask}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    flex: 1,
                  }}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: task.completed ? 'orange' : 'blue',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  {task.completed ? 'Incomplete' : 'Complete'}
                </button>
                <button
                  onClick={() => handleEditTask(task.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'purple',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;