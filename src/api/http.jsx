// const qs = require('querystring'); //引入nodejs内置的模块，用来转化对象为以‘&’符号连接的参数。

// const base = '/api';
const base = 'https://www.ccensx.ren:11443';

// 自处理数据
function  qs(data) {
    let str = '';
    for(let key in data){
        str+= '&'+key + '=' + data[key]
    }
    str = str.substring(1);
    // console.log(str);
    return str;
}

// 封装post
const fetchPost= async function(url,data){
    return await fetch(base+url,{
        method:'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: qs(data).substring(1)
    }).then(res=>res.json())
}

// 封装get
const fetchGet= async function(url,data){
    return await fetch(base+url+'?'+qs(data)).then(res=>res.json());
}

export {
    fetchPost,
    fetchGet
};