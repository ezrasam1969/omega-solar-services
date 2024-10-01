import React, { useState } from 'react';
import './styles.css'
const TodoForm = ({ addTask }) => {
const [task, setTask] = useState('');
const handleSubmit = (e) => {
e.preventDefault();
if (task.trim()) {
addTask(task);
setTask('');
}
};
return (
<form onSubmit={handleSubmit}>
<input
type="text"
value={task}
onChange={(e) => setTask(e.target.value)}
placeholder="Add new task"
/>
<button class="add-task-btn" type="submit">➕ Add Task</button>
</form>
);
};
export default TodoForm;
