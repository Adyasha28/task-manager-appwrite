import React, { useState } from 'react'
import { COLLECTION_ID, DATABASE_ID } from '../appwrite/constants'
import { databases } from '../appwrite/config'
import Check from '../images/icon-check.svg'

import { AiOutlineClose } from 'react-icons/ai'
import styles from './AllTask.module.css'



const Tasks = ({ fetchTasks, tasks } ) => { 


  const [activeClass, setactiveClass] = useState({
    all: true,
    active: false,  
    completed: false
  })


  const toggleCompleted = (task) => {
    const promise = databases.updateDocument(DATABASE_ID, COLLECTION_ID, task.$id , {
      isCompleted: !task.isCompleted
    })
    
    promise.then(function (response) {
      console.log(response); // Success
      fetchTasks()
    }
    , function (error) {
      console.log(error); // Failure
    });
  }

  const deleteTask = (task) => {
    const promise = databases.deleteDocument(DATABASE_ID, COLLECTION_ID, task.$id)
    
    promise.then(function (response) {
      console.log(response); // Success
      fetchTasks()
    }, function (error) {
      console.log(error); // Failure
    });
  }

  const changeActiveClass = (type) => {
    setactiveClass({
      all: false,
      active: false,
      completed: false,
      [type]: true});
  }


  const clearCompleted = () => {

    tasks.filter(task => task.completed).map(task => deleteTask(task))

  }

  return (
    <ul
    className={`text-white bg-list-dark w-3/5 max-h-[45vh] overflow-y-auto overflow-x-hidden duration-200 ${styles.scrollingCustom}`}>
      {tasks.map((task, num) => {
        return (
          <li className={`border-b-[0.5px] border-[rgb(255,255,255,0.5)] w-full flex items-center justify-between py-5 px-3 bg-list-dark duration-300 hover:scale-[1.02] `} key={task.$id}>

            <div className="leftListItem flex items-center gap-5">
              <div className={`border-2 rounded-full p-1 flex items-center justify-center ${task.isCompleted ? 'bg-check-gradient' : ''} min-w-[15px] min-h-[15px] hover:cursor-pointer`}
                onClick={() => toggleCompleted(task)}
              >
                {
                  task.isCompleted && <img src={Check} alt="" />
                }

              </div>
              <p className={`text-lg ${task.isCompleted ? 'line-through text-list-font-dark font-semibold' : ""}`} >
                {task.title}<br/>
                {task.description}
              </p>

            </div>
            <div className="rightListItem items hover:cursor-pointer"
              onClick={() => {
                deleteTask(task)
              }}
            >
              <AiOutlineClose className="text-list-font-dark text-2xl" />
            </div>
          </li>
        )
      })}
      
    </ul>
  )
}

export default Tasks