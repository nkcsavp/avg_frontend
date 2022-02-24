/*
树算法
tree.js
 */
export function getTreeTypes() {
    return{
        /*
            在下方添加新增的算法名称
            Add new algorithms below
            函数名: 算法名称
            function name: algorithm name
         */
        "preorder": "前序遍历",
    }
}

export function getFunctions() {
    return{
        /*
            Example: 前序遍历 Pre Order
        */
        "preorder" : (data,mvs,infos)=>{
            const preOrder = (pos)=>{
                // 判断结点为null的方法
                if(pos >= data.length || !data[pos]) return;
                // 必须保证mvs和infos的长度一致
                mvs.value.push("get(" + pos + ")");
                infos.value.push("处理结点 " + data[pos]);
                if(2 * pos + 1 < data.length && data[2 * pos + 1]){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[pos] + " 的左子结点");
                }
                preOrder(2 * pos + 1);
                if(2 * pos + 2 < data.length && data[2 * pos + 2]){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[pos] + " 的右子结点");
                }
                preOrder( 2 * pos + 2);
            }
            preOrder(0)
        }
        /*
            在下方添加新增的算法
            Add new algorithms functions below
        */
    }
}