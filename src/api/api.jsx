import { fetchGet,fetchPost } from './http';


// 初始化区域
// 请求轮播图数据
export const getSwiper = (url ,data)=>fetchGet(url,data);
// 请求热门数据
export const getHotRecommend = (url ,data)=>fetchGet(url,data);
// 请求精品数据
export const getFestRecommend = (url ,data)=>fetchGet(url,data);
// 请求精品数据
export const getMaxRecommend = (url ,data)=>fetchGet(url,data);
// 请求商品列表
export const getGoodsList = (url ,data)=>fetchGet(url,data);



// 请求单个商品
export const getGoodsItem = (url ,data)=>fetchGet(url,data);


// // 请求该商品下的所有评论
// export const getGoodsCommit = (url ,data)=>fetchGet(url,data);


// 用户区，向下
// 登录
export const register = (url ,data)=>fetchPost(url,data);
// 注册
export const login = (url ,data)=>fetchPost(url,data);
// 注销用户
export const delUser = (url ,data)=>fetchPost(url,data);
// 退出登录
// 退出登录功能此处没有用户状态,故没有做,要想退出登录,前端直接删除redux和浏览器本地存储就可.
// 修改用户信息
export const editUser = (url ,data)=>fetchPost(url,data);
// 查询用户信息
export const selUser = (url ,data)=>fetchGet(url,data);


// 收藏区，向下
// 收藏和取消收藏
export const setShoucang = (url ,data)=>fetchPost(url,data);
// 单个检验收藏
export const getShoucang = (url ,data)=>fetchGet(url,data);
// 所有收藏
export const getAllShoucang = (url ,data)=>fetchGet(url,data);


// 地址区，向下
// 查询所有地址
export const getAllAddrs = (url ,data)=>fetchGet(url,data);
// 新增、修改地址
export const addAeditUserAddrs = (url ,data)=>fetchPost(url,data);
// 删除地址
export const delAddr = (url ,data)=>fetchPost(url,data);


// 购物车区，向下
// 查询商品是否在购物车中
export const selCarItme = (url ,data)=>fetchGet(url,data);
// 查询购物车中的所有商品
export const selAllCar = (url ,data)=>fetchGet(url,data);
// 加入购物车
export const addBuyCar = (url ,data)=>fetchPost(url,data);
// 移出购物车
export const delCarItem = (url ,data)=>fetchPost(url,data);


// 评论区，向下
// 新增评论
export const addCommit = (url ,data)=>fetchPost(url,data);
// 删除评论（改商品的id,品论的id,用户的id）只能删除自己的
export const delCommit = (url ,data)=>fetchPost(url,data);
// 查询所有评论（改商品的id）
export const allCommit = (url ,data)=>fetchGet(url,data);
// 查询最新的一条评论（goodsid,userid）
export const oneCommit = (url ,data)=>fetchGet(url,data);


// 订单区 ，向下
// 请求要下单的商品列表
export const getGoodsToOrderList = (url ,data)=>fetchGet(url,data);
// 下单
export const addOrder = (url ,data)=>fetchPost(url,data);
// 查询自己所有订单
export const myAllOrder = (url ,data)=>fetchGet(url,data);
// 删除某个订单（userid,id）
export const delOrder = (url ,data)=>fetchPost(url,data);
// 修改订单状态（用户自己为支付）（id\userid\status）
export const editOrder = (url ,data)=>fetchPost(url,data);
// 查询自己的某个订单(userid,orderid)
export const myOrderByOrderidAndUserid = (url ,data)=>fetchGet(url,data);

