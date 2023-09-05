import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  useEffect(()=>{
    const auth = localStorage.getItem("user")
    if(auth){
      navigate('/')
    }
  },[])

  const handleLogin = async () => {
    let result = await fetch('http://localhost:5000/login',{
      method:"post",
      body: JSON.stringify({ email,password }),
      headers: {
        "Content-Type":"application/json"
      } 
    })
    result = await result.json()
    console.log(result)
    if(result.token){
        localStorage.setItem("user",JSON.stringify(result.user))
        localStorage.setItem("token",JSON.stringify(result.token))
        navigate('/')
    }
    else{
      alert("Please enter correct details")
    }
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-[30px] font-bold mt-20'>Login</h1>
      <input type="text" placeholder='Enter email' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type="password" placeholder='Enter password' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={handleLogin} type="button" className='block m-[20px] p-[7px] w-[200px] bg-[#108b7b] text-[white] font-bold'>Login</button>
    </div>
  )
}
