const express = require('express');
const router = express.Router();



router.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res) => {
    res.end('Deleting all dishes');
});

//implementing endpoint for dishes/:dishId
router.route('/:dishId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send you dish details with dish id '+ req.params.dishId);
})
.post((req,res) => {
    res.end('Will add the dish:'+req.body.name+'with details:'+req.body.description+'with Dish Id'+req.params.dishId);
})
.put((req,res) => {
    res.write('Updating the leader: ' + req.params.dishId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete((req,res) => {
    res.end('Deleted promotion With dish Id '+req.params.dishId);
})

module.exports = router;