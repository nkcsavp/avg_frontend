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
        "inorder": "中序遍历",
        "postorder": "后序遍历",
        "levelorder": "层序遍历",
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
        },
        /*
            在下方添加新增的算法
            Add new algorithms functions below
        */
        /*
            中序遍历
        */
        "inorder": (data,mvs,infos) => {
            const inOrder = (pos) => {
                if(pos >= data.length || !data[pos]) return;

                inOrder(2 * pos + 1);

                if(pos !== 0 && pos % 2 === 1){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[(pos - 1)/2] + " 的左结点");
                }
                else if(pos !== 0 && pos % 2 === 0){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[pos/2] + " 的右结点");
                }

                mvs.value.push("get(" + pos + ")");
                infos.value.push("处理结点 " + data[pos]);

                inOrder(2 * pos + 2);
            }
            inOrder(0);
        },
        /*
            后序遍历
        */
        "postorder": (data,mvs,infos) => {
            const postOrder = (pos) => {
                if(pos >= data.length || !data[pos]) return;

                postOrder(2 * pos + 1);

                postOrder(2 * pos + 2);

                if(pos !== 0 && pos % 2 === 0){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[pos/2] + " 的右结点");
                }
                else if(pos !== 0 && pos % 2 === 1){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[(pos - 1)/2] + " 的左结点");
                }

                mvs.value.push("get(" + pos + ")");
                infos.value.push("处理结点 " + data[pos]);
            }
            postOrder(0);
        },
        /*
            二叉树的层序遍历
        */
        "levelorder": (data,mvs,infos) =>{
            const res = []
            const levelOrder = (pos,level) =>{
                if(pos >= data.length || !data[pos]) return;
                if(res.length === level){
                    res.push([]);
                }
                res[level].push(pos);
                levelOrder(2 * pos + 1,level + 1);
                levelOrder(2 * pos + 2,level + 1);
            }
            levelOrder(0,0);
            for (let i = 0; i < res.length; i++) {
                for (let j = 0; j < res[i].length; j++) {
                    if(res[i][j] !== 0 && res[i][j] % 2 === 0){
                        mvs.value.push("blank()");
                        infos.value.push("将要处理 " + data[res[i][j]/2] + " 的右结点");
                    }else if(res[i][j] !== 0 && res[i][j] % 2 !== 0){
                        mvs.value.push("blank()");
                        infos.value.push("将要处理 " + data[(res[i][j] - 1)/2] + " 的左结点");
                    }
                    mvs.value.push("get(" + res[i][j] + ")");
                    infos.value.push("处理结点 " + data[res[i][j]]);
                }
            }
        },


    }
}