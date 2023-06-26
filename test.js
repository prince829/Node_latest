const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const cookieparser=require("cookie-parser");
const http=require("http");
const cors=require("cors");
const rateLimit=('express-rate-limit');
const{join,resolve} =require('path');
require('dotenv').config();
const mongoose=require('mongoose');

/*************Middleware Registartion Start****************/
app.use(cors());
app.use(cookieparser());//need for auth to read auth token saved in cookee
app.use(bodyparser.urlencoded({
    limit:'50mb',
    extended:true,//allows to parse complex object like as arrayofObject or arrays
    parameterLimit:500000
}));
app.use(bodyparser.json({
    limit:'50mb'
}));
app.use(express.static('./public'));

app.use(function(req,res,next){
    res.header('Cache-Control', 'private, no-cache, max-age=3600');
    res.header('Expires', '-1');//instucting the browser that cache expired  immediately
    res.header('Pragma', 'no-cache');//take response from server not from cache 
    next();
});


/*************Middleware Registration End *****************/


/*********************Features of rate limit ***********************/
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// Apply the rate limiting middleware to guest User requests
// app.use('/api/user/guest-user-signup', limiter)
/**********************End rate Limit ******************************/
/**
 * Event listener for HTTP server "error" event.
 */
 const onError = (error) => {
    const port = process.env.PORT;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(0);
            break;
        default:
            throw error;
    }
}

(async ()=>{
    try{
        //DB Connection
    
        let db=   await mongoose.connect('mongodb+srv://Test1234:Test1234@cluster0.eae0r6x.mongodb.net/Test',{
               useNewUrlParser: true,
               useUnifiedTopology: true,
           });
           global.dbUrl = db.connections[0].db;
           console.log('DB connected successfully');
     
    //   console.log(DB,'dbbbbb');
        /**********Service Launch start *****************/
        app.listen(process.env.PORT?process.env.PORT:'3000')
        app.on("error",onError);
        console.log(`${process.env.PROJECT_NAME} is running on http://${process.env.HOST}:${process.env.PORT}`)
        /***********Service Launch End ******************/

    }catch(err){
        console.log("hel;lll");
        console.log(err)
    }
})();

module.exports=app;