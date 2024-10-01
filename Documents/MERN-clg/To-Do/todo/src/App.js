import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './styles.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // State to manage the filter

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), task, completed: false }]);
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filterTasks = (status) => {
    setFilter(status);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' case
  });

  return (
    <div className="App">
      <div
      style={{
        backgroundImage: "url('/pexels-pixabay-314726.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <header className="App-header">
        <Header />
        <TodoForm addTask={addTask} />
        <TodoList tasks={filteredTasks} toggleTaskStatus={toggleTaskStatus} deleteTask={deleteTask} />
        <Footer 
          taskCount={tasks.filter(task => !task.completed).length} 
          clearCompleted={clearCompleted} 
          filterTasks={filterTasks} 
        />
        
      </header>
      </div>
    </div>
  );
}

export default App;