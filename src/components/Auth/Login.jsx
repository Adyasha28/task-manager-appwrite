import React, { useState } from 'react'
import { account } from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate()
  const[ user,setUser]=useState({
    email:"",
    password:""

  })

  const loginuser=(e)=>{
    e.preventDefault()  // we don't want to refresh the page
    const promise= account.createEmailSession(user.email, user.password);

    promise.then(function(response){
      console.log(response);
      navigate('/profile')
    }, function(error){
      console.log(error);
    });

  }
    return (
        <div className="bg-bg-dark flex items-center justify-center h-[100vh] w-[100%] text-white">
            <form className="flex flex-col m-auto md:w-1/4 h-1/2 p-7 justify-evenly rounded-[25px] bg-list-dark shadow-dark-shadow bg-dark-gradient " onSubmit={(e)=>loginuser(e)}
            >
              <h1 className='text-center text-3xl font-bold' >Log In</h1>
                
                <input className="block w-full  mx-auto border-2 p-3 rounded-md text-black" type="email" placeholder="Email"
                
                onChange={(e)=>{
                  setUser({
                    ...user,
                    email:e.target.value
                  })
                }}
                />
                <input className="block w-full  mx-auto border-2 p-3 rounded-md text-black" type="password" placeholder="Password" 
                onChange={(e)=>{
                  setUser({
                    ...user,
                    password:e.target.value
                  })
                }}
                />
                
                <button className='w-full text-xl md:w-1/3 rounded-full mx-auto py-3 bg-emerald-400 text-white font-semibold hover:scale-105 bg-black' type="submit">Log In</button>
  
  
                <span className="text-sm ">
                  Don't have an account? <a href="/signup" className="text-blue hover:text-blue font-semibold underline">Sign up</a>
                </span>
            </form>
        </div>
    )
  }
  

export default Login