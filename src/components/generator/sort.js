/*
排序算法
sort.js
 */
export function getSortTypes() {
    return{
        /*
            在下方添加新增的算法名称
            Add new algorithms below
         */
        "bubble": "冒泡排序",
    }
}

export function getFunctions() {
    return{
        /*
            Example: 冒泡排序 Bubble Sort
        */
        "bubble" : (data,mvs,infos)=>{
            let len = data.length;
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    // 必须保证mvs和infos的长度一致
                    mvs.value.push("get(" + j + ")")
                    infos.value.push("获取arr[" + ( j + 1 ) + "]的值")
                    mvs.value.push("get(" + ( j + 1 ) + ")")
                    infos.value.push("获取arr[" + ( j + 2 ) + "]的值")
                    if (data[j] > data[j+1]) {
                        mvs.value.push("swap(" + j + "," + (j + 1) + ")")
                        infos.value.push("arr[" + ( j + 1 ) +"]的值(" + data[j] + ")大于arr[" + ( j + 2 ) + "]的值(" + data[j+1] + ")，进行交换")
                        let temp = data[j+1];
                        data[j+1] = data[j];
                        data[j] = temp;
                    }
                }
                if(i === len - 2){
                    mvs.value.push("clear()")
                    infos.value.push("排序完成")
                    return
                }
                mvs.value.push("clear()")
                infos.value.push("第" + ( i + 1 ) + "次循环完成")
                mvs.value.push("barrier(" + (len - i - 1) + ")")
                infos.value.push("仅处理前" + ( len - i - 1 ) + "个数字")
            }
        }
        /*
            在下方添加新增的算法
            Add new algorithms functions below
        */
    }
}