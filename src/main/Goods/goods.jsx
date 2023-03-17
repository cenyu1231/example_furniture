import React, { Component } from 'react';
import { getGoodsList } from '../../api/api';
import NavTabs from '../../components/footNav/navtabs';
import SearchInput from '../../components/searchInput/SearchInput';
import './goodsCss.less';
import { connect } from 'react-redux';
import LoadingMore from './../../components/LoadingMore/loadingMore';
import { Link } from 'react-router-dom';
import { mySort } from '../../uitsTools/myTool';

class Goods extends Component {
    state = {
        page: 1,
        goods_list: [], //商品
        moreLing: true,//可以使用加载更多
        oniceCount: 15,//每页的数据条数
        col: 2,  //布局列数
        oldCol: 2,//保存旧的列数
        goodsWH: [], //所有图片的宽高数据(对象数组)
        colArr: [], //流式布局的列数和数据
        one: 1,  //保证便屏幕宽度，第一次只调用一次生成列（2）
        top: 0, //每次重新获取数据后，或要回到上次一的位置
    }

    // 初始化
    componentDidMount() {
        this.getMore();
        window.addEventListener('resize', this.chaReSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.chaReSize);
    }
    componentDidUpdate(){
        setTimeout(()=>{
            window.scrollTo({top:this.state.top-window.innerHeight,behavior:"smooth"});
        },500)
    }


    // 提出方法进行封装,方便转给下级组件进行使用封装成加载更多组件。
    getMore = async () => {
        await getGoodsList('/getGoodsList', { city: this.props.city, name: '', page: this.state.page, oniceCount: this.state.oniceCount }).then(res => {
            // console.log(res);
            if (res.goods.length >= this.state.oniceCount) {
                this.state.page = res.nextPage;
                this.state.moreLing = true;
            } else {
                this.state.page = +res.nextPage - 1;
                this.state.moreLing = false;
            }
            this.setState({
                page: this.state.page,
                moreLing: this.state.moreLing,
                goods_list: [...this.state.goods_list, ...res.goods],
            }, () => {
                // console.log(this.state.goods_list)
                this.buju();
            })
        })
    }

    // 监听窗口变化,调整流式布局
    chaReSize = () => {
        this.state.col = Math.floor(window.innerWidth / 150);

        if (this.state.col == this.state.oldCol) {  //新值列数等于旧值就直接退出
            // console.log(111)
            return;
        }

        if (this.state.col != this.state.oldCol && this.state.col > 0) {  //新值旧值不相等了，而且新值不能小于最低一列的要求
            // console.log(222)
            let arr = [];
            let h1 = 0;
            this.state.oldCol = this.state.col;
            for (let i = 0; i < this.state.oldCol; i++) {
                arr.push({
                    height: h1,
                    goods: []
                });
                h1 = h1 + 0.00001; //很关键呀，哈哈哈，小聪明，试试为什么这样个，因为不这样，当几次push的值都一样的化，自己写的工具 myTool（17到25行最显眼）就会比较不出来，出现2次方增长。                   
                if (i == this.state.oldCol - 1) {
                    this.state.colArr = arr;
                }
            }
            this.setState({ oldCol: this.state.col, colArr: this.state.colArr }, () => {
                // console.log(this.state.colArr)
                this.buju();
                // window.location.reload();
            });  //改变就值为新值，重新计算瀑布
        }
    }

