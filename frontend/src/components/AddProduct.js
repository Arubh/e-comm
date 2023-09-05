import React, { useState } from 'react'

export default function AddProduct() {
    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [company,setCompany] = useState("")
    const [error,setError] = useState(false)

    const addProduct = async () => {  
        if(!name || !price || !category || !company){
            setError(true )
            return false;
        } 
        const userId = JSON.parse(localStorage.getItem("user"))._id
        let result = await fetch('http://localhost:5000/add-product',{
            method: 'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.log(result)
        setName("")
        setPrice("")
        setCategory("")
        setCompany("")
    }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-[25px] mt-10'>Add Product</h1>
      <input type="text" placeholder='Enter product name' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' onChange={(e)=>{setName(e.target.value)}} value={name}/>
      {error && !name && <span className='mt-[-20px] p-0 text-[red] w-[500px] text-left'>Enter valid name!!</span>}
      <input type="text" placeholder='Enter product price' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
      {error && !price && <span className='mt-[-20px] p-0 text-[red] w-[500px] text-left'>Enter valid price!!</span>}
      <input type="text" placeholder='Enter product category' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
      {error && !category && <span className='mt-[-20px] p-0 text-[red] w-[500px] text-left'>Enter valid category!!</span>}
      <input type="text" placeholder='Enter product company' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
      {error && !company && <span className='mt-[-20px] p-0 text-[red] w-[500px] text-left'>Enter valid company!!</span>}
      <button onClick={addProduct} type='button' className='block m-[20px] p-[7px] w-[200px] bg-[#108b7b] text-[white] font-bold'>Add Product</button>
    </div>
  )
}
