import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

export default function Update() {
    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [company,setCompany] = useState("")


    const params = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
      getProductDetails()
    },[])

    const getProductDetails = async  () => {
       let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
       })
       result = await result.json()
       console.log(result)
       setName(result.name)
       setPrice(result.price)
       setCategory(result.category)
       setCompany(result.company)
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/update/${params.id}`,{
          method:'put',
          body:JSON.stringify({name,category,price,company}),
          headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }       
        })
        result = await result.json()
        // console.log(result)
        // setName("")
        // setPrice("")
        // setCategory("")
        // setCompany("")
        navigate('/')
    }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-[25px] mt-10'>Update Product</h1>
      <input type="text" placeholder='Enter product name' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' onChange={(e)=>{setName(e.target.value)}} value={name}/>
      <input type="text" placeholder='Enter product price' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
      <input type="text" placeholder='Enter product category' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
      <input type="text" placeholder='Enter product company' className='block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
      <button onClick={updateProduct} type='button' className='block m-[20px] p-[7px] w-[200px] bg-[#108b7b] text-[white] font-bold'>Update</button>
    </div>
  )
}