    // 流式布局函数
    buju = () => {
        this.setState({
            top: document.getElementsByClassName('goods-goodsList')[0].scrollHeight,
        }, () => {
            // localStorage.setItem('top',this.state.top);
            let arr = [];
            this.state.goodsWH = [];
            for (let i = 0; i < this.state.goods_list.length; i++) {
                let img = new Image();
                img.src = this.state.goods_list[i].imgurl;
                img.onload = () => {
                    arr.push({
                        width: img.width,
                        height: img.height
                    });
                    if (i == this.state.goods_list.length - 1) {  //图片全部生成后
                        this.setState({
                            goodsWH: arr,
                        }, () => {
                            this.state.oldCol = Math.floor(window.innerWidth / 150) > 0 ? Math.floor(window.innerWidth / 150) : 1;
                            let arr1 = [];
                            let h = 0;
                            for (let i = 0; i < this.state.oldCol; i++) {
                                arr1.push({
                                    height: h,
                                    goods: []
                                });
                                h = h + 0.00001; //很关键呀，哈哈哈，小聪明，试试为什么这样个，因为不这样，当几次push的值都一样的化，自己写的工具 myTool（17到25行最显眼）就会比较不出来，出现2次方增长。
                                if (i == this.state.oldCol - 1) {
                                    this.state.colArr = arr1;
                                }
                            }
                            this.setState({
                                oldCol: this.state.oldCol,
                                colArr: this.state.colArr
                            }, () => {
                                setTimeout(()=>{
                                    for (let j = 0; j < this.state.goods_list.length; j++) {
                                        // console.log(this.state.goods_list[j])
                                        this.state.colArr[this.state.colArr.length - 1].height += this.state.goodsWH[j].height;
                                        this.state.colArr[this.state.colArr.length - 1].goods.push(this.state.goods_list[j]);
                                        this.state.colArr = mySort(this.state.colArr, 'height');
                                        if (j == this.state.goods_list.length - 1) {
                                            this.setState({ colArr: this.state.colArr })
                                        }
                                    }
                                },100)
                            })
                        })
                    }
                }
            }
        });
    }


    // 转发功能实现点击图标跳转
    myref2 = React.createRef();
    getTo = () => {
        // 转发获取子组件的元素的值
        if (this.myref2.current.value == null || this.myref2.current.value == '') {
            return;
        }
    }
    // 返回功能
    Back() {
        // 这里使用window对象的下的history下面的back方法
        window.history.back();
    }
    render() {
        return (<div style={{ "paddingBottom": "70px" }}>
            {/* 头部搜索 */}
            <div id="goods-header">
                <i className="iconfont icon-fanhui" onClick={this.Back} />
                {/* <SearchInput/> */}
                <div className="searchpage-input" >
                    <i className="iconfont icon-sousuo" onClick={this.getTo} />
                    <SearchInput myref={this.myref2} />
                </div>
            </div>
            {/* 商品展示 */}
            <div className='goods-goodsList'>
                {
                    this.state.colArr.map((ele, index = 'a') => {
                        return (<div key={index} style={{"flex":"1"}}>
                            {
                                ele.goods.map(ele => {
                                    return (
                                        <div key={ele.id} className="goods_goodsitem">
                                            {
                                                // console.log(ele.id)
                                            }
                                            <Link to={{ pathname: '/goods/details', state: { id: ele.id, city: ele.city, name: ele.name } }}>
                                                <img src={ele.imgurl} alt={ele.name} />
                                            </Link>
                                            {
                                                ele.count <= 0 ? <div style={{ "position": "absolute", "zIndex": "3", width: "5em", height: "5em", border: "2px solid red", lineHeight: "5em", textAlign: "center", color: "red", marginTop: "-2em", left: "60%", marginLeft: "-2.5em", transform: "rotateZ(-45deg)", opacity: "0.3", fontWeight: "800", fontSize: "0.6em", "borderRadius": "2.5em" }}>已售完</div> : <></>
                                            }
                                            <div className='goods-info'>
                                                <div style={{ "display": "flex" }}>
                                                    <div style={{ "flex": "1" }}>商品: {ele.name}</div>
                                                    <div style={{ "flex": "1.1" }}>商家: {ele.company}</div>
                                                </div>
                                                <div style={{ "display": "flex" }}>
                                                    <div style={{ "flex": "1" }}>城市: {ele.city}</div>
                                                    <div style={{ "flex": "1.1" }}>商品: {ele.name}</div>
                                                </div>

                                                <div style={{ "margin": "0.1rem 0" }}>
                                                    组成: <span style={{}}>{ele.material}</span> | {ele.type} | {ele.height}cm(h)
                                                </div>
                                                <div>
                                                </div>
                                                <div style={{ "display": "flex" }}>
                                                    <div style={{ "flex": "1" }}>售价: <span style={{ "color": "red" }}>{ele.price}</span>￥</div>
                                                    <div style={{ "flex": "1" }}>数量: <span style={{ "color": "red" }}>{ele.count}</span>件</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>)
                    })}
            </div>

            {/* 加载更多 */}
            {
                this.state.moreLing ? <LoadingMore GetList={this.getMore} /> : <></>
            }
            <NavTabs />
        </div>);
    }
}

export default connect((state) => (state))(Goods);