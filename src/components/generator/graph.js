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
        "test": "测试占位",
    }
}

export function getFunctions() {
    return{
        /*
            Example: Test
        */
        "test" : (data,rel,mvs,infos,start)=>{
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
        },
        /*
            在下方添加新增的算法
            Add new algorithms functions below
        */
    }
}