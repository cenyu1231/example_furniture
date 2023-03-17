import React, { Component } from 'react';
import { addBuyCar, addCommit, getGoodsCommit, getGoodsItem, setShoucang, allCommit, oneCommit } from '../../../api/api';
import ComHeader from '../../../components/comHeader/comHeader';
import SwipePlayer from '../../../components/mySwiper/swipePlayer';
import MyTabs from './tabs/myTabs';
import './details.less';
import StarDeal from '../../../components/starDeal/starDeal';
import LoadingMore from '../../../components/LoadingMore/loadingMore';
import { getShoucang, selCarItme } from './../../../api/api';
import { connect } from 'react-redux';

class Details extends Component {
    state = {
        goodsImgs: [],  //一个商品的所有图片
        goodsInfo: {},  //一个商品所有信息
        page: 1,  //评价的页数
        commits: [], // 评论
        off: true,  // 未收藏
        carOff: true, //未加入购物车。
        tabsFlag: true, //选项卡切换
        openCommit: false,  //打开评论框
        textareaVal: '',  //
        inuserid: '', //在回复谁
        starNum1: 0,  //点赞的星星数量
        tishi: false,
        tabDEF: '1',  //选项可默认值
    }
    componentDidMount() {
        // console.log(this.props)
        this.init();
        this.getMore();
    }
    // init
    init = () => {
        let that = this;
        // 刷新保存页面上----------------------------
        var detailsCommitpage = localStorage.getItem('detailsCommitpage');
        var tabsFlag = localStorage.getItem('tabsFlag');
        if (tabsFlag) {
            this.setState({
                tabsFlag: tabsFlag,
            }, () => {
                localStorage.setItem('tabsFlag', null);
            });
        }
        if (detailsCommitpage) {
            this.setState({
                page: localStorage.getItem('detailsCommitpage')
            });
        } else {
            // console.log(222)
            this.setState({
                page: 1
            });
        }
        // 刷新保存页面下---------------------------------

        getGoodsItem('/getGoodsItem', { id: this.props.location.state.id, city: this.props.location.state.city }).then((res) => {
            let arr = [];
            if (res.data1) {
                for (let i = 0; i < res.data1.length; i++) {
                    arr.push(res.data1[i].img);
                }
            }
            that.setState({
                goodsImgs: arr,
                goodsInfo: res.data[0]
            }, () => {
                // 初始化收藏
                getShoucang('/getShoucang', { userid: this.props.user.userid, goodsid: this.props.location.state.id }).then(res => {
                    // console.log(res)
                    if (res.code == 0) {  //已取消收藏
                        this.setState({
                            off: true  //切换收藏按钮收藏
                        })
                    }
                    if (res.code == 1) {  //已收藏
                        this.setState({
                            off: false  //切换收藏按钮收藏
                        })
                    }
                });
                // 初始化检验购物车
                selCarItme('/selCarItme', { userid: this.props.user.userid, goodsid: this.props.location.state.id }).then(res => {
                    // console.log(res)
                    if (res.code == 0) {
                        this.setState({
                            carOff: true  //可以购买
                        })
                    }
                    if (res.code == 1) {  //未被收藏
                        this.setState({
                            carOff: false  //可以加入购物车
                        })
                    }
                })
            })
        });
    }

