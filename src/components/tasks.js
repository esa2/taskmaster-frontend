import React, {useState, useEffect} from 'react'
import '../app.scss'
import Upload from './upload'
// import mockData from '../mock.json';

const API = 'http://taskmaster-dev-esa.us-west-2.elasticbeanstalk.com/tasks'
// const API = 'http://localhost:5000/tasks'

function Tasks() {
  const [tasks, setTasks] = useState([])

  const getTasks = () => {
    // setTasks(mockData)
    fetch(API, {mode:'cors'})
    .then(data => data.json())
    .then(json => setTasks(json))
    .catch(console.error);
   }

  useEffect(getTasks, [])
  return (

    <div>
      <ul>
        <li>
      <section className="section-spans">
        <span className="header-span">Title</span>
        <span className="header-span">Description</span>
        <span className="header-span">Assignee</span>
        <span className="header-span">Status</span>
        <span className="header-span">Upload image</span>
        <span className="header-span">View image</span>
      </section>
      </li>
      </ul>
    <ul>
        {tasks.map((task) => 
    <li key={task.id}>
      <div>
        <span>{task.title}</span>
        <span>{task.description}</span>
        <span>{task.assignee}</span>
        <span>{task.status}</span>
        <Upload id={task.id}></Upload>
        {task.taskfile === null ? <span>no image</span> : (
          <span>
          <a href={task.taskfile}>
                <img src={task.taskfile} alt="" height="45" width="45"></img>
                </a>
                </span>
              )}
        </div>
      </li>
    )}
    </ul>
    </div>

  )
}

export default Tasks;
