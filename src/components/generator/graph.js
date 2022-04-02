/*
图算法
graph.js
 */
export function getGraphTypes() {
    return{
        /*
            在下方添加新增的算法名称
            Add new algorithms below
         */
        //"test": "测试占位",
        "dfs":"深度优先搜索",
        "bfs":"广度优先搜索",
    }
}

export function getFunctions() {
    return{
        /*
            Example: Test
        */
        /*"test" : (data,rel,mvs,infos,start)=>{
            mvs.value.push("emp(0)")
            infos.value.push("高亮结点 0")
            mvs.value.push("link(0,1)")
            infos.value.push("高亮 0 和 1 之间的边")
            mvs.value.push("unemp(0)")
            infos.value.push("取消高亮结点 0")
            mvs.value.push("emp(1)")
            infos.value.push("高亮结点 1")
            mvs.value.push("unlink(0,1)")
            infos.value.push("取消高亮 0 和 1 之间的边")
        },*/
        /*
            在下方添加新增的算法
            Add new algorithms functions below
        */
       "dfs":(data,rel,mvs,infos,start)=>{
            let n =data.length;
            
            let dataMark=new Array(n);
            for(let i=0;i<n;++i){
                    dataMark[i]=1;
            }
            dataMark[start]=0;
            let stack=[start];
            mvs.value.push("emp("+start+")");
            infos.value.push("高亮根结点");
            while(stack.length!=0){
                let popData=stack.pop();
                while(dataMark[popData%n]==0&&stack.length!=0){
                    popData=stack.pop();
                }
                let basicIndex=popData%n;
                let lastIndex=parseInt(popData/n);

                
                if(basicIndex!=start){
                    if(dataMark[popData%n]==0){
                        break;
                    }
                    mvs.value.push("link("+lastIndex+","+basicIndex+")")
                    infos.value.push("高亮 "+data[lastIndex]+" 和 "+data[basicIndex]+" 之间的边")
                    mvs.value.push("emp("+basicIndex+")");
                    infos.value.push("高亮"+data[basicIndex]+"节点");
                    dataMark[basicIndex]=0;
                }
                for(let i=0;i<n;++i){
                    if(dataMark[i]&&(rel[n*basicIndex+i]||rel[n*i+basicIndex])){
                        stack.push(n*basicIndex+i);
                    }
                }
            }
       },

       "bfs":(data,rel,mvs,infos,start)=>{
            let n =data.length;
            let dataMark=new Array(n);
            for(let i=0;i<n;++i){
                dataMark[i]=1;
            }
            dataMark[start]=0;
            let queue=[start];
            mvs.value.push("emp("+start+")");
            infos.value.push("高亮根结点");
            while(queue.length!=0){
                let popData=queue.shift();
                while(dataMark[popData%n]==0&&queue.length!=0){
                    popData=queue.shift();
                }
                let basicIndex=popData%n;
                let lastIndex=parseInt(popData/n);
                if(basicIndex!=start){
                    if(dataMark[popData%n]==0){
                        break;
                    }
                    mvs.value.push("link("+lastIndex+","+basicIndex+")")
                    infos.value.push("高亮 "+data[lastIndex]+" 和 "+data[basicIndex]+" 之间的边")
                    mvs.value.push("emp("+basicIndex+")");
                    infos.value.push("高亮"+data[basicIndex]+"节点");
                    dataMark[basicIndex]=0;
                }
                for(let i=0;i<n;++i){
                    if(dataMark[i]&&(rel[n*basicIndex+i]||rel[n*i+basicIndex])){
                        queue.push(n*basicIndex+i);
                    }
                }
            }
       }
    }
}