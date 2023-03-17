const mysql = require('mysql');
const client = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'cloudtest',
	timezone:"08:00",
})

const sqlQuery = function(sql,callBack){
	client.query(sql,(err,res)=>{
		console.log(err,'数据库查询错误函数')
		if(err){
			callBack(-1);
		}else{
			// console.log(res)
			callBack(res);
		}
		return;
	})
}
module.exports = sqlQuery;