const express=require('express');
const Router=express.Router();

const leaders=require('../models/leaders')

Router.route('/')
.get((req,res) => {
    
    leaders.find({}).then((response) =>{
        res.status(200).json(response);
    }).catch((err) =>{
        res.send('Something went wrong',err);
    })
    
})
.post((req, res) =>{

    leaders.create(req.body).then((response) =>{
        res.status(200).json(response)
    }).catch((err) =>{
        res.status(404).send('Something went wrong!')
    })
})
.put((req,res) =>{

    res.status(403).send('PUT operation is not allowed')
})
.delete((req,res) =>{
     
    leaders.deleteMany({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
})

Router.route('/:leaderId')
.get((req,res) => {
    const leaderId = req.params.promoId;
    leaders.findById(leaderId).then((response) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response)
    }).catch((err) =>{
        res.status(404).send('Something went wrong');
    })
})
.post((req, res) =>{
    res.statusCode=403;
    res.end('Post operation is not supported on /leaders/:leaderId');
})
.put((req, res) =>{
    const leaderId=req.params.leaderId;
    
    leaders.findByIdAndUpdate(leaderId,{$set:req.body},{ new: true }).then((response) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);

    }).catch((error) =>{
        res.status(404).end('Something Went Wrong');
    })
})
.delete((req, res) =>{
    const leaderId=req.params.leaderId;
    leaders.findByIdAndRemove(leaderId).then((response) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
})

module.exports=Router;