import ComHeader from "../../../components/comHeader/comHeader";
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getAllAddrs } from "../../../api/api";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './addrInfoCss.less';
import xiugai from './xiugai.png';

function AddrInfo(props) {
    const [addrs, setAddrs] = useState([])
    useEffect(() => {
        let userid =  props.user.userid;
        getAllAddrs('/getAllAddrs', { username: props.user,id:userid }).then(res => {
            // console.log(res);
            setAddrs(res.addrs);
        })
    }, [])
    // console.log(addrs);
    return (<div style={{ "padding": "45px 0", "position": "relative"}}>
        <ComHeader title="地址信息" />
        {
            props.user ==null ? (<Link to='/my/login'>
            <div
                style={{ width: "100%", textAlign: "center", marginTop: "3rem",  color: "#3333ff", fontSize: "0.4rem" }}>
                未登录·点我
            </div>
        </Link>):(<>{
            addrs.length == 0 ? (<div
                style={{ width: "100%", textAlign: "center", marginTop: "3rem",  color: "#3333ff", fontSize: "0.4rem" }}>
                暂无收货地址
            </div>):(<div>
                {
                    addrs.map((ele) => {
                        // console.log(ele)
                        return (
                            <div className="addrs-item" key={ele.addrid}>
                                <div>
                                    {props.user.username} - {ele.tel}
                                </div>
                                <div>
                                    {ele.province}-{ele.city}-{ele.area}-
                                    {ele.detailsAddr}
                                </div>
                                <Link to={{ pathname: '/my/addrdetails', state: { ...ele,username:props.user.username } }}>
                                    <img src={xiugai} alt="修改图片" />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>)
        }</>)
    }
        <Link to={{ pathname: '/my/addrdetails', state: { ...props.user} }}>
            <div className="addrs-xinzang">
                <button style={{"border":"none"}}>新增地址</button>
            </div>
        </Link>
    </div>)
}

export default connect((state) => (state))(AddrInfo);
