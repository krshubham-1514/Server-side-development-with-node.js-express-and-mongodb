const express=require('express');
const mongoose=require('mongoose');
const promoRouter=require('./routes/promoRouter');
const leaderRouter=require('./routes/leaderRouter');
const app = express();

const PORT=3000; 
app.use(express.json());


app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);


const url=''
const connect=mongoose.connect(url,{ 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
});

connect.then((db)=>{
    console.log('Connected to mongodb server');
}).catch((err)=>{
    console.log('Something went wrong',err);
})


app.listen(3000,(req,res)=>{
    console.log(`Server running on port ${PORT}`);
})