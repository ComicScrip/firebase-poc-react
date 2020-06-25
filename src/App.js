import React, { useState } from 'react';
import './App.css';
import {firebase, messaging} from './services/firebase'
import { useEffect } from 'react';
import moment from 'moment'
const fb = firebase;

messaging.onMessage((payload) => console.log('Message received. ', payload));

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskName, setNewTaskName] = useState('')

  useEffect(() => {
    messaging.requestPermission()
    .then(async function() {
      const token = await messaging.getToken();
      console.log(token)
    })
    .catch(function(err) {
      console.log("Unable to get permission to notify.", err);
    });
    navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  }, [])
  
  useEffect(() => {
    const unsubscribe = fb.firestore().collection('tasks').orderBy('createdAt', 'desc').onSnapshot(s => {
      setTasks(s.docs.map(task => {
        return {id: task.id, ...task.data()}
      }))
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fb.firestore().collection('tasks').add({
      name: newTaskName,
      done: true,
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      setNewTaskName('')
    })
  }

  const toggleTask = (t) => {
    fb.firestore().collection('tasks').doc(t.id).update({
      done: !t.done
    })
  }

  const deleteTask = (t) => {
    fb.firestore().collection('tasks').doc(t.id).delete().then(() => {
      console.log('task deleted')
    }).catch((err) => {
      console.error('an error has occured while deleting this task', err)
    })
  }
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="new task name" onChange={e => setNewTaskName(e.target.value)} value={newTaskName} />
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Done</th>
            <th>Creation date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => <tr key={t.id}>
            <td>{t.name}</td>  
            <td><input type="checkbox" checked={t.done} onChange={() => toggleTask(t)} /></td>  
            <td>{t.createdAt && moment.unix(t.createdAt.seconds).format('DD/MM/YYYY HH:mm:ss')}</td>  
            <td><button onClick={() => deleteTask(t)} >Delete</button></td>  
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default App;