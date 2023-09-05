import React from 'react'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
    return (
    <div className='flex flex-col justify-center items-center mt-24'>
    <div className='w-[400px] font-bold text-[30px]'>Name:  {user.name} <br></br></div>
    <div className='w-[400px] font-bold text-[30px] mt-10'>email: {user.email}</div>
    </div>
  )
}
