const express = require('express')
const router = express.Router()
const users = require("../data/users.json")
const Joi = require("joi")
const validateUser = require("../helpers/validateUser")

router.get('/',(req,res)=>{
    
    let result = users

    for(const [key,val] of Object.entries(req.query)){
        result = result.filter(user => user[key] == val)
    }
    
    res.json(result)
})
router.get('/:id',(req,res)=>{
    const user = users.find(user => user.id == req.params.id)
    if(!user){
        return res.status(404).json({error: 'There is no such user..',statusCode: 404})
    }

    res.json(user)

})

router.post('/',(req,res)=>{

    const { error } = validateUser(req.body)

    if(error){
        return res.status(404).json({error: error.details[0].message,statusCode: 404})
    }

    const user = {
        id: users.length+1,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }

    users.push(user)
    res.json(user)
})

router.put('/:id',(req,res)=>{

    const user = users.find(user => user.id == req.params.id)    

    const { error } = validateUser(req.body)

    if(error){
        return res.status(404).json({error: error.details[0].message, statusCode:404})
    }

        user.name = req.body.name
        user.surname = req.body.surname
        user.age = req.body.age
        user.email = req.body.email
        user.phone = req.body.phone
        user.address = req.body.address

        res.json(user)
    

})

router.delete('/:id',(req,res)=>{
    
    const user = users.find(user=>user.id == req.params.id)
        
    if(!user){
        return res.status(404).json({error: 'There is no such user..', statusCode:404})
    }

    const index = users.indexOf(user)
    users.splice(index,1)
    res.json(user)


})

router.patch('/:id',(req,res)=>{
    const user = users.find(user => user.id == req.params.id)

    const schema = Joi.object({
        name: Joi.string().min(3),
        surname: Joi.string().min(3),
        age: Joi.number(),
        email: Joi.string(),
        phone: Joi.number().integer(),
        address: Joi.string()
    })
    const { error } = schema.validate(req.body)

    if(error){
        return res.status(400).json({error: error.details[0].message,statusCode: 400 })
    }

    for(const k in req.body){
        user[k] = req.body[k]
    }
    res.json(user)

})


module.exports = router;
