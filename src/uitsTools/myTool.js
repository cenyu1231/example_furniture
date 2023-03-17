// 对象数组按键值排序
function mySort(arr, key) {
    let temp = [];
    let result = [];
    // console.log(arr);
    if ( arr instanceof Array  && Object.keys(arr[0]).indexOf(key) != -1) {

        for (let i = 0; i < arr.length; i++) {
            temp.push(arr[i][key]);
            // console.log(arr[i][key]);
        }
        // 对temp排序(降序)
        temp.sort((a,b)=>{
            return b-a;
        });
        // console.log(temp);
        for (let i = 0; i < arr.length; i++) {
            // temp.push(arr[i][key]);
            for (let j = 0; j < arr.length; j++) {
                temp.push(arr[i][key]);
                if (temp[i] == arr[j][key]) {
                    result.push(arr[j]);
                }
            }
        }
        return result;
    }
    console.log(arr,111);
}

// 测试
// let arr = [{
//     id:1,
//     name:2,
//     cha:'a'
// },{
//     id:2,
//     name:1,
//     cha:'d'
// },{
//     id:4,
//     name:8,
//     cha:'f'
// },{
//     id:6,
//     name:5,
//     cha:'b'
// },{
//     id:3,
//     name:7,
//     cha:'B'
// }];
// let sss = [{ id: 27, userid: 8, goodsid: 4, inuserid: 0, context: '好额，想吃东西' },
// { id: 26, userid: 8, goodsid: 4, inuserid: 0, context: '好的好的，听你的' },
// { id: 9, userid: 8, goodsid: 4, inuserid: 0, context: '嗯嗯呢' }
// ]
// mySort(sss, 'userid');
// mySort(arr,"name");
// mySort(arr,"cha");



export {
    mySort
}