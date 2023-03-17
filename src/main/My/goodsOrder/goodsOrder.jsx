import ComHeader from "../../../components/comHeader/comHeader";
import './goodsOrderCss.less';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StarDeal from '../../../components/starDeal/starDeal';
import { delOrder, myAllOrder, editOrder, addCommit } from "../../../api/api";


function GoodsOrder(props) {

    const [orders, setOrders] = useState([]);
    const [tishi, setTishi] = useState('');
    const [openCommit, setOpenCommit] = useState(false);
    const [textareaVal, setTextareaVal] = useState('');
    const [starNum1, setStarNum1] = useState(0);  //当用户点赞的时候传回星星组件
    const [pingjiaTemp, setPingjiaTemp] = useState({});  //当用户点击评价时临时保存一个对象数据
    useEffect(() => {
        init();
    }, []);

    // 初始化
    function init() {
        myAllOrder('/myAllOrder', { userid: props.user.userid }).then(res => {
            // console.log(res);
            setOrders(res.orders);
        })
    }
    // console.log(props.location.state)

    // 删除某个订单
    function delOrderByIdAndUserid(ele) {
        // console.log(ele)
        delOrder('/delOrder', { goodsid: ele.goodsid, id: ele.id, userid: ele.userid }).then(res => {
            // console.log(res);
            setTishi(res.msg);
            if (res.code == 1) {
                setTimeout(() => {
                    init();
                    setTishi('');
                }, 2000);
            } else {
                setTimeout(() => {
                    setTishi('');
                }, 2000);
            }
        })
    }
    // 取消某个订单
    function backOrderByIdAndUserid(ele) {
        // console.log(ele)
        delOrder('/delOrder', { goodsid: ele.goodsid, id: ele.id, userid: ele.userid }).then(res => {
            // console.log(res);
            if (res.code == 1) {
                setTishi("取消成功");
                setTimeout(() => {
                    init();
                    setTishi('');
                }, 2000);
            } else {
                setTishi("取消失败");
                setTimeout(() => {
                    setTishi('');
                }, 2000);
            }
        })
    }
    // 修改某个未支付订单为已支付
    function sureOrderByIdAndUserid(ele) {
        // console.log(ele)
        editOrder('/editOrder', { goodsid: ele.goodsid, id: ele.id, userid: ele.userid ,count:ele.count}).then(res => {
            // console.log(res);
            setTishi(res.msg);
            if (res.code == 1) {
                setTimeout(() => {
                    init();
                    setTishi('');
                }, 2000);
            } else {
                setTimeout(() => {
                    setTishi('');
                }, 2000);
            }

        })
    }

    // 评论这个订单的这个商品
    // 新增评论
    function commiit() {
        if (textareaVal == '' || textareaVal == null) {
            window.alert('评论内容不能为空')
            return;
        }
        // console.log(pingjiaTemp);
        addCommit('/addCommit', {
            userid: pingjiaTemp.userid
            , goodsid: pingjiaTemp.goodsid
            , inuserid: 0
            , context: textareaVal
            , star: starNum1
        }).then(res => {
            // console.log(res)
            setTishi(res.msg)
            setTimeout(() => {
                setTishi('');
            }, 2000);
            if (res.code == 1) {
                setOpenCommit(false);
                setTextareaVal('');
                setStarNum1(0);
            }
        })
    }
    // 获取用户的点赞的数量
    function getStar(num) {
        // console.log(num);
        setStarNum1(num);
    }
    return (<div>
        <ComHeader title="订单信息" />
        {
            props.user == '' ? ((<Link to='/my/login'>
                <div
                    style={{ width: "100%", textAlign: "center", marginTop: "3rem",  color: "#3333ff", fontSize: "0.4rem" }}>
                    未登录·点我
                </div>
            </Link>)) :
                orders.length == 0 ? (<div
                    style={{ width: "100%", textAlign: "center", marginTop: "3rem",  color: "#3333ff", fontSize: "0.4rem" }}>
                    暂无订单
                </div>) : (<div style={{ "width": "96%", margin: "50px auto 0" }}>
                    {/* 操作返回提示 */}
                    {
                        tishi != '' ? <div style={{ "display": "block", "height": "40px", "lineHeight": "40px", "position": "fixed", "top": "50%", "left": "30%",right:"30%",  "marginTop": "-20px", "backgroundColor": "#00bb00", "zIndex": "10", "textAlign": "center", "borderRadius": "10px" }}>{tishi}</div> : <div style={{ "position": "fixed", "zIndex": "-99" }}></div>
                    }
                    {
                        orders.map((ele) => <div className="order_info" key={ele.id}>
                            商家：{ele.company}
                            <Link to={{ pathname: '/my/describeOrder', state: { orderid: ele.orderid, userid: ele.userid, id: ele.id } }}>
                                <span style={{ "color": "red", "float": "right", "backgroundColor": "#d0d0d0", "padding": "3px 6px", "boxSizing": "border-box", "color": "#df0000" }}>
                                    订单详情
                                </span>
                            </Link>
                            <hr />
                            <div style={{ "display": "flex", "backgroundColor": "#ddff" }}>
                                <div style={{ "flex": "2", "textAlign": "center" }}>
                                    <Link to={{ pathname: '/goods/details/', state: { id: ele.goodsid, city: ele.city } }}>
                                        <img style={{ "height": "1.5rem" }} src={ele.imgurl} alt={ele.name} />
                                    </Link>
                                </div>
                                <div style={{ "flex": "8", "paddingLeft": "5px", "boxSizing": "border-box", "fontSize": "0.1rem", "lineHeight": "0.3rem" }}>
                                    商品：{ele.goodsname} ({ele.material} | {ele.type} | {ele.height}cm)<br />
                                    支付：{ele.orderprice} 元 * {ele.count} 个 = {ele.payprice} 元<br />
                                    发货：{ele.goodsaddr} <br />
                                    用户：{ele.username} - {ele.tel} <br />
                                    收货：{ele.useraddr}
                                </div>
                                <div style={{ "flex": "1.5", "lineHeight": "1.5rem", "textAlign": "center", "color": ele.status == '未支付' ? "#6666ff" : "#008800" }}>{ele.status}</div>
                            </div>
                            <hr />
                            <div style={{ "display": "flex", "fontSize": "0.1rem" }}>
                                <div style={{ "flex": "7" }}>单号：{ele.orderid}</div>
                                {
                                    ele.status == '未支付' ? <><div style={{ "flex": "2.5", "backgroundColor": "#ddaa00", "textAlign": "center", "marginRight": "5px", "borderRadius": "2px" }} onClick={backOrderByIdAndUserid.bind(null, ele)}>取消订单</div>
                                        <div style={{ "flex": "2.5", "backgroundColor": "#6666ff", "color": "#ffffff", "textAlign": "center", "marginRight": "5px", "borderRadius": "2px" }} onClick={sureOrderByIdAndUserid.bind(null, ele)}>确认支付</div>
                                    </> : <div style={{ "flex": "1", "backgroundColor": "#ff2222", "color": "#ffffff", "textAlign": "center", "marginRight": "5px", "borderRadius": "2px" }} onClick={delOrderByIdAndUserid.bind(null, ele)}>删除</div>
                                }
                                <div style={{ "flex": "1", "backgroundColor": "#228833", "color": "#ffffff", "textAlign": "center", "padding": "0px 4px", "borderRadius": "2px" }} onClick={() => { setOpenCommit(!openCommit); setPingjiaTemp(ele); }}>评价</div>
                            </div>
                        </div>)
                    }
                    {
                        openCommit ? <div style={{
                            width: "80%",
                            height: "6rem", backgroundColor: "#fffff7", "position": "fixed", left: "50%", top: "50%", marginLeft: "-40%", marginTop: "-3rem", zIndex: "999",
                            "padding": "15px 10px", "boxSizing": "border-box", "borderRadius": "10px", "boxShadow": "0 0 5px 5px #5555ff"
                        }}>
                            <div style={{ "height": "94%", "textAlign": "center" }}>
                                <textarea name="" id="" cols="30" rows="10" style={{ "width": "95%", "height": "70%", "textAlign": "center" }}
                                    value={textareaVal} onChange={(e) => { setTextareaVal(e.target.value) }}
                                ></textarea>
                                <br /><br />
                                点赞吧：<StarDeal star={starNum1} starNum='5' getStar={getStar} />
                            </div>
                            <div style={{ "textAlign": "center" }}>
                                <button style={{ "margin": "0 10px" }} onClick={() => { setTextareaVal(''); setOpenCommit(false); setStarNum1(0); }}>取消</button>
                                <button style={{ "margin": "0 10px" }}
                                    onClick={() => {
                                        // console.log(this.state.textareaVal);
                                        commiit();
                                    }}
                                >提交</button>
                            </div>
                        </div> : <></>
                    }
                </div>)

        }
    </div>)
}

export default connect(state => state)(GoodsOrder);