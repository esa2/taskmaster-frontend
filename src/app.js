import React, {useState, useEffect} from 'react';
import './app.scss';
import mockData from './mock.json';

console.log(mockData)

function Tasks() {
  const [tasks, setTasks] = useState([])

  const getTasks = () => {
    setTasks(mockData)
  }

  useEffect(getTasks, [])
return (
  
  <ul>
    <th>
      <td>Title</td>
      <td>Description</td>
      <td>Assignee</td>
      <td>Status</td>
    </th>
      {tasks.map((task) => 
   <li key={task.id}>
     <div>
       <span>{task.title}</span>
       <span>{task.description}</span>
       <span>{task.assignee}</span>
       <span>{task.status}</span>
      </div>
    </li>
   )}
  </ul>
)
}

function App() {
  return (
   <>
   <header>Task Master</header>
   <main>
     <Tasks></Tasks>
   </main>
   <footer></footer>
   </>
  );
}

export default App;
