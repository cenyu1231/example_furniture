import React, { Component } from 'react';
import { login, register } from '../../api/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from '../../store/action/userAction';

class Login extends Component {
    state = {
        username: '',
        password:'',
        msg: '',
        userStatus: true  //可登录
    }
    // change
    setUsername = (e) => {
        this.setState({
            username: e.target.value,
            msg:''
        })
    }
    // change
    setPassword = (e) => {
        this.setState({
            password: e.target.value,
            msg:''
        })
    }
    // 注册
    register = () => {
        if(this.state.username == '' || this.state.password == ''){
            this.setState({
                msg: '用户名或密码不能为空'
            });
            return ;
        }
        register('/register', { username: this.state.username,password:this.state.password, tel: '', age: '', addr: '' }).then(res => {
            if(res.code === -1){
                this.setState({
                    msg: '用户已存在'
                })
            }else if(res.code === 1){
                this.setState({
                    msg: '注册成功'
                })
            }else{
                this.setState({
                     msg: '注册失败'
                })
            }
        })
    }
    // denglu
    login = () => {
        if(this.state.username == '' || this.state.password == ''){
            this.setState({
                msg: '用户名或密码不能为空'
            });
            return ;
        }
        login('/login', { username: this.state.username ,password: this.state.password}).then(res => {
            // console.log(res);
            if (res.code === 1) {
                this.setState({
                    msg: '登陆中···'
                })
                this.props.setUser({...res.userInfo});
                localStorage.setItem('userid', res.userInfo.id);
                localStorage.setItem('username', res.userInfo.username);
                setTimeout(() => {
                    window.history.back();
                }, 2000);
            }else if(res.code === -1 ){
                this.setState({
                    msg: '用户名不存在'
                })
            }else{
                this.setState({
                    msg: '密码错误'
                })
            }
        })
    }
    render() {
        return (<div style={{ "textAlign": "center", "backgroundColor": "#f0f0f0", "width": "200px", height: "200px", padding: "20px 10px", boxSizing: "border-box", border: "1px solid #a3a3a3", position:"fixed",left:"50%",marginLeft:"-100px",top:"40%",marginTop:"-100px", boxShadow: "0 0 100px 5px #3333ff", borderRadius: "20px" }}>
            <h2 style={{ "textShadow": "0 0 2px #6060ff" }}>安逸家具</h2>
            <br />
            <input style={{ "width": "100%", "boxSizing": "border-box" }} type="text" placeholder='用户名' value={this.state.username} onChange={this.setUsername} />
            <br />
            <input style={{ "width": "100%", "boxSizing": "border-box" }} type="text" placeholder='密码' value={this.state.password} onChange={this.setPassword} />
            <br />
            <div style={{"color":"red",height:"20px", lineHeight:'20px',margin:"5px 0 5px 0"}}>{this.state.msg}</div>
            <button style={{ "backgroundColor": "#8888ff", padding: "2px 10px", marginRight: "10px" }} onClick={() => (window.history.back())}>返回</button>

            <button style={{ "backgroundColor": "#8888ff", padding: "2px 10px" }} onClick={this.login}>登录</button>
            <button style={{ "backgroundColor": "#8888ff", padding: "2px 10px" }} onClick={this.register}>注册</button>
        </div>);
    }
}

export default connect((state) => (state), (dispatch) => (bindActionCreators(userAction, dispatch)))(Login);