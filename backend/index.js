const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')

//JWT
const Jwt = require('jsonwebtoken')
const jwtkey = 'e-comm'

app.use(express.json()) //this is a middleware
app.use(cors()) //to resolve cors issue

app.post('/register',async (req,resp)=>{ 
  let user = new User(req.body)
  let result = await user.save()
  result = result.toObject()
  delete result.password
  Jwt.sign({ user }, jwtkey, { expiresIn:'2h' }, (err,token)=>{
    if(err){
      resp.send({result:"something went wrong. Try later"})
    }
    resp.send({ user, token })
  })

})  

app.post('/login',async (req,resp)=>{
  // console.log(req.body)
  if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password")
    if(user){
      Jwt.sign({ user }, jwtkey, { expiresIn:'2h' }, (err,token)=>{ //Jwt.sign: This is a function provided by the jsonwebtoken library used to sign a JWT.
        //'.sign' takes three arguments: 
        //the payload of the JWT, 
        //the lifetime of the token, 
        //callback function to be executed if the token is signed
        if(err){
          resp.send({result:"something went wrong. Try later"})
        }
        resp.send({ user, token })
      })
      // resp.send(user)
    }
    else{resp.send({result: "No user found"})}
  }
  else{
    resp.send({result: "No user found"})
  }
 
})

app.post('/add-product',verifyToken, async (req,resp)=>{
    let product = new Product(req.body)
    let result = await product.save()
    resp.send(result)
})

app.get("/products",verifyToken,async (req,resp)=>{
  let products =await Product.find({})
  if(products.length>0){
    resp.send(products)
  }
  else{
    resp.send({result:"No products found"})
  }
})

app.delete("/delete/:id",verifyToken,async (req,resp)=>{
  let result = await Product.deleteOne({
    _id:req.params.id
  })
  resp.send(result)
})

app.get('/product/:id',verifyToken,async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
      resp.send(result)
    }
    else{
      resp.send({result:"No result found"})
    }
})

app.put('/update/:id',verifyToken,async (req,resp)=>{
   let result = await Product.updateOne(
    {_id:req.params.id},
    {$set:req.body}
    )
    resp.send(result)
})

app.get('/search/:key', verifyToken, async (req,resp)=>{
  let result = await Product.find({
    "$or":[
       {name:{$regex:req.params.key}}, //name should contain "key"
       {price:{$regex:req.params.key}},
       {category:{$regex:req.params.key}},
       {company:{$regex:req.params.key}},
    ]
  })
  resp.send(result)
})


//middleware to verify token:
function verifyToken(req,resp,next) {
      // next() //the control of flow goes from the middleware to the api

      let token = req.headers['authorization']
      if(token){
        token = token.split(' ')[1]
        console.log("middleware called",token)
        Jwt.verify(token, jwtkey, (err,valid)=>{
          if(err) {
            resp.send({result: "Please add valid token with header"})
          }
          else{
            next()
          }
        })
      }
      else{
        resp.send({result: "Please add token with header"})
      }
}


app.listen(5000)