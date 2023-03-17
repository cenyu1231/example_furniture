import ComHeader from "../../../components/comHeader/comHeader";
import { useEffect, useState } from 'react';
import { getAllShoucang, setShoucang } from './../../../api/api';
import './collectCss.less';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Collect(props) {
    const [info, setInfo] = useState([]);
    useEffect(() => {
        getAll();
    }, [])
    // 获取所有收藏
    function getAll() {
        getAllShoucang('/getAllShoucang', { userid: props.user.userid }).then(res => {
            // console.log(res.collect)
            setInfo(res.collect);
        })
    }

    // 取消收藏
    function quxXiao(ele) {
        setShoucang('/setShoucang', {
            userid: props.user.userid
            , goodsid: ele.id
        }).then(res => {
            getAll();
        })
    }

    return (<div style={{ "paddingTop": "45px", "position": "relative" }}>
        <ComHeader title="我的收藏" />
        {
            props.user ? (<>
                {
                    info.length <= 0 ? (<div
                        style={{ width: "100%", textAlign: "center", marginTop: "3rem",  color: "#3333ff", fontSize: "0.4rem" }}>
                        暂无收藏
                    </div>) : <>
                        {
                            info.map(ele => (
                                <div className="my-collect" key={ele.id}>
                                    <div>
                                        <Link to={{ pathname: '/goods/details/', state: { id: ele.id, city: ele.city } }} >
                                            <img src={ele.imgurl} alt={ele.name} />
                                        </Link>
                                    </div>
                                    <div>
                                        商品：{ele.name}   <br />
                                        发货地址：{ele.city} -{ele.area}- {ele.company}   <br />
                                        店铺：{ele.company} <br />
                                        价格：{ele.price} ￥   <br />
                                    </div>
                                    <div>
                                        <button onClick={quxXiao.bind(null, ele)}>—</button>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                }
            </>) : (<Link to='/my/login'>
                <div
                    style={{ width: "100%", textAlign: "center", marginTop: "3rem",  color: "#3333ff", fontSize: "0.4rem" }}>
                    未登录·点我
                </div>
            </Link>)
        }

    </div>)
}

export default connect((state) => (state))(Collect);