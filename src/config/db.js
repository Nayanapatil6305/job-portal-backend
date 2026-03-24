const {Pool} = require('pg');
const pool =new Pool({
    user:'postgres',
    host:'db.tzosbsmwqnogyqdqscbb.supabase.co',
    database:'student_db',
    password:'vaishnavipatil@gmail.com',
    port:5432
    
});

pool.connect((err)=>{
    if(err){
        console.log("Db error",error);
    }else{
        console.log("Db connect");
    }
})

module.exports=pool;