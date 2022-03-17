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
        "flip": "二叉树翻转",
        "maxdepth": "最大树深度",
        "heapsort":"堆排序",
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
        /*
            二叉树翻转，非镜像翻转
        */
        "flip": (data, mvs,infos) =>{
            const flip = (pos) =>{
                if(pos >= data.length || !data[pos]) return;
                if(!(2 * pos + 1 >= data.length || !data[2 * pos + 1] || 2 * pos + 2 >= data.length || !data[2 * pos + 2])){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[pos] + " 的左右子结点");
                }
                mvs.value.push("swap(" + (2 * pos + 1) + "," + (2 * pos + 2) + ")");
                infos.value.push("交换结点 " + data[2 * pos + 1] + "和" + data[2 * pos + 2]);
                flip(2 * pos + 1);
                flip(2 * pos + 2);
            }
            flip(0);
        },
        /*
            二叉树最大深度统计
        */
        "maxdepth": (data,mvs,infos) =>{
            let depth = 0;
            const maxDepth = (pos,depthVal) =>{
                if(pos >= data.length || !data[pos]) return;
                depth = Math.max(depthVal, depth);
                mvs.value.push("get(" + pos + ")");
                infos.value.push("该节点深度为 " + depthVal + "," + "目前检查到的树的最大深度为" + depth);
                if(2 * pos + 1 < data.length && data[2 * pos + 1]){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[pos] + " 的左子结点");
                }
                maxDepth(2 * pos + 1,depthVal + 1);
                if(2 * pos + 2 < data.length && data[2 * pos + 2]){
                    mvs.value.push("blank()");
                    infos.value.push("将要处理 " + data[pos] + " 的右子结点");
                }
                maxDepth(2 * pos + 2,depthVal + 1);
            }
            maxDepth(0,1);
        },
        /*
            堆排序
        */
       "heapsort":(data,mvs,infos)=>{
            let len = data.length;
            let keepHeap = function(index,len){
                while(true){
                    let left = 2*index+1;
                    let right = left+1;
                    let maxIndex = index;
                    
                    if(left<len){
                        mvs.value.push("get("+index+")");
                        infos.value.push("获取arr["+index+"]的值");
                        mvs.value.push("get("+left+")");
                        infos.value.push("获取arr["+index+"]左子节点的值");
                        if(data[left]>data[maxIndex])
                            maxIndex=left;
                    }
                    if(right<len){
                        mvs.value.push("get("+right+")");
                        infos.value.push("获取arr["+index+"]右子节点的值");
                        if(data[right]>data[maxIndex])
                            maxIndex=right;
                    }
                    if(maxIndex!=index){
                        let temp = data[maxIndex];
                        data[maxIndex]=data[index];
                        data[index]=temp;
                        let msg=maxIndex==left?"左子节点":"右子节点";
                        mvs.value.push("swap("+maxIndex+","+index+")");
                        infos.value.push("交换arr["+index+"]与"+msg);
                        index = maxIndex;
                    }
                    else{
                        break;
                    }
                }
            };
            mvs.value.push("blank()");
            infos.value.push("开始构建基础顶堆");
            for(let i = len/2-1;i>=0;--i){
                keepHeap(i,len);
            }
            mvs.value.push("blank()");
            infos.value.push("基础顶堆构建完成");
            mvs.value.push("blank()");
            infos.value.push("开始排序");
            for(let i = len-1;i>1;i--){
                let temp = data[0];
                data[0]=data[i];
                data[i]=temp;
                mvs.value.push("swap(0,"+i.toString()+")");
                        infos.value.push("交换arr[0]与arr["+i.toString()+"],维护新的顶堆");
                keepHeap(0,i);
            }
            mvs.value.push("blank()");
            infos.value.push("排序完毕");
       },
    }
}