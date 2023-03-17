import './css/recommendCss.less';
import { Link } from 'react-router-dom';

export default function Recommend(props) {
    // console.log(props.list)
    return (<div id='recommend-id'>
        <h3>
            {
                props.category
            }
        </h3>
        <div className='recommend-list'>
            <ul>
                {
                    // 遍历父组件传来的数据
                    props.list.map((ele) => (
                        <li key={ele.id}>
                            <Link to={{ pathname: '/goods/details/', state: { id: ele.id, city: ele.city } }}>
                                <img src={ele.imgurl} alt={ele.shop_store + ' ' + ele.name} />
                            </Link>
                            <div>{ele.city + ele.name}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>)
}