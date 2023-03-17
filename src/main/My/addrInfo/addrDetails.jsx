import ComHeader from "../../../components/comHeader/comHeader";
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addAeditUserAddrs, delAddr } from "../../../api/api";

// span样式
const mystyle = {
    "display": 'inline-block',
    width: "80px",
    textAlign: "right"
}

function AddrDetails(props) {
    const [userid, setUserid] = useState(0);
    const [username, setUsername] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [tel, setTel] = useState('');
    const [area, setArea] = useState('');
    const [detailsAddr, setDetailsAddr] = useState('');
    const [addrid, setAddrid] = useState(0);
    const [tishi, setTishi] = useState(false);
    // console.log(props)

    useEffect(() => {
        init();
    }, [])
    // 
    function init() {
        // console.log(props.location.state)
        if (props.location.state) {
            setUserid(props.location.state.userid)
            setUsername(props.location.state.username)
            if(props.location.state.province){
                setProvince(props.location.state.province)
            }
            if(props.location.state.city){
                setCity(props.location.state.city)
            }
            if(props.location.state.tel){
                setTel(props.location.state.tel)
            }
            if(props.location.state.area){
                setArea(props.location.state.area)
            }
            if(props.location.state.detailsAddr){
                setDetailsAddr(props.location.state.detailsAddr)
            }
            if(props.location.state.addrid){
                setAddrid(props.location.state.addrid)
            }
            return;
        }
    }

    //input值变函数
    function Change(e) {
        let key = e.target.name;
        let value = e.target.value;
        // console.log(key, value);
        switch (key) {
            case 'username':
                setUsername(value);
                break;
            case 'province':
                setProvince(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'tel':
                setTel(value);
                break;
            case 'detailsAddr':
                setDetailsAddr(value);
                break;
            case 'area':
                setArea(value);
                break;
            default:
                break;
        }
    }

    // 保存
    function save() {
        if (province == '' || city == '' || area == '' || tel == '' || detailsAddr == '') {
            setTishi('必要信息不能为空');
            return;
        }
        addAeditUserAddrs('/addAeditUserAddrs', { username, province, city, area, tel, detailsAddr, addrid ,userid}).then(res => {
            setTishi(res.msg);
            // console.log(res.msg)
            if(res.code == 2 || res.code == 1){  //新增、修改成功
                setTimeout(() => {
                    window.history.back();
                }, 1000)
            }
        })
    }

    // 删除
    function myDelAddr() {
        delAddr('/delAddr', {addrid,userid}).then(res => {
            setTishi(res.msg);
            if(res.code == 1){  //成功
                setTimeout(() => {
                    window.history.back();
                }, 1000)
            }
        })
    }

    // 清除数据
    function setClear() {
        setProvince('');
        setCity('');
        setTel('');
        setDetailsAddr('');
        setArea('');
    }
    return (<div>
        <ComHeader title='地址信息' />
        <div style={{
            width: "80%",
            margin: " 30% auto",
            "padding": "20px 0",
            "textAlign": "center",
            "fontWeight": "400"
        }}>
            <span style={mystyle}>用户</span>
            ：<input type="text"
                onChange={Change} name='username'
                value={username}
                disabled
                style={{ margin: "10px 0", "fontWeight": "500" }}
            /> <br />
            <span style={mystyle}>省</span>
            ：<input type="text"
                onChange={Change} name='province'
                value={province}
                style={{ margin: "10px 0", "fontWeight": "500" }}
            /> <br />
            <span style={mystyle}>市</span>
            ：<input type="text"
                onChange={Change} name='city'
                value={city}
                style={{ margin: "10px 0", "fontWeight": "500" }}
            /> <br />
            <span style={mystyle}>区</span>
            ：<input type="text"
                onChange={Change} name='area'
                value={area}
                style={{ margin: "10px 0", "fontWeight": "500" }}
            /> <br />
            <span style={mystyle}>详细地址</span>
            ：<input type="text"
                onChange={Change} name='detailsAddr'
                value={detailsAddr}
                style={{ margin: "10px 0", "fontWeight": "500" }}
            /> <br />
            <span style={mystyle}>电话</span>
            ：<input type="text"
                onChange={Change} name='tel'
                value={tel}
                style={{ margin: "10px 0", "fontWeight": "500" }}
            /> <br /> <br />
            <div style={{"color":"#ff0000"}}>
                {tishi}
            </div>
            <div style={{ "marginTop": "50px" }}>
                <button onClick={save} style={{"marginRight":"10px"}}>保存</button>
                <button onClick={setClear} style={{"marginRight":"10px"}}>重置</button>
                {
                    // 新增没有删除
                    props.location.state.userid &&props.location.state.addrid ? <button onClick={myDelAddr} >删除</button> : <></>
                }
            </div>
        </div>
    </div>)
}

export default connect(state => state)(AddrDetails);