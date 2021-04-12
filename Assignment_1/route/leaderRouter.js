const express = require('express');
const router = express.Router();



router.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send all the leaders to you!');
})
.post((req, res) => {
    res.end('Will add the leaders: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res) => {
    res.end('Deleting all leaders');
});

//implementing endpoint for promotions/:promoId
router.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send details of leader with'+req.params.leaderId);
})
.post((req,res) => {
    res.end('Will add the leader:'+req.body.name+'with details:'+req.body.description+'with Promo Id'+req.params.promoId);
})
.put((req,res) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete((req,res) => {
    res.end('Deleted leader With leader Id '+req.params.leaderId);
})

module.exports = router;