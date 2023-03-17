import './goodsListCss.less'
import { Link } from 'react-router-dom';

function GoodsList(props) {
    // console.log(props.list)
    return (<div id="goodsList">
        <ul>
            {
                props.list.map((ele) => {
                    return (<li className='li-item' key={ele.id}>
                        <div className="imgStyle">
                            <Link to={{ pathname: '/goods/details', state: { id: ele.id, city: ele.city, name: ele.name } }}>
                                <img src={ele.imgurl} alt={ele.name} />
                            </Link>
                        </div>
                        <div className="info">
                            {
                                ele.count <= 0 ? <div style={{ "position": "absolute", "zIndex": "3", width: "1rem", height: "1rem", border: "2px solid red", lineHeight: "1rem", textAlign: "center", borderRadius: "50%", color: "red", marginTop: "-0.7rem", left: "50%", marginLeft: "-0.5rem", transform: "rotateZ(-45deg)", opacity: "0.8", fontWeight: "800" }}>已售完</div> : <></>
                            }
                            <div>
                                <p>城市：{ele.city}</p>
                                <p>描述：{ele.details} </p>
                            </div>
                            <div>
                                <p>商品：<span style={{ color: "red", marginRight: "10px" }}>{ele.name}</span></p>
                                <p>价格：<span style={{ color: "red", marginRight: "10px" }}>{ele.price}￥ | {ele.type}</span></p>
                            </div>
                        </div>
                    </li>)

                })
            }
        </ul>
    </div>)
}

export default GoodsList;