    // 封装方法，方便加载更多组件使用
    getMore = () => {
        // console.log(this.props.location.state.id)
        allCommit('/allCommit', { goodsid: this.props.location.state.id, page: this.state.page, userid: this.props.user.userid }).then(res => {
            // console.log(res)
            localStorage.setItem('detailsCommitpage', res.nextPage);
            this.setState({
                commits: [...this.state.commits, ...res.commits],
                page: res.nextPage
            });
        })
    }
    // 影藏电话的功能
    formateTel(num) {
        let str = '' + num;
        let qian = str.substring(0, 3);
        let hou = str.substring(8);
        return qian + "****" + hou;
    }
    // 收藏函数：先判断登录，再看是否能收藏
    shoucang = () => {
        if (!localStorage.getItem('userid') || !localStorage.getItem('username')) {
            this.props.history.push('/my/login');
        } else {
            this.setState({
                off: !this.state.off
            })
            setShoucang('/setShoucang', {
                userid: this.props.user.userid
                , goodsid: this.props.location.state.id
            }).then(res => {
                // console.log(111,res)
            })
        }
    }
    // 购买功能：先判断时候登陆状态，如果是的话首次加载显示"加入购物车",加入购物车信息后显示”购买“，跳转到购物车页面实现操作。
    buyCar = () => {
        if (!localStorage.getItem('userid') || !localStorage.getItem('username')) {
            this.props.history.push('/my/login');
        } else {
            this.setState({
                carOff: !this.state.carOff  //切换状态
            })
            addBuyCar('/addBuyCar', {
                userid: this.props.user.userid
                , goodsid: this.props.location.state.id
            }).then(res => {
                console.log(res);
            })
        }
    }
    // 跳转到购物车页面
    toCar = () => {
        this.props.history.push('/my/car');
    };
    // 当选项卡为评论的时候
    changeTabs = (bool) => {
        // console.log(bool)
        this.setState({
            tabsFlag: bool
        })
    }
    // 新增评论
    commiit = () => {
        if (this.state.textareaVal == '' || this.state.textareaVal == null) {
            window.alert('评论内容不能为空')
            return;
        }
        addCommit('/addCommit', {
            userid: this.props.user.userid
            , goodsid: this.props.location.state.id
            , inuserid: this.state.inuserid
            , context: this.state.textareaVal
            , star: this.state.starNum1
        }).then(res => {
            // console.log(res)
            this.setState({
                tishi: res.msg
            }, () => {
                setTimeout(() => {
                    this.setState({
                        tishi: '',
                    })
                }, 2000);
            });
            if (res.code == 1) {
                this.setState({
                    textareaVal: '',
                    openCommit: false,
                    starNum1: 0
                }, () => {
                    localStorage.setItem('tabsFlag', '2');
                    // 获取当前的评论
                    oneCommit('/oneCommit', {
                        sss: '', userid: this.props.user.userid
                        , goodsid: this.props.location.state.id
                    }).then(res => {
                        for (let i = 0; i < this.state.commits; i++) {
                            if (this.state.commits[i].id == res.commits[0].id) {
                                this.state.commits.splice(i, 1);
                            }
                        }
                        this.state.commits.unshift(res.commits[0]);
                        this.setState({
                            commits: this.state.commits,
                        });
                    })
                })
            }
        })
    }
    // 获取用户的点赞的数量
    getStar = (num) => {
        // console.log(num)
        this.setState({
            starNum1: num
        })
    }

