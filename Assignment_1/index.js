const express=require('express')



var dishRouter=require('./route/dishRouter')
var leaderRouter=require('./route/leaderRouter')
var promoRouter=require('./route/promoRouter')

const port=3000;
const hostname='localhost'

const app=express();

app.use(express.json());


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

app.listen(port,hostname,()=>{

    console.log(`Server running at port ${port}`)
});