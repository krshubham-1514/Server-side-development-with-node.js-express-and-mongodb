const express = require('express')
const mongoose = require('mongoose')
const authenticate=require('../utils/authenticate')
const favorite=require('../models/favorite')

const favoriteRouter=express.Router();
favoriteRouter.use(express.json());

favoriteRouter.route('/')
.get(authenticate.verifyUser,(req,res,next) => {
    
    favorite.find({'user':req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favourites) => {
        if(favourites){
            res.json(favourites);
        }
    })    
})
.post(authenticate.verifyUser,(req,res,next) => {
    const dishes=req.body;
    let arr_dishId=[];
    dishes.forEach(dish =>arr_dishId.push(dish.id));
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    favorite.findOneAndUpdate(
        { user: req.user._id },
        {
            "$addToSet":
                {
                    "dishes": { $each: arr_dishId }
                }
        },
        options
    ).then(data => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json({message: data});

    }).catch((err) => {
        console.log('error');
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({message: err.message});
    })

    
})
.delete(authenticate.verifyUser,(req,res,next) => {
    favorite.findOneAndDelete({user:req.user._id}).then((response)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json({message:response});

    }).catch((err)=>{
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({message:err.message});
    })
})

favoriteRouter.route('/:dishId')
.post(authenticate.verifyUser,(req,res,next) => {
    console.log(req.user._id);
    let dishId=req.params.dishId;
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    favorite.findOneAndUpdate(
        { user: req.user._id },
        {
            "$addToSet":
                {
                    "dishes": dishId
                }
        },
        options
    ).then(data => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json({message: data});

    }).catch((err) => {
        console.log('error');
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({message: err.message});
    })

})
.delete(authenticate.verifyUser,(req,res,next) =>{
    let dishId = req.params.dishId;
    favorite.findOne({user: req.user._id}, (err,Favorites) =>{
        if(err){
            return next(err);
        }
        
        if(!Favorites){
            res.statusCode = 200;
            res.end("No favorite dish to delete");
        }
        var index = Favorites.dishes.indexOf(req.params.dishId);
        if(index>-1)
        {
            Favorites.dishes.splice(index,1);
            Favorites.save()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

            }, (err) => next(err))
            .catch((err) => next(err));
        }else{

            res.statusCode = 200;
            res.end("No favorite dish to delete");

        }
    });

});

module.exports=favoriteRouter;
