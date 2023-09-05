import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //helps us prevent opening the Signup page if one user is already logged in. 
  const navigate = useNavigate()
  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate("/")
    }
  })

  const collectData = async () => {
    //we have to run both frontend and backend on different terminals
    let result = await fetch('http://localhost:5000/register', { //fetch is used to make POST request to the given url
      method: 'Post', //the method of the post
      body: JSON.stringify({ name, email, password }), //the values being sent to the api in json format. This is passed to the api, just like "req.body"
      headers: {
        'Content-Type': 'application/json' //usually the same as this
      },
    });
    result = await result.json(); //result is also a promise of string format
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.user)) //we store the user's data in local storage
    localStorage.setItem("token", JSON.stringify(result.token)) //we store the user's data in local storage
    setName("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-[30px] font-bold my-10'>Register</h1>
      <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' />
      <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' />
      <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' />
      <button type="button" onClick={collectData} className='block m-[20px] p-[7px] w-[200px] bg-[#108b7b] text-[white] font-bold'>Sign up</button>
    </div>
  )
}
