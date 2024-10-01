import React from 'react';
const TodoItem = ({ task, toggleTaskStatus, deleteTask }) => {
return (
<li>
<input
type="checkbox"
checked={task.completed}
onChange={() => toggleTaskStatus(task.id)}
/>
<span>{task.task}</span>
<delete>
<button onClick={() =>
deleteTask(task.id)}>⛔Delete</button>
</delete>
</li>
);
};
export default TodoItem;