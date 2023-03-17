const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
const sqlQuery = require('./mysql.js');

// 获取轮播图数据
router.get('/getSwiper', (req, res) => {
    let n = 0 ; 
    let temp = [];
    let sql = 'select * from goods limit 100';
    sqlQuery(sql,data=>{
        let data1 = [];
        if(data.length > 0){
            if(data.length >= 100){
                for(let i = 0 ; i < 5 ; i ++){
                    n = parseInt(Math.random()*100);
                    temp.push(n);
                }
            }else{
                for(let i = 0 ; i < 5 ; i ++){
                    n = parseInt(Math.random()*data.length);
                    temp.push(n);
                }
            }
            temp.sort((a,b)=>{
                return a-b;
            })
            data1 = temp.map(ele=>{
                return data[ele].imgurl;
            })
            console.log(data1,111);
            
        }
        res.send({
            imgList: data1,
        })
    })
})

// 获取最大销量数据（每个城市不一样）4个
router.get('/getMaxRecommend', (req, res) => {
    const city = req.query.city;
    let sql = 'select * from (select * from goods order by sales desc) as bbb where city="' + city + '" limit 4';
    sqlQuery(sql, (data) => {
        console.log(111999,data);
        if (data.length > 0) {
            res.send(data);
        } else {
            res.send([]);
        }
    });
})

// 获取精品数据(价高，大于等于2000元)（每个城市不一样）8个
router.get('/getFestRecommend', (req, res) => {
    const city = req.query.city;
    let sql = 'select * from (select * from goods where price >= 2000 order by price desc) as bbb where city="' + city + '" limit 8';
    sqlQuery(sql, (data) => {
        if (data.length > 0) {
            res.send(data);
        } else {
            res.send([]);
        }
    });
})

// 获取热门数据（销量）（每个城市不一样） 16个
router.get('/getHotRecommend', (req, res) => {
    const city = req.query.city;
    // let sql = 'select * from goods where city="' + city + '" limit 4';
    let sql = 'select * from (select * from goods order by sales desc) as bbb where city="' + city + '" limit 16';
    sqlQuery(sql, (data) => {
        if (data.length > 0) {
            res.send(data);
        } else {
            res.send([]);
        }
    });
})

// 获取商品列表（三个参数：城市、关键字、页码）
// 每页十条
// 数据格式： {图片，名称，标题,详情{层数，面积，类型}，价钱}
router.get('/getGoodsList', (req, res) => {
    let city = req.query.city;
    let name = req.query.name;
    let page = req.query.page;
    let oniceCount = req.query.oniceCount;
    console.log(req.query)

    let sql = 'select * from goods limit '+((page -1)*oniceCount) +','+oniceCount;  //一次去20条
    if(city){
        sql = 'select * from goods where city= "'+city+'" limit '+((page -1)*oniceCount) +','+oniceCount;
    }
    if(name){
        sql = 'select * from goods where name like "%'+name+'%" limit '+((page -1)*oniceCount) +','+oniceCount;
    }
    if(name&&city){
        sql = 'select * from goods where name like "%'+name+'%" and city= "'+city+'" limit '+((page -1)*oniceCount) +','+oniceCount;
    }

    console.log(sql)
    // 按用户按条件进行查询
    sqlQuery(sql,data=>{
        // console.log(data);
        if(data.length >0){
            res.send({
                code:1,
                goods:data,
                page:+page,
                nextPage:+page+1,
            })
        }
        else{
            res.send({
                code:0,
                goods:[],
                page:+page,
                nextPage:+page,
            })
        }
    })
})

// 请求单个商品(id)
// 数据格式： {图片，名称，标题,详情{层数，面积，类型}，价钱}

router.get('/getGoodsItem', (req, res) => {
    let id = req.query.id;
    let city = req.query.city;
    console.log(req.query)
    let sql = 'select * from goods where city="' + city + '" and id = "' + id + '"';
    let sql1 = 'select * from goods_imgs where goodsid = "' + id + '"';
    sqlQuery(sql, (data) => {
        console.log(data);
        if (data.length > 0) {
            sqlQuery(sql1, data1 => {
                if (data1.length > 0) {
                    res.send({ data:data, data1:data1 });
                }else{
                    res.send({ data:data, data1:data1 });
                }
            })
        } else {
            res.send([]);
        }
    })
})

