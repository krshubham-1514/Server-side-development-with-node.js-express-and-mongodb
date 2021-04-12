const express=require('express');
const passport=require('passport');
const mongoose=require('mongoose');
const dishRouter=require('./routes/dishRouter')
const promoRouter=require('./routes/promoRouter');
const leaderRouter=require('./routes/leaderRouter');
const usersRouter=require('./routes/users');
const favoriteRouter=require('./routes/favoriteRouter');
const config=require('./utils/config');
const app = express();

const PORT=3000; 
app.use(express.json());
app.use(passport.initialize());
app.use('/users',usersRouter);
app.use('/dishes',dishRouter)
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
app.use('/favorites',favoriteRouter);


const url=config.mongoUrl;

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