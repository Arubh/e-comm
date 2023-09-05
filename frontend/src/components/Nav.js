import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Nav() {
  const auth = localStorage.getItem("user")
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div>
      {auth ?
     
          <ul className='flex p-0 m-0 bg-[#108b7b] justify-start'>
            <li className='p-6 text-[#fbf5f5] font-bold'><Link to="/">Products</Link></li>
            <li className='p-6 text-[#fbf5f5] font-bold'><Link to="/add">Add Product</Link></li>
            <li className='p-6 text-[#fbf5f5] font-bold'><Link to="/profile">Profile</Link></li>
            {/* <li className='p-6 text-[#fbf5f5] font-bold'> {auth ? <Link onClick={logout} to="/signup">Logout</Link>
         : <Link to="/signup">Sign up</Link>} </li>
         <li className='p-6 text-[#fbf5f5] font-bold'><Link to="/login">Login</Link></li> */}
            <li className='p-6 text-[#fbf5f5] font-bold'><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
          </ul>
          
        :
        <ul className='flex p-0 m-0 bg-[#108b7b] justify-end'>
          <li className='p-6 text-[#fbf5f5] font-bold'><Link to="/signup">Sign up</Link></li>
          <li className='p-6 text-[#fbf5f5] font-bold'><Link to="/login">Login</Link></li>
        </ul>}
    </div>
  )
}
