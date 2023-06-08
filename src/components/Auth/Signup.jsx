import React, { useState } from 'react'
import { account } from '../../appwrite/config'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate=useNavigate()
    const [user,setUser]= useState({
      name:"",
      email:"",
      password:""
    })
    const signupuser= async(e)=>{
      e.preventDefault()

    const promise = account.create(
      uuidv4(), // used for unique id
      user.email,
      user.password,
      user.name
    )

    promise.then(function(response){
      // console.log(response)
      navigate('/profile')
    },function(error) {
      console.log(error);
    })
  }

  return (
    <div className='flex items-center justify-center h-[100vh] w-[100%] bg-bg-dark text-white'>
    <form className="flex flex-col m-auto md:w-1/4 h-1/2 p-5 justify-evenly border-2 border-black rounded-xl bg-list-dark shadow-dark-shadow bg-dark-gradient"
    onSubmit={(e)=> signupuser(e)}
    
    >
        <h1 className='text-center text-3xl font-bold' >Create an account</h1>
        <input className="block border-b-2 p-3 rounded-lg active:outline-none active:border-x-none active:border-t-none text-black" type="text" id='name' placeholder="Name" 
        onChange={(e)=> setUser({...user,name:e.target.value})}
        
        />
        <input className="block border-b-2 p-3 rounded-lg active:outline-none active:border-x-none active:border-t-none text-black" type="email" placeholder="Email" 
        onChange={(e)=> setUser({...user, email:e.target.value})}
        />
        <input className="block border-b-2 p-3 rounded-lg active:outline-none active:border-x-none active:border-t-none text-black" type="password" placeholder="Password" 
        onChange={(e)=> setUser({...user, password:e.target.value})}
        />
      <button className='font-bold text-lg w-1/3 rounded-full mx-auto py-3 bg-black' type="submit">Sign Up</button>
        <span className="text-sm">
            Already have an account? <a href="/" className="text-blue hover:text-blue font-semibold underline">Log In</a>
        </span>
  </form>
</div>
    )
}

export default Signup