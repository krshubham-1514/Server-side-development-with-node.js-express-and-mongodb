const express = require('express');
const router = express.Router();



router.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res) => {
    res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});

//implementing endpoint for promotions/:promoId
router.route('/:promoId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send you promotion details with promo id '+ req.params.promoId);
})
.post((req,res) => {
    res.end('Will add the promotion:'+req.body.name+'with details:'+req.body.description+'with Promo Id'+req.params.promoId);
})
.put((req,res) => {
    
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete((req,res) => {
    res.end('Deleted promotion With promo Id '+req.params.promoId);
})

module.exports = router;