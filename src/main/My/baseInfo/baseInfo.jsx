import ComHeader from "../../../components/comHeader/comHeader";
import './baseInfoCss.less';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { editUser, selUser } from "../../../api/api";
import { bindActionCreators } from 'redux';
import userAction from '../../../store/action/userAction';

function BaseInfo(props) {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [tel, setTel] = useState('');
    const [tishi, setTishi] = useState('');
    const [off, setOff] = useState(false)   //时候能修改，不能

    useEffect(() => {
        selUser('/selUser', { userid: props.user.userid }).then(res => {
            // console.log(res);
            setUsername(res.user[0].username);
            setAge(res.user[0].age);
            setSex(res.user[0].sex);
            setTel(res.user[0].tel);
        })
    }, [])

    // 提交表单

    function Change(e) {
        let key = e.target.name;
        let value = e.target.value;
        // console.log(key, value);
        switch (key) {
            case 'username':
                setUsername(value);
                break;
            case 'age':
                setAge(value);
                break;
            case 'sex':
                setSex(value);
                break;
            case 'tel':
                setTel(value);
                break;
            default:
                break;
        }
    }
// 保存
function save(){
    // console.log(username,age,tel,sex)
    editUser('/editUser',{userid:props.user.userid,username:username,age:age,sex:sex,tel:tel}).then(res=>{
        // console.log(res)
        if(res.code == 1){
            setOff(!off);
        }
        setTishi(res.msg);
        props.setUser({username,id:props.user.userid});
        
    })
}
    function setClear() {
        setUsername('');
        setAge('');
        setSex('');
        setTel('');
    }
    return (<div id="baseInfo">
        <ComHeader title="基本信息" />
        {
            props.user ? <div style={{width: "80%",
                margin:" 30% auto",
                "padding": "20px 0",
                "textAlign": "center",
                "fontWeight": "400"}}>
                用户：<input type="text" 
                disabled={off ? false : true} 
                onChange={Change} name='username' 
                value={username} 
                style={{margin: "10px 0","fontWeight": "500"}}
                /> <br />
                年龄：<input type="text" 
                disabled={off ? false : true} 
                onChange={Change} name='age' 
                value={age} 
                style={{margin: "10px 0","fontWeight": "500"}}
                /> <br />
                性别：<input type="text" 
                disabled={off ? false : true} 
                onChange={Change} name='sex' 
                value={sex} 
                style={{margin: "10px 0","fontWeight": "500"}}
                /> <br />
                电话：<input type="text" 
                disabled={off ? false : true} 
                onChange={Change} name='tel' 
                value={tel} 
                style={{margin: "10px 0","fontWeight": "500"}}
                /> <br /><br />
                <div style={{"color":"red"}}>{tishi}</div>
                <div style={{"marginTop": "50px"}}>
                    <button onClick={() => {
                        setOff(!off);
                    }}>修改</button>
                    <button onClick={save} disabled={off ? false : true}>保存</button>
                    <button onClick={setClear} disabled={off ? false : true}>重置</button>
                </div>
            </div> : (<Link to='/my/login'>
                <div
                    style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                    未登录·点我
                </div>
            </Link>)
        }

    </div>)
}

export default connect((state) => (state),(dispatch) => (bindActionCreators(userAction, dispatch)))(BaseInfo);