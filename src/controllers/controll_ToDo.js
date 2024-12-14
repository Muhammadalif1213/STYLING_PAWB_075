const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    todo(req,res){
        res.render("todo",{
            url: 'http://localhost:5050/',
        });
    }
}

