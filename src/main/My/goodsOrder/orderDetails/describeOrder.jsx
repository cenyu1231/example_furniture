import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { myOrderByOrderidAndUserid, delOrder, editOrder } from "../../../../api/api";
import ComHeader from "../../../../components/comHeader/comHeader";


function DescribeOrder(props) {

    const [myOrders, setMyOrders] = useState({});
    const [tishi, setTishi] = useState('');
    const [zhifutishi, setZhiftishi] = useState('您好');

    useEffect(() => {
        // console.log(111,props);
        init();
    }, []);

    // 初始化
    function init() {
        myOrderByOrderidAndUserid('/myOrderByOrderidAndUserid', { orderid: props.location.state.orderid, userid: props.location.state.userid, id: props.location.state.id }).then(res => {
            // console.log(res);
            setMyOrders(res.orders);
        })
    }

    // 取消某个订单
    function backOrderByIdAndUserid(ele) {
        // console.log(ele)
        delOrder('/delOrder', { goodsid: ele.goodsid, id: ele.id, userid: ele.userid }).then(res => {
            // console.log(res);
            if (res.code == 1) {
                setTishi("取消成功");
                init();
                setTimeout(() => {
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
        editOrder('/editOrder', { goodsid: ele.goodsid, id: ele.id, userid: ele.userid, count: ele.count }).then(res => {
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

    return (<div style={{ "position": "relative", "padding": "42px 0" }}>
        <ComHeader title="你本次订单" />
        {/* 订单布局 */}
        {
            myOrders.length > 0 ? <div >
                {/* 操作返回提示 */}
                {
                    tishi != '' ? <div style={{ "display": "block", "height": "40px", "lineHeight": "40px", "position": "fixed", "top": "50%", "margin": "-20px 0 0", left: "20%", right: "20%", textAlign: "center", "backgroundColor": "#00bb00", "zIndex": "10", "borderRadius": "10px", "padding": "0 5px", color: "#ffffff" }}>{tishi}</div> : <div style={{ "position": "fixed", "zIndex": "-99" }}></div>
                }
                {/* 支付提示 */}
                {
                    zhifutishi != '' ? <div style={{ "display": "block", "height": "300px", "lineHeight": "40px", "position": "fixed", "top": "40%", "margin": "-150px 0 0", left: "15%", right: "15%", textAlign: "center", "backgroundColor": "#ff9900", "zIndex": zhifutishi != '' ? "999":"-999", "borderRadius": "10px", "padding": "0 5px", color: "#000000" }}>
                        <div style={{"height":"60px","lineHeight":"90px",fontWeight:"600"}}>系统通知</div>
                        <div style={{"lineHeight":"20px","boxSizing":"border-box","padding":"25px"}}>您好，感谢使用-安逸家具-网站，如果您下单订单成功，请在--（五分钟内）--确认支付，否则系统可能自动删除过期未支付的订单！</div>
                        <div style={{"height":"40px","lineHeight":"20px","boxSizing":"border-box","padding":"20px"}} onClick={()=>{ setZhiftishi(''); }}><button>确认已读</button></div>
                        
                    </div> : <div style={{ "position": "fixed", "zIndex": "-99" }}></div>
                }
                {
                    myOrders.map((ele, index) => (<div key={ele.id} style={{ "width": "auto", "backgroundColor": "#ffffff", "margin": "10px 1%", "borderRadius": "5px", "overflow": "hidden", fontSize: "0.2rem", }}>
                        <div style={{ "textAlign": "center", "fontWeight": "800", "padding": "10px", "backgroundColor": "#d3d3d3", "borderBottom": "3px solid #a3a3a3" }}>订单{index + 1}</div>
                        <div style={{ "backgroundColor": "#ddddff", "boxSizing": "border-box", "padding": "10px 10px", "borderBottom": "1px solid #a3a3a3" }}>
                            收货人：{ele.username}   <br />
                            电 话：{ele.tel}   <br />
                            地 址：{ele.useraddr}
                        </div>
                        <div style={{ "backgroundColor": "#ddddff", "padding": "10px 10px", "borderBottom": "1px solid #a3a3a3" }}>
                            <div style={{ width: "100%", display: "flex" }}>
                                <div style={{ "flex": "2" }}>
                                    <img style={{ "width": "100%" }} src={ele.imgurl} alt={ele.name} />
                                </div>
                                <div style={{ "flex": "4", marginLeft: "5px" }}>
                                    <div style={{ "margin": "5px" }}>
                                        订单号：{ele.orderid}
                                    </div>
                                    <hr />
                                    <div style={{ "margin": "5px" }}>
                                        商品：{ele.goodsname}
                                    </div>
                                    <div style={{ "margin": "5px" }}>
                                        价格：{ele.orderprice} 元
                                    </div>
                                    <div style={{ "margin": "5px" }}>
                                        数量：x {ele.count} 个
                                    </div>
                                    <div style={{ "margin": "5px" }}>
                                        商品组成：{ele.material} | {ele.type} | {ele.height}cm
                                    </div>
                                    <hr />
                                    <div style={{ "margin": "5px" }}>
                                        商家：{ele.company} <br />
                                    </div>
                                    <div style={{ "margin": "5px" }}>
                                        发货地址：{ele.goodsaddr} <br />
                                    </div>
                                    <hr />
                                    <div style={{ "margin": "5px", "display": "flex" }}>
                                        <div style={{ "flex": "5" }}>
                                            支付：{ele.payprice} 元
                                        </div>
                                        <div style={{ "flex": "4" }}>
                                            订单状态：{ele.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ "backgroundColor": "#ddddff", "padding": "10px 10px" }}>
                            {
                                ele.status == '未支付' ? <>
                                    <div style={{ "backgroundColor": "#dd8800", "textAlign": "center", "marginRight": "5px", "borderRadius": "2px", "padding": "5px 0", "marginBottom": "5px", "lineHeight": "16px" }} onClick={backOrderByIdAndUserid.bind(null, ele)}>取消订单</div>
                                    <div style={{ "backgroundColor": "#6666ff", "color": "#ffffff", "textAlign": "center", "marginRight": "5px", "borderRadius": "2px", "padding": "5px 0", "lineHeight": "16px" }} onClick={sureOrderByIdAndUserid.bind(null, ele)}>确认支付</div></>
                                    : <div style={{ "backgroundColor": "#6666ff", "color": "#ffffff", "textAlign": "center", "marginRight": "5px", "borderRadius": "2px", "padding": "5px 0", "lineHeight": "16px" }} onClick={() => { window.history.back() }}>返回</div>
                            }

                        </div>
                    </div>))
                }
            </div> : <div style={{ "display": "block", "width": "150px", "height": "40px", "lineHeight": "40px", "position": "fixed", "top": "40%", "left": "50%", "margin": "-20px 0 0 -75px", "zIndex": "10", "textAlign": "center", "color": "#0000aa", "fontWeight": "600" }}>暂无订单操作</div>
        }
        <div style={{ "position": "fixed", "left": "0", "right": "0", "bottom": "10px", "textAlign": "center" }}>
            <Link to='/my/goodsorder' >
                <button style={{ "width": "100%", "backgroundColor": "#ff8800", "border": "none" }}>我的订单</button>
            </Link>
        </div>
    </div>)
}

export default connect(state => state)(DescribeOrder);