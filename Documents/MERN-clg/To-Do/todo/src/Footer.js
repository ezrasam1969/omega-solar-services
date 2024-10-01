import React from 'react';
const Footer = ({ taskCount, clearCompleted, filterTasks }) => {
return (
<div>
<span>{taskCount} Items Left</span>
<button onClick={clearCompleted}>Clear
Completed</button>
<button onClick={() => filterTasks('all')}>📋All</button>
<button onClick={() => filterTasks('active')}>🟢 Active</button>
<button onClick={() =>
filterTasks('completed')}> ✅️Completed</button>
</div>
);
};
export default Footer;