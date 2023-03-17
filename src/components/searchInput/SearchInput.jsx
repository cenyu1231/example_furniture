import './searchInput.less';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function SearchInput(props) {
const [name,setName] = useState('');
useEffect(()=>{
    // 路由中有参数的话，赋值给新渲染的input
    if(props.match.params.name){
        setName(props.match.params.name);
    }else{
        setName('');  //保证没有传值有使用这个组件的组件不出错。
    }
},[props.match.params.name])
    function keyup(e) {
        // 回车键的编码十进制：13
        if(e.keyCode == 13){
            if(name == null || name ==''){
                return ;
            }
            props.history.push('/searchpage/'+name);
        } 
    }
    return (
        <input className='search-input' type="text"
        onKeyUp={keyup} 
        value={name} 
        onChange={(e)=> setName(e.target.value)}
        ref={props.myref} 
        placeholder="必输入商品名,可模糊"
        />
    )
}

export default withRouter(SearchInput);