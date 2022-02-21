const retList = []

function treeFunction(type,data) {
    if(type === "inorder"){
        inorder(data,0)
    }
    else if(type === "preorder"){
        preorder(data,0)
    }
    else if(type === "postorder"){
        postorder(data,0)
    }
    return retList
}

function preorder(data,pos){
    if(pos >= data.length || data[pos] === 'x') return;
    retList.push("get(" + (pos) + ")");
    preorder(data,2 * pos + 1);
    preorder(data, 2 * pos + 2);
}

function inorder(data,pos){
    if(pos >= data.length || data[pos] === 'x') return;
    inorder(data,2 * pos + 1);
    retList.push("get(" + (pos) + ")");
    inorder(data, 2 * pos + 2);
}

function postorder(data,pos){
    if(pos >= data.length || data[pos] === 'x') return;
    postorder(data,2 * pos + 1);
    postorder(data, 2 * pos + 2);
    retList.push("get(" + (pos) + ")");
}

export {
    treeFunction
}