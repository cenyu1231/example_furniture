import ComHeader from './../../../../components/comHeader/comHeader';
import { useState } from 'react';
import { useEffect } from 'react';
import './orderDetailsCss.less';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addOrder, getAllAddrs, getGoodsToOrderList, delOrder, myOrderByOrderidAndUserid } from "../../../../api/api";
import xiugai from './xiugai.png';


function OrderDetails(props) {
    const [myOrder, setMyOrder] = useState({});
    const [addrs, setAddrs] = useState([]);
    const [showAddr, setShowAddr] = useState(false);
    const [beizhu, setBeizhu] = useState('');
    const [tishi, setTishi] = useState('');
    useEffect(() => {
        // console.log(props.location.state)
        init();
    }, [])

    // 初始化
    function init() {
        let allNeedData = props.location.state.AllNeedData;
        let goods = props.location.state.goods;
        let goodsids = [];//选中的商品的id
        let selectorGoodsInfo = []; //选中的商品的数量的信息
        for (let i = 0; i < goods.length; i++) {
            if (goods[i].selectImg) {
                goodsids.push(+goods[i].id);
                for (let n = 0; n < allNeedData.length; n++) {
                    if (goods[i].id == allNeedData[n].id) {
                        selectorGoodsInfo.push(allNeedData[n]);
                    }
                }
            }
        }
        let temp = goodsids.toString()
        // console.log(typeof temp)

        // 获取指定的要购买的商品（id集合）
        getGoodsToOrderList('/getGoodsToOrderList', { temp }).then(res => {
            // console.log(res);
            let temp = res;
            for (let i = 0; i < temp.length; i++) {
                for (let n = 0; n < selectorGoodsInfo.length; n++) {
                    if (temp[i].id == selectorGoodsInfo[n].id) {
                        temp[i].buyCount = selectorGoodsInfo[n].count;
                    }
                }
            }
            setMyOrder({ ...myOrder, goods: temp, totalPrice: props.location.state.totalPrice })
        })
    }
    //选择地址弹窗中的点击
    function sure(ele) {
        // console.log(ele)
        let temp = '' + ele.province + '-' + ele.city + '-' + ele.area + '-' + ele.detailsAddr;
        setMyOrder({
            ...myOrder,
            username: props.user.username,
            addr: temp,
            tel: ele.tel
        });
        setShowAddr(false);
        // console.log(myOrder)
    }
    // 打开地址弹窗
    function openAddr() {
        getAllAddrs('/getAllAddrs', { id: props.user.userid }).then(res => {
            // console.log(res);
            setAddrs(res.addrs);
            setShowAddr(true);
        })
    }
    // 备注
    function Beizhu(e) {
        setBeizhu(e.target.value);
        // console.log(beizhu);
    }
    // 提交订单(节流)
    let timer = null;
    function submit() {
        // console.log(myOrder.goods)
        if (timer) {
            clearTimeout(timer);
            timer = null;
            return;
        }
        timer = setTimeout(() => {
            xiadan();
        }, 1000)

    }
    // 准备数据下单
    function xiadan() {
        // 下单
        let params = {
            // id自动生成
            // orderid
            orderid: getOrderNo(),
            userid: props.user.userid,
            username: props.user.username,
            tel: myOrder.tel,
            useraddr: myOrder.addr,
            remark: beizhu
        }
        let arr = [];
        if (myOrder.goods.length <= 0 || params.useraddr == '' || params.useraddr == null) {
            window.alert('请先选择商品和收货地址');
            return;
        }
        for (let i = 0; i < myOrder.goods.length; i++) {
            params.goodsid = myOrder.goods[i].id;
            params.goodsname = myOrder.goods[i].name;
            params.count = myOrder.goods[i].buyCount;
            params.orderprice = myOrder.goods[i].price;
            params.payprice = myOrder.goods[i].price * myOrder.goods[i].buyCount;
            params.imgurl = myOrder.goods[i].imgurl;
            params.company = myOrder.goods[i].company;
            params.type = myOrder.goods[i].type;
            params.material = myOrder.goods[i].material;
            params.height = myOrder.goods[i].height;
            params.city = myOrder.goods[i].city;
            params.goodsaddr = '' + myOrder.goods[i].city + '-' + myOrder.goods[i].area + '-' + myOrder.goods[i].company;
            addOrder('/addOrder', { ...params }).then(res => {
                // console.log(res)
                if (i === (myOrder.goods.length - 1)) {
                    setTishi('生成订单···');
                    setTimeout(() => {
                        setTishi('');
                        props.history.push({ pathname: '/my/describeOrder', state: { orderid: params.orderid, userid: params.userid } });
                    }, 2000)
                }
                if (res.code == 1 && i == myOrder.goods.length - 1) {  //最后一条数据发送返回结果后，启动计时器，5分钟不支付，则自动取消订单
                    setTimeout(() => {
                        myOrderByOrderidAndUserid('/myOrderByOrderidAndUserid', { orderid: params.orderid, userid: params.userid, id: res.id }).then(res1 => {
                            console.log(res1);
                            for (let j = 0; j < res1.orders.length; j++) {
                                if (res1.orders[j].status == '未支付') {
                                    delOrder('/delOrder', { goodsid: res.goodsid, id: res1.orders[j].id, userid: res1.orders[j].userid }).then(res2 => {
                                        // console.log(res2);
                                    })
                                }
                            }
                        })

                    }, 300000)
                }

            })
        }
        // 缺少订单生成中提示（最好简易失败还是成功（差数据库））
        // 跳转到确认订单页面

    }

    // 生成订单编号
    function getOrderNo() {
        // getDay返回的是星期，getDate返回的时日期
        let time = new Date();
        let year = time.getFullYear();
        let MM = time.getMonth() < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
        let dd = time.getDate()  < 10 ? '0' + time.getDate() : time.getDate();
        let HH = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
        let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
        let ss = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
        let mytime = 'AY' + year + MM + dd + HH + mm + ss;
        return mytime;
    }
    return (<div style={{ "paddingTop": "50px", "position": "relative" }}>
        <ComHeader title='请下单' />
        {
            tishi != '' ? <div style={{ "display": "block", "width": "100px", "height": "40px", "lineHeight": "40px", "position": "fixed", "top": "50%", "left": "50%", "margin": "-20px 0 0 -50px", "backgroundColor": "#00bb00", "zIndex": "10", "textAlign": "center", "borderRadius": "10px" }}>{tishi}</div> : <div style={{ "position": "fixed", "zIndex": "-99" }}></div>
        }
        <div id="order-content">
            {/* 生成订单和订单详情
            1、地址
            选着配送时间
            2、商品信息
            3、备注
            4、提交生成订单时同时生成下单时间、单号(年月日时分秒处理成的字符串) */}
            {/* 地址块 */}
            <div className='order-com order-addr'>
                <div style={{ "textAlign": "center", fontWeight: "600" }}>收货地址</div>
                <hr />
                <div onClick={openAddr} style={{ color: "#666666" }}>
                    {
                        myOrder.username ? <div>
                            收货人：{myOrder.username} <br />
                            电 话：{myOrder.tel} <br />
                            地 址：{myOrder.addr}
                        </div> : <span style={{ "textAlign": "center", margin: "20px 0", display: "block", "textAlign": "center" }}>立即选择</span>
                    }

                </div>
                {
                    showAddr ? <div style={{ "position": "fixed", "backgroundColor": "#555555", "zIndex": "100", "left": "0", "right": "0", "top": "42px", "bottom": "0", "opacity": "0.9" }}>
                        <div style={{ "width": "300px", "height": "540px", "position": "fixed", top: "50%", "marginTop": "-270px", left: "50%", "marginLeft": "-150px", "backgroundColor": "#000000", "opacity": "1", "borderRadius": "10px", "boxSizing": "border-box", "padding": "4px" }}>
                            <div style={{ "height": "502px", "backgroundColor": "#ffffff", "color": "#000000", "padding": "10px 0 20px 0", "borderRadius": "10px", "overflow": "hidden", fontSize: "15px" }}>
                                <div style={{ "textAlign": "center" }}>选择地址</div>
                                <hr />
                                <div style={{ "overflow": "scroll", height: "490px", "position": "relative", top: "-8px" }}>
                                    <>{
                                        addrs.length <= 0 ? (<div
                                            style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#ffffff", fontSize: "0.4rem" }}>
                                            暂无收货地址
                                        </div>) : (<div>
                                            {
                                                addrs.map((ele) => {
                                                    // console.log(ele)
                                                    return (
                                                        <div className="addrs-item" key={ele.addrid} onClick={sure.bind(null, ele)}>
                                                            <div>
                                                                {props.user.username} - {ele.tel}
                                                            </div>
                                                            <div>
                                                                {ele.province}-{ele.city}-{ele.area}-
                                                                {ele.detailsAddr}
                                                            </div>
                                                            <Link to={{ pathname: '/my/addrdetails', state: { ...ele, username: props.user.username } }}>
                                                                <img src={xiugai} alt="修改图片" />
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>)
                                    }</>
                                </div>
                                <div style={{ "textAlign": "center", "position": "relative", top: "-22px" }}>
                                    <Link to={{ pathname: '/my/addrdetails', state: { ...props.user } }}>
                                        <button style={{ "width": "50%", }}>新增地址</button>
                                    </Link>
                                    <button style={{ "width": "50%" }} onClick={() => { setShowAddr(false) }}>返回</button>
                                </div>
                            </div>
                        </div>
                    </div> : <></>
                }
            </div>
            {/* 商品详细说明区域 */}
            <div className='order-com order-details'>
                <div style={{ "textAlign": "center", fontWeight: "600" }}>商品详细数据</div>
                <hr />
                <div>
                    {
                        myOrder.goods ? <>{
                            myOrder.goods.map((ele, index) => (<div key={ele.id}>
                                商品{index + 1} <br />
                                <div style={{ width: "100%", margin: "10px 0", fontSize: "0.2rem", display: "flex" }}>
                                    <div style={{ "flex": "2" }}>
                                        <img style={{ "width": "1.1rem", "height": "1.1rem" }} src={ele.imgurl} alt={ele.name} />
                                    </div>
                                    <div style={{ "flex": "8", marginLeft: "5px" }}>
                                        <div style={{ "margin": "5px" }}>
                                            商品：{ele.name}
                                        </div>
                                        <div style={{ "margin": "5px" }}>
                                            价格：{ele.price} 元
                                        </div>
                                        <div style={{ "margin": "5px" }}>
                                            发货地址：{ele.city}-{ele.area}-{ele.company} <br />
                                        </div>
                                        <div style={{ "margin": "5px" }}>
                                            商品信息：{ele.material} | {ele.type} | {ele.height}cm
                                        </div>
                                    </div>
                                    <div style={{ "flex": "2", "lineHeight": "1.1rem", fontWeight: "500" }}>
                                        x {ele.buyCount}
                                    </div>
                                </div>
                            </div>))
                        }</> : <></>
                    }
                </div>
            </div>
            {/* 备注 */}
            <div className="order-com" style={{ "textAlign": "center", fontWeight: "600" }}>
                <div>备注</div>
                <hr />
                <textarea name="" id="" cols="30" rows="2" style={{ "backgroundColor": "#dddddd", width: "96%" }} value={beizhu} onChange={Beizhu}></textarea>
            </div>
        </div>

        {/* 价格显示 */}
        <div id='order-btm'>
            <div><span>￥</span>{myOrder.totalPrice}</div>
            <div>找人付</div>
            <div onClick={submit}>提交订单</div>
        </div>
    </div>)
}

export default connect((state) => (state))(OrderDetails);