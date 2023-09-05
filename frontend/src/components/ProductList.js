import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductList() {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
       getProducts()
    },[])

    const getProducts = async () => {
      let result = await fetch('http://localhost:5000/products',{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result = await result.json()
      setProducts(result)
    }

    const deleteProduct =async (id) => {
        let result = await fetch(`http://localhost:5000/delete/${id}`,{
          method:"delete",
          headers:{
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result = await result.json()
        if(result){
          console.log("Product is deleted")
          getProducts() 
        }
    }

    const searchProduct = async (e) => {
        // console.log(e.target.value)
        let key = e.target.value
        if(key){
          let result = await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
              authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
          result = await result.json()
          if(result){
            setProducts(result)
          }
        }
        else{
          getProducts()
        }
        
    }
  return (
    <div>
      <h1 className='text-[25px] font-bold mt-8'>Product List</h1>
      <input onChange={searchProduct} type="text" placeholder='Search product' className='mx-auto block m-[20px] p-[7px] w-[500px] bg-[#108b7b] text-[white]' />
      <div className='grid grid-cols-3 gap-10 mt-10 mx-4'>
      {products.length>0 ? products.map((product)=>{
        return (
        <div className='bg-[#108b7b] w-[200px] font-bold text-[white] text-left pl-4 rounded-[20px]'>
            <div className='py-2 '>Name: {product.name}</div>
            <div className='py-2'>Price: Rs.{product.price}</div>
            <div className='py-2'>Category: {product.category}</div>
            <div className='py-2'>Company: {product.company}</div>
            <div className='py-2'><button onClick={()=>{deleteProduct(product._id)}} className='bg-[#05423a] p-2 rounded-[10px] w-[170px] mb-2'>Delete product</button></div>
            <div className='bg-[#05423a] p-2 rounded-[10px] mb-4 w-[170px] text-center'><Link to={`/update/${product._id}`}>Update</Link></div>
        </div>)
      })
    : <h1 className='font-bold text-[30px]' >No results found</h1>
    }
      </div>
    </div>
  )
}
