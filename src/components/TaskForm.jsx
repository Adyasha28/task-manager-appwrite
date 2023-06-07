import React, { useState } from 'react'
import styles from './TaskForm.module.css'
import { COLLECTION_ID, DATABASE_ID } from '../appwrite/constants'
import { databases } from '../appwrite/config'
import { v4 as uuidv4 } from 'uuid'
import { AiOutlineClose } from 'react-icons/ai'

const TaskForm = ({ setshowForm, fetchTasks , user }) => {
    const [task, setTask] = useState({
        uid: user.$id,
        title: "",
        description: "",
        isCompleted: false
    })

    
    const handleSubmit = (e) => {
        e.preventDefault()
        const promise = databases.createDocument(DATABASE_ID, COLLECTION_ID, uuidv4(), task)

        promise.then(function (response) {
            setTask({
                title: "",
                description: ""
            })
            setshowForm(false)
            fetchTasks()
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
    }
    
  return (
      <div className={styles.modal} >
        <form className={`${styles["modal-content"]} bg-list-dark`}
            onSubmit={handleSubmit}
          >
            <AiOutlineClose 
            onClick={() => setshowForm(false)}
            className="cursor-pointer absolute right-5 text-2xl " />
            <div className="form-input-div w-full  ">
                <label className="text-xl font-bold " htmlFor="">Title 
                <input type="text" className='w-full border-2 border-gray-300 px-3 py-2 rounded-md my-2 text-md text-black' placeholder="What to do?" onChange={(e) => setTask({
                    ...task,
                    title: e.target.value
                })} />
                </label>
            </div>

              <div className="form-input-div w-full my-4">
                <label className="text-xl font-bold" htmlFor="">Description
                <textarea className="border-4 w-full my-2 p-3 text-md text-black" type="text"
                rows={5}
                placeholder="Description" onChange={(e) => setTask({    
                    ...task,
                    description: e.target.value
                })} />

                </label>
              </div>
              <button 
              type="submit"
                class="bg-black text-white w-1/3 text-xl mx-auto py-2 rounded-xl font-bold">
                    Add Tasks
              </button>
        </form>
    </div>
  )
}

export default TaskForm