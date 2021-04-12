const express=require('express');
const Router=express.Router();

const promotions=require('../models/promotions')

Router.route('/')
.get((req,res) => {
    
    promotions.find({}).then((promotions) =>{
        res.status(200).json(promotions);
    }).catch((err) =>{
        res.send('Something went wrong',err);
    })
    
})
.post((req, res) =>{

    promotions.create(req.body).then((promotions) =>{
        res.status(200).json(promotions)
    }).catch((err) =>{
        res.status(404).send('Something went wrong!')
    })
})
.put((req,res) =>{

    res.status(404).send('PUT operation is not allowed')
})
.delete((req,res) =>{
     
    promotions.deleteMany({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
})

Router.route('/:promoId')
.get((req,res) => {
    const promoId = req.params.promoId;
    promotions.findById(promoId).then((promotions) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions)
    }).catch((err) =>{
        res.status(404).send('Something went wrong');
    })
})
.post((req, res) =>{
    res.statusCode=403;
    res.end('Post operation is not supported on /promotions/:promoId');
})
.put((req, res) =>{
    const promoId=req.params.promoId;
    promotions.findByIdAndUpdate(promoId,{$set:req.body}).then((response) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);

    }).catch((error) =>{
        res.status(404).end('Something Went Wrong');
    })
})
.delete((req, res) =>{
    const promoId=req.params.promoId;
    promotions.findByIdAndRemove(promoId).then((response) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
})

module.exports=Router;