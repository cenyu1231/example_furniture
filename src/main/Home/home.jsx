import React, { Component } from 'react';
import NavTabs from '../../components/footNav/navtabs';
import Header from './com/header';
import Recommend from './com/recommend';
import { getFestRecommend ,getHotRecommend, getSwiper,getMaxRecommend } from './../../api/api';
import { connect } from 'react-redux';
import SwipePlayer from '../../components/mySwiper/swipePlayer';

class Home extends Component {
    state = {
        hotRecomment: [],  //热门数据16个
        festRecomment: [],  //精品数据8个
        maxRecomment: [],  //销量最大4个
        images:[]
    }
    componentDidMount() {
        let that = this;
        getMaxRecommend('/getMaxRecommend', { city: this.props.city }).then(res => {
            // console.log(res)
            that.setState({
                maxRecomment: res
            })
        });
        getHotRecommend('/getHotRecommend', { city: this.props.city }).then(res => {
            that.setState({
                hotRecomment: res
            })
        });
        getFestRecommend('/getFestRecommend', { city: this.props.city }).then(res => {
            // console.log(res)
            that.setState({
                festRecomment: res
            })
        });
        getSwiper('/getSwiper').then(res=>{
            // console.log(res);
            that.setState({
                images:res.imgList
            })
        })
         
    }
    render() {
        // console.log(this.state)
        return (<div style={{"padding":"43px 0 80px 0"}}>
            {/* 头部 */}
            <Header city={this.props.city} />
            {/* 轮播图组件 */}
            <div style={{"height":"4.5rem"}}>
            {
                this.state.images ? <SwipePlayer images={this.state.images} />:<></>
            }
            </div>
            {/* 销量推荐 */}
            <Recommend category="销量推荐" list={this.state.maxRecomment} />
            {/* 精品推荐 */}
            <Recommend category="精品推荐" list={this.state.festRecomment} />
            {/* 热门推荐 */}
            <Recommend category="热门推荐" list={this.state.hotRecomment} />
            
            {/* 底部 */}
            <NavTabs />
        </div>);
    }
}

export default connect((state) => (state))(Home);