// 请求要下单的商品
router.get('/getGoodsToOrderList', (req, res) => {
    let goodsids = req.query.temp.split(',')
    // console.log(goodsids);
    let sql = '';
    let arr = [];
    for (let i = 0; i < goodsids.length; i++) {
        sql = 'select * from goods where id = "' + goodsids[i] + '"';
        sqlQuery(sql, (data) => {
            console.log(data);
            if (data.length > 0) {
                arr.push(data[0]);
            }
            if (i + 1 == goodsids.length) {
                res.send(arr);
            }
        })
    }
})

// ====================================== 初始化========向上================================



// ======================================用户操作区========向下================================
// 登录注册、修改删除用户-------------------向下------------------------------------------------------------------


// 注册用户
router.post('/register', (req, res) => {
    let user = {
        username: req.body.sername,
        password: req.body.password,
        roleid: req.body.roleid == 1 ? req.body.roleid : 0,
        age: 0,
        sex: '未知',
        tel: '00000000000'
    };
    let sql = 'select * from users where username = ' + '"' + user.username + '"';
    let sql1 = 'insert into users(username,password,age,sex,tel,roleid)values(' + '"' + user.username + '","' + user.password + '","' + user.age + '","' + user.sex + '","' + user.tel + '",' + user.roleid + ')';
    sqlQuery(sql, (data) => {
        // 用户不存在
        if (data.length > 0) {
            res.send({ code: -1 });
        } else {
            sqlQuery(sql1, (data1) => {
                // console.log(data1);
                if (data1.affectedRows == 1) { //插入成功
                    res.send({ code: 1 });
                } else {
                    res.send({ code: 0 });
                }
            })
        }
    })
});


// 用户登录
router.post('/login', (req, res) => {
    let user = {
        username: req.body.sername,
        password: req.body.password
    };

    let sql = 'select id,username from users where username = ' + '"' + user.username + '"';
    let sql1 = 'select id,username from users where username = "' + user.username + '" and password = "' + user.password + '"';
    sqlQuery(sql, (data) => {
        // 用户不存在
        if (data.length <= 0) {
            res.send({
                code: -1,
                userInfo: {}
            })
        } else {
            sqlQuery(sql1, (data1) => {
                console.log(data1)
                if (data1.length == 1) {
                    res.send({
                        code: 1,
                        userInfo: data1[0]
                    })
                } else if (data1.length == 0) {
                    // 密码错误
                    res.send({
                        code: 0,
                        userInfo: {}
                    })
                }
            })
        }
    })
});


// 注销用户
router.post('/delUser', (req, res) => {
    let user = {
        username: req.body.sername,
        id: req.body.userid
    };
    let sql = 'delete from users where username = "' + user.username + '" and password = "' + user.password + '"';
    sqlQuery(sql, (data) => {
        if (data.affectedRows == 1) {
            res.send({
                code: 1,
                msg: '注销成功'
            })
        } else {
            res.send({
                code: 1,
                msg: '注销失败'
            })
        }
    })
});

//修改用户信息
router.post('/editUser', (req, res) => {
    let user = {
        userid: req.body.serid,
        username: req.body.username,
        age: req.body.age,
        sex: req.body.sex,
        tel: req.body.tel
    };
    // console.log(user, req.body.sername)
    let sql = 'select id,username from users where username = ' + '"' + user.username + '"';
    let sql1 = 'update users set username="' + user.username + '",age= "' + user.age + '",sex= "' + user.sex + '",tel="' + user.tel + '"' + 'where id =' + user.userid;

    sqlQuery(sql, (data) => {
        // 用户不存在
        if (data.length > 0) {
            res.send({
                code: -1,
                msg: '用户名已存在'
            })
        } else {
            sqlQuery(sql1, data => {
                console.log(data);
                if (data.affectedRows == 1) {
                    res.send({
                        code: 1,
                        msg: '修改成功'
                    })
                } else {
                    res.send({
                        code: 0,
                        msg: '修改失败'
                    })
                }

            })
        }
    })



});

// 查询所有用户（管理系统）
router.get('/selUserAll', (req, res) => {
    let sql = 'select * from users order by id desc';
    sqlQuery(sql, (data) => {
        if (data.length > 0) {
            res.send({
                users: data
            })
        } else {
            res.send({
                users: []
            })
        }
    })
});

// 查询单个用户
router.get('/selUser', (req, res) => {
    let sql = 'select * from users where id = "' + req.query.userid + '"';
    sqlQuery(sql, (data) => {
        // console.log(data)
        if (data.length == 1) {
            res.send({
                user: data
            })
        } else {
            res.send({
                users: []
            })
        }
    })
});

// 登录注册、修改删除用户-------------------向上--------------------------------------------------------


// 收藏（用户，商品信息s）----------------向下------------------------------------------
// {unserid,goodsid}

// api
router.post('/setShoucang', (req, res) => {
    let data = {
        userid: req.body.serid,
        goodsid: req.body.goodsid,
    }
    let sql = 'select * from shoucang where userid = "' + data.userid + '" and goodsid = "' + data.goodsid + '"';
    // console.log(sql)
    sqlQuery(sql, (data1) => {
        if (data1.length == 1) {
            let sql1 = 'delete from shoucang where userid = "' + data.userid + '" and goodsid = "' + data.goodsid + '"';
            sqlQuery(sql1, data2 => {
                if (data2.affectedRows == 1) {
                    res.send({
                        msg: '已取消收藏',
                        code: 0
                    })
                } else {
                    res.send({
                        msg: '取消收藏失败',
                        code: -1
                    })
                }
            })
        } else {
            let sql2 = 'insert into shoucang(userid,goodsid) values("' + data.userid + '","' + data.goodsid + '")';
            sqlQuery(sql2, data3 => {
                // console.log(data3)
                if (data3.affectedRows == 1) {
                    res.send({
                        msg: '已收藏',
                        code: 1
                    })
                } else {
                    res.send({
                        msg: '收藏失败',
                        code: -2
                    })
                }
            })
        }
    })
});

// 单个检验收藏
router.get('/getShoucang', (req, res) => {
    let data = {
        userid: req.query.userid,
        goodsid: req.query.goodsid
    }

    let sql = 'select * from shoucang where userid = "' + data.userid + '" and goodsid = "' + data.goodsid + '"';
    // console.log(sql)
    sqlQuery(sql, (data1) => {
        if (data1.length == 1) {
            res.send({
                code: 1,
                msg: '存在收藏'
            })
        } else {
            res.send({
                code: 0,
                msg: '未收藏'
            })
        }
    })
})

//查询所有收藏
router.get('/getAllShoucang', (req, res) => {
    let userid = req.query.userid;
    let sql = 'select * from shoucang where userid = "' + userid + '" order by id desc';
    // console.log(sql)
    sqlQuery(sql, (data1) => {
        if (data1.length > 0) {
            let sql2 = '';
            let arr = [];
            for (let i = 0; i < data1.length; i++) {
                sql2 = 'select * from goods where id = "' + data1[i].goodsid + '"';
                sqlQuery(sql2, data2 => {
                    arr.push(data2[0]);
                    if (i == data1.length - 1) {
                        console.log(arr)
                        res.send({
                            code: 1,
                            msg: '存在收藏',
                            collect: arr
                        })
                    }
                })
            }
        } else {
            res.send({
                code: 0,
                msg: '未收藏',
                collect: []
            })
        }
    })
})

// 收藏（用户，商品信息）---------------向上-------------------------------------------


// 地址信息（用户，地址（省 市 区 详细地址，电话）------向下-------------------

//查询所有地址 {userid,addrid}
router.get('/getAllAddrs', (req, res) => {
    let userid = req.query.id;
    let sql = 'select * from addrs where userid = ' + userid + ' order by id desc';
    sqlQuery(sql, (data) => {
        // console.log(sql);
        if (data.length > 0) {
            res.send({
                code: 1,
                msg: '存在地址',
                addrs: data
            })
        } else {
            res.send({
                code: 0,
                msg: '暂无地址',
                addrs: data
            })
        }
    })
})

// 新增和修改地址信息 username,addrid
router.post('/addAeditUserAddrs', (req, res) => {
    let data = {
        userid: req.body.userid,
        addrid: +req.body.addrid,
        username: req.body.sername,
        province: req.body.province,
        city: req.body.city,
        area: req.body.area,
        tel: req.body.tel,
        detailsAddr: req.body.detailsAddr
    };
    console.log(data)
    // 匹配是否有该收货地址,有就改变，没有就新增
    let sql = 'select * from addrs where userid = ' + data.userid + ' and addrid = ' + data.addrid;  //查询是否存在
    let sql2 = 'update addrs set province="' + data.province + '",city= "' + data.city + '",area= "' + data.area + '",tel= "' + data.tel + '",detailsAddr= "' + data.detailsAddr + '" where userid = ' + data.userid + ' and addrid = ' + data.addrid;

    sqlQuery(sql, (data1) => {
        if (data1.length > 0) {  //有我就改
            sqlQuery(sql2, (data2) => {
                if (data2.affectedRows == 1) {  //修改成功
                    res.send({
                        code: 2,
                        msg: '修改成功'
                    })
                } else {
                    res.send({
                        code: 0,
                        msg: '修改失败'
                    })
                }
            })
        } else {  //没有我就增加
            //获取当前用户下最大的 addrid
            let sql4 = 'select max(addrid) as newAddrid from addrs where userid = ' + data.userid;
            sqlQuery(sql4, (data4) => {
                console.log(data4)
                if (data4.newAddrid) {
                    data.addrid = parseInt(data4[0].newAddrid) + 1;
                } else {
                    data.addrid = 1;
                }
                let sql3 = 'insert into addrs(province,city,area,tel,detailsAddr,addrid,userid)values("' + data.province + '","' + data.city + '","' + data.area + '","' + data.tel + '","' + data.detailsAddr + '",' + data.addrid + ',"' + data.userid + '")';
                sqlQuery(sql3, (data3) => {
                    if (data3.affectedRows == 1) {
                        res.send({
                            code: 1,
                            msg: '新增成功'
                        })
                    } else {
                        res.send({
                            code: -1,
                            msg: '新增失败'
                        })
                    }
                })
            })
        }
    })
})

// 删除地址
router.post('/delAddr', (req, res) => {
    let data = {
        addrid: req.body.ddrid,
        userid: req.body.userid
    };
    console.log(data);
    let sql = 'delete from addrs where userid = "' + data.userid + '"and addrid = ' + data.addrid;
    sqlQuery(sql, (data1) => {
        if (data1.affectedRows == 1) {
            res.send({
                code: 1,
                msg: '删除成功'
            })
        } else {
            res.send({
                code: 1,
                msg: '删除失败'
            })
        }
    })
})
// 地址信息（用户，地址（省 市 区 详细地址（），电话）------向上-------------------


// api
// 单个商品检验是否在购物车
router.get('/selCarItme', (req, res) => {
    let data = {
        userid: req.query.userid,
        goodsid: req.query.goodsid
    }

    let sql = 'select * from car where userid = "' + data.userid + '" and goodsid = "' + data.goodsid + '"';
    // console.log(sql)
    sqlQuery(sql, (data1) => {
        if (data1.length == 1) {
            res.send({
                code: 1,
                msg: '已加入购物车'
            })
        } else {
            res.send({
                code: 0,
                msg: '未加入购物车'
            })
        }
    })

})

// 加入、移出购物车
router.post('/addBuyCar', (req, res) => {
    let data = {
        userid: req.body.serid,
        goodsid: req.body.goodsid,
    }
    let sql = 'select * from car where userid = "' + data.userid + '" and goodsid = "' + data.goodsid + '"';
    // console.log(sql)
    sqlQuery(sql, (data1) => {
        if (data1.length == 1) {
            let sql1 = 'delete from car where userid = "' + data.userid + '" and goodsid = "' + data.goodsid + '"';
            sqlQuery(sql1, data2 => {
                if (data2.affectedRows == 1) {
                    res.send({
                        msg: '已移出购物车',
                        code: 0
                    })
                } else {
                    res.send({
                        msg: '移出失败',
                        code: -1
                    })
                }
            })
        } else {
            let sql2 = 'insert into car(userid,goodsid) values("' + data.userid + '","' + data.goodsid + '")';
            sqlQuery(sql2, data3 => {
                // console.log(data3)
                if (data3.affectedRows == 1) {
                    res.send({
                        msg: '已加入购物车',
                        code: 1
                    })
                } else {
                    res.send({
                        msg: '加入失败',
                        code: -2
                    })
                }
            })
        }
    })
});

// 查询所有购物车信息
router.get('/selAllCar', (req, res) => {
    let userid = req.query.userid;
    let sql = 'select * from car where userid = "' + userid + '" order by id desc';
    // console.log(sql)
    sqlQuery(sql, (data1) => {
        if (data1.length > 0) {
            let sql2 = '';
            let arr = [];
            for (let i = 0; i < data1.length; i++) {
                sql2 = 'select * from goods where id = "' + data1[i].goodsid + '"';
                sqlQuery(sql2, data2 => {
                    arr.push(data2[0]);
                    if (i == data1.length - 1) {
                        console.log(arr)
                        res.send({
                            code: 1,
                            msg: '存在购物车',
                            car: arr
                        })
                    }
                })
            }
        } else {
            res.send({
                code: 0,
                msg: '无购物车',
                car: []
            })
        }
    })
});

//购物车信息（用户，商品）------向上-------------------

//评论（用户id，商品id,其他用户id）------向下-------------------
// 新增评论
router.post('/addCommit', (req, res) => {
    let date = new Date();
    let yyyy = date.getFullYear();
    let MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let data = {
        userid: req.body.serid,
        goodsid: req.body.goodsid,
        inuserid: req.body.inuserid ? req.body.inuserid : 0,
        time: '' + yyyy + '-' + MM + '-' + dd,
        context: req.body.context,
        star: req.body.star,
        username: '',
        tel: '',
    }

    let sql1 = 'select * from users where id="' + data.userid + '"';
    sqlQuery(sql1, data1 => {
        data.username = data1[0].username;
        data.tel = data1[0].tel;

        let sql = 'insert into commits(userid,goodsid,inuserid,time,context,star,username,tel) values("' + data.userid + '","' + data.goodsid + '","'
            + data.inuserid + '","' + data.time + '","' + data.context + '","' + data.star + '","' + data.username + '","' + data.tel + '")';
        sqlQuery(sql, (data1) => {
            // console.log(data1);
            if (data1.affectedRows == 1) {
                res.send({
                    code: 1,
                    msg: '新增评论成功'
                })
            } else {
                res.send({
                    code: 0,
                    msg: '新增评论失败'
                })
            }
        })
    })


})

// 删除自己的评论，对应商品的id值
router.post('/delCommit', (req, res) => {
    let data = {
        userid: req.body.serid,
        goodsid: req.body.goodsid,
        commitid: req.body.commitid
    }
    // console.log(data);
    let sql = 'delete from commits where id="' + data.commitid + '" and userid="' + data.userid + '"';
    // let sql = 'delete from commits where id=1';
    sqlQuery(sql, (data1) => {
        // console.log(data1);
        if (data1.affectedRows == 1) {
            res.send({
                code: 1,
                msg: '删除自己的评论-成功'
            })
        } else {
            res.send({
                code: 0,
                msg: '删除自己的评论-失败'
            })
        }
    })
})

// 查询所有评论(商品的id)
router.get('/allCommit', (req, res) => {

    let goodsid = req.query.goodsid;
    let userid = req.query.userid;
    let page = req.query.page;
    // console.log(req.query,page);
    let sql = 'select * from commits where goodsid="' + goodsid + '" limit ' + ((page - 1) * 5 + 1) + ',5';  //查询所有的评论，不论是谁的

    sqlQuery(sql, (data1) => {
        // console.log(data1);
        if (data1.length > 0) {  //该商品下的
            let sql1 = 'select max(id) as newid from commits where goodsid="' + goodsid + '" and userid="' + userid + '"';  //查询所有的评论，不论是谁的
            sqlQuery(sql1, (data2) => {
                // console.log(data2);
                for (let i = 0; i < data1.length; i++) {
                    if (data1[i].id == data2[0].newid) {
                        data1.splice(i,1);  //应为每次新增评论后都会刷新页面重新加载数据。而且本人将新增的放在第一条，所以首尾会有相同的页面key值，现在直接在搜索的时候把它去掉，放置防报key错误
                    }
                }
                // console.log(data1,'排除后');
                res.send({
                    code: 1,
                    commits: data1,
                    nextPage: +page + 1
                })
            })

        } else {  //不存在品论
            res.send({
                code: 0,
                commits: [],
                nextPage: +page
            })
        }
    })
})
// 查询刚刚新增的评论(商品的id，userid)
router.get('/oneCommit', (req, res) => {

    let goodsid = req.query.goodsid;
    let userid = req.query.userid;
    // console.log(req.query,page);
    let sql = 'select max(id) as newid from commits where goodsid="' + goodsid + '" and userid="' + userid + '"';  //查询所有的评论，不论是谁的

    sqlQuery(sql, (data1) => {
        console.log(data1);
        if (data1.length > 0) {  //该商品下的
            let sql1 = 'select * from commits where goodsid="' + goodsid + '" and userid="' + userid + '" and id= "' + data1[0].newid + '"';  //查询所有的评论，不论是谁的
            sqlQuery(sql1, (data2) => {
                // console.log(data2);
                if (data2.length > 0) {  //该商品下的 
                    res.send({
                        code: 1,
                        commits: data2,
                    })
                } else {  //不存在品论
                    res.send({
                        code: 0,
                        commits: []
                    })
                }
            })
        } else {  //不存在品论
            res.send({
                code: 0,
                commits: []
            })
        }
    })
})


//评论（用户id，商品id,其他用户id）------向上-------------------



//-----------下单------向下----------------------------------------------------------------------------

// 用户查询所有订单(userid)
router.get('/myAllOrder', (req, res) => {

    let userid = req.query.userid;

    // console.log(req.query);
    let sql = 'select * from orders where userid="' + userid + '" order by id desc';  //查询自己所有的订单

    sqlQuery(sql, (data1) => {
        console.log(data1);
        if (data1.length > 0) {  //该商品下的
            res.send({
                code: 1,
                orders: data1,
            })
        } else {  //不存在品论
            res.send({
                code: 0,
                orders: [],
            })
        }
    })
})

// 用户查询某个订单(userid，orderNo)
router.get('/myOrderByOrderidAndUserid', (req, res) => {

    let userid = req.query.userid;
    let orderid = req.query.orderid;
    let id = req.query.id;

    let sql = '';
    if (id == null || id === 'undefined') {
        sql = 'select * from orders where userid="' + userid + '" and orderid="' + orderid + '"';  //查询自己的某个订单号下面的呢商品
    } else {
        sql = 'select * from orders where userid="' + userid + '" and orderid="' + orderid + '" and id="' + id + '"';  //查询自己的一个指定订单的
    }
    // console.log(sql);
    sqlQuery(sql, (data1) => {
        // console.log(data1);
        if (data1.length > 0) {  //该商品下的
            res.send({
                code: 1,
                orders: data1,
            })
        } else {  //不存在品论
            res.send({
                code: 0,
                orders: [],
            })
        }
    })
})

// 用户新增所有订单(userid)
router.post('/addOrder', (req, res) => {
    let data = { ...req.body }
    data.status = "未支付";
    // let sql = 'select * from commits where goodsid="' + goodsid + '" limit ' + (page - 1) * 5 + ',5';  //查询所有的评论，不论是谁的
    let sql = 'insert into orders(orderid,payprice,goodsid,orderprice,goodsname,goodsaddr,count,userid,tel,useraddr,username,imgurl,status,company,type,material,height,city,remark) values("'
        + data.rderid + '","' + data.payprice + '","' + data.goodsid + '","' + data.orderprice + '","' + data.goodsname + '","'
        + data.goodsaddr + '","' + data.count + '","' + data.userid + '","' + data.tel + '","' + data.useraddr + '","' + data.username + '","'
        + data.imgurl + '","' + data.status + '","' + data.company + '","' + data.type + '","' + data.material + '","' + data.height + '","' + data.city + '","' + data.remark + '")';
    // console.log(data)
    // console.log(sql)
    sqlQuery(sql, (data1) => {
        console.log(data1);
        if (data1.affectedRows > 0) {

            res.send({
                code: 1,
                msg: '插入成功',
                id: data1.id
            })
        } else {
            res.send({
                code: 0,
                msg: '插入失败'
            })
        }
    })
})

// 用户删除单个订单(userid,id)
router.post('/delOrder', (req, res) => {
    let data = { ...req.body }
    // let sql = 'select * from commits where goodsid="' + goodsid + '" limit ' + (page - 1) * 5 + ',5';  //查询所有的评论，不论是谁的
    let sql = 'delete from orders where id = "' + data.id + '" and userid="' + data.userid + '"';
    sqlQuery(sql, (data1) => {
        console.log(data1);
        if (data1.affectedRows == 1) {
            res.send({
                code: 1,
                msg: '删除成功'
            })
        } else {
            res.send({
                code: 0,
                msg: '删除失败'
            })
        }
    })
})

// 用户修改订单(userid\id\status)，确认支付
router.post('/editOrder', (req, res) => {
    let data = { ...req.body }
    // let sql = 'select * from commits where goodsid="' + goodsid + '" limit ' + (page - 1) * 5 + ',5';  //查询所有的评论，不论是谁的
    let sql = 'update orders set status="已支付" where id = "' + data.id + '" and userid="' + data.userid + '"';
    // 支付成功之后需要修改商品数据中的个数
    let sql1 = 'select count,sales from goods where id="' + data.oodsid + '"'; //查询对应的商品的量，让他减一在修改回去
    let sql2 = '';
    // console.log(data)
    // console.log(sql1)
    // console.log(sql2)
    sqlQuery(sql1, data1 => {  //查询存在count>0 就是有存货
        // console.log(data1[0].count , data.count);
        if (data1[0].count >= data.count) {
            sql2 = 'update goods set count = "' + (data1[0].count - data.count) + '",sales = "' + (data1[0].sales + data.count)+'" where id = "' + data.oodsid + '"'; //修改回去
            sqlQuery(sql, (data2) => {  //有存货，可以下单了
                // console.log(data2);
                if (data2.affectedRows >= 1) {  //下完单我就把我的库存商品发给你
                    // console.log(sql2);
                    sqlQuery(sql2, data3 => {
                        // console.log(data3);
                        if (data3.affectedRows > 0) {  //看到我的商品减一啦，说明我们完成交易了
                            res.send({
                                code: 1,
                                msg: '支付成功'
                            });
                        } else {
                            res.send({
                                code: 0,
                                msg: '支付失败无法出库'
                            })
                        }
                    })
                } else {
                    res.send({
                        code: 2,
                        msg: '有货，但下单失败'
                    })
                }
            })
        } else {
            res.send({
                code: 3,
                msg: '库存不足，只有' + data1[0].count + '件'
            })
        }
    })
})

//-----------下单------向上-----------------------------------------------------------------------------



// =======================================用户操作区=======向上=============================

// 路由配置-------------------------

module.exports = router;