    render() {
        const goods = this.state.goodsInfo;
        return (<div style={{ "position": "relative" }}>
            {/* 头部/静置定位 */}
            <div>
                <ComHeader title="商品详情" />
                <div style={{ "height": "43px", "color": "#ffffff" }}>我是静置定位占位元素</div>
            </div>

            {/* 轮播图 */}
            <div style={{ "height": "4rem" }}>
                <SwipePlayer images={this.state.goodsImgs} />
            </div>
            {/* 商品数量提示 */}
            <div style={{ "position": "absolute", "zIndex": "99", width: "2rem", height: "1rem", border: "2px solid red", lineHeight: "1rem", textAlign: "center", borderRadius: "50%", color: "red", marginTop: "1rem", left: "40%", transform: "rotateZ(-45deg)", opacity: "0.8" }}>{
                goods.count <= 0 ? <div>已售完</div>
                    : <div>{goods.count > 20 ? <div>剩余{goods.count}件</div>
                        : <div>限量{goods.count}件</div>}</div>}
                    </div>

            {/* 评论框 */}
                {
                    this.state.openCommit ? <div style={{
                        width: "80%",
                        height: "6rem", backgroundColor: "#fffff7", "position": "fixed", left: "50%", top: "50%", marginLeft: "-40%", marginTop: "-3rem", zIndex: "999",
                        "padding": "15px 10px", "boxSizing": "border-box", "borderRadius": "10px", "boxShadow": "0 0 5px 5px #5555ff"
                    }}>
                        <div style={{ "height": "94%", "textAlign": "center" }}>
                            <textarea name="" id="" cols="30" rows="10" style={{ "width": "95%", "height": "70%", "textAlign": "center" }}
                                value={this.state.textareaVal} onChange={(e) => { this.setState({ textareaVal: e.target.value }) }}
                            ></textarea>
                            <br /><br />
                            点赞吧：<StarDeal star={this.state.starNum1} starNum='5' getStar={this.getStar} />
                        </div>
                        <div style={{ "textAlign": "center" }}>
                            <button style={{ "margin": "0 10px" }} onClick={() => { this.setState({ textareaVal: '', openCommit: false, starNum1: 0 }) }}>取消</button>
                            <button style={{ "margin": "0 10px" }}
                                onClick={() => {
                                    // console.log(this.state.textareaVal);
                                    this.commiit();
                                }}
                            >提交</button>
                        </div>
                    </div> : <>{
                        this.state.tishi != '' ? <div style={{ "display": "block", "height": "40px", "lineHeight": "40px", "position": "fixed", "top": "50%", "left": "30%","right": "30%", "margin": "-20px 0 0 0", "backgroundColor": "#8888ff", "zIndex": "10", "textAlign": "center", "borderRadius": "10px" }}>{this.state.tishi}</div> : <div style={{ "position": "fixed", "zIndex": "-99" }}></div>
                    }</>
                }
                {/* 选项卡自实现 */}
                <MyTabs defaultValue={this.state.tabDEF} mychange={this.changeTabs}>
                    <div tab="商品信息" key='1' >
                        <div className='goodsItem'>
                            <div >
                                商品：{goods.name}
                            </div>
                            <div >
                                剩余：{goods.count} 件
                            </div>
                            <div>
                                发货地址：{goods.city} - {goods.area} - {goods.company}
                            </div>
                            <div>
                                制作材料：{goods.material}
                            </div>
                            <div>
                                参数：<span style={{ "color": "red" }}>{goods.price}￥</span> / {goods.type} / {goods.height}cm
                            </div>
                            <div>
                                详细：<p>{goods.details}</p>
                            </div>
                        </div>
                    </div>
                    <div tab="评价" key='2'>
                        {
                            this.state.commits.map((ele) => (<div key={ele.id} className='pingjia'>
                                <div>
                                    <i className="iconfont icon-wode" />
                                    {this.formateTel(ele.tel)}
                                </div>
                                <div className='pingjia-xingtime'>
                                    {/* 自制星星组件，传入红星数量和总星（starNum）数量 */}
                                    <StarDeal star={ele.star} starNum='5' />
                                    <span>{ele.time}</span>
                                </div>
                                <div className='pingjia-content'>
                                    {ele.context}
                                </div>
                            </div>))
                        }
                        {/* 加载更多 */}
                        <div style={{ "position": "absolute", left: 0, right: 0 }}>
                            <LoadingMore GetList={this.getMore} />
                        </div>
                    </div>
                </MyTabs>
                {/* 收藏和购买 */}
                <div className='func'>
                    {
                        this.state.tabsFlag ? <><button onClick={this.shoucang} className={this.state.off ? "" : "yishoucang"}> {this.state.off ? <span>收藏</span> : <span>已收藏</span>}</button>
                            {this.state.carOff ? (<button onClick={this.buyCar}>加入购物车</button>) : (<button onClick={this.toCar} className={this.state.carOff ? "" : "yishoucang"}  >购买</button>)}</> :
                            <button onClick={() => { this.setState({ openCommit: !this.state.openCommit }) }}>评论</button>
                    }
                </div>
            </div>);
    }
}

export default connect((state) => (state))(Details);