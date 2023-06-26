const mongoose=require('mongoose');
module.exports=async()=>{
    try{
        const uri="mongodb+srv://Test1234:Test1234@cluster0.uub861e.mongodb.net/Test";
     let db=   await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        global.dbUrl = db.connections[0].db;
        console.log('DB connected successfully');

    }catch(err){
        throw err
    }
}