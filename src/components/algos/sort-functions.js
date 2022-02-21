const allTypes = {
    "quick":"快速排序",
    "bubble":"冒泡排序",
    "radix":"基数排序",
    "selection":"选择排序",
    "insertion":"插入排序",
    "shell":"希尔排序",
    "merge":"归并排序",
    "heap":"堆排序",
    "counting":"计数排序",
    "bucket":"桶排序",
}
function sortFunction(type, arr) {
    if(type === "quick"){
        return QuickSort(arr)
    }
    else if(type === "bubble"){
        return bubbleSort(arr)
    }
    else if(type === "insertion"){
        return insertionSort(arr)
    }
    else if(type === "heap"){
        return heapSort(arr)
    }
    else if(type === "selection"){
        return selectionSort(arr)
    }
    return ""

}

//冒泡排序
function bubbleSort (arr) {
    var len = arr.length;
    var json_str = "{\"originData\":[" + arr.toString() + "],\"operations\":[";
    var operations = []
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            operations.push("\"get(" + j.toString() + ")\"");
            operations.push("\"get(" + (j + 1).toString() + ")\"");
            if (arr[j] > arr[j + 1]) {          // 相邻元素两两对比
                operations.push("\"swap(" + j.toString() + "," + (j + 1).toString() + ")\"");
                var temp = arr[j + 1];        // 元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    json_str += operations.toString() + "]}";
    return json_str;
}

//选择排序
function selectionSort (arr) {
    var len = arr.length;
    var json_str = "{\"originData\":[" + arr.toString() + "],\"operations\":[";
    var operations = []
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            operations.push("\"get(" + minIndex.toString() + ")\"");
            operations.push("\"get(" + j.toString() + ")\"");
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        if (minIndex != i) {
            operations.push("\"swap(" + i.toString() + "," + minIndex.toString() + ")\"");
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    json_str += operations.toString() + "]}";
    console.log(json_str);
    return json_str;
}

//插入排序
function insertionSort (arr) {
    var len = arr.length;
    var json_str = "{\"originData\":[" + arr.toString() + "],\"operations\":[";
    var operations = []
    for (var i = 1; i < len; i++) {
        var temp = i;
        while (temp - 1 >= 0) {
            operations.push("\"get(" + (temp - 1).toString() + ")\"");
            operations.push("\"get(" + (temp).toString() + ")\"");
            if (arr[temp] < arr[temp - 1]) {
                var s = arr[temp];
                arr[temp] = arr[temp - 1];
                arr[temp - 1] = s;
                operations.push("\"swap(" + (temp - 1).toString() + "," + temp.toString() + ")\"");
            }
            else {
                break;
            }
            temp--;
        }
    }
    json_str += operations.toString() + "]}";
    return json_str;
}


//快速排序
function QuickSort(arr) {
    var json_str = "{\"originData\":[" + arr.toString() + "],\"operations\":[";
    var operations = [];
    QuickPartSort(arr, 0, arr.length - 1, operations);
    console.log(arr)
    json_str += operations.toString() + "]}";
    console.log(json_str);
    return json_str;
}
function QuickPartSort(arr, begin, end, operations) {
    if (begin < end) {
        let i = begin + 1;
        let j = end;
        let empty = arr[begin];
        while (i < j) {
            while (i < j) {
                operations.push("\"get(" + begin.toString() + ")\"");
                operations.push("\"get(" + j.toString() + ")\"");
                if (arr[j] <= empty) {
                    break;
                }
                j--;
            }
            while (i < j) {
                operations.push("\"get(" + begin.toString() + ")\"");
                operations.push("\"get(" + i.toString() + ")\"");
                if (arr[i] >= empty) {
                    break;
                }
                i++;
            }
            if (i < j) {
                operations.push("\"get(" + i.toString() + ")\"");
                operations.push("\"get(" + j.toString() + ")\"");
                operations.push("\"swap(" + i.toString() + "," + j + ")\"");
                swap(arr, i, j);
                console.log(arr);
            }
        }
        operations.push("\"get(" + i.toString() + ")\"");
        operations.push("\"get(" + begin.toString() + ")\"");
        if (arr[begin] > arr[i]) {
            operations.push("\"swap(" + begin.toString() + "," + i + ")\"");
            swap(arr, begin, i);
        }
        QuickPartSort(arr, begin, i - 1, operations);
        QuickPartSort(arr, i, end, operations);
    } else {
        return;
    }
}

//堆排序
function heapSort(iArr) {
    var json_str = "{\"originData\":[" + iArr.toString() + "],\"operations\":[";
    var operations = [];
    var n = iArr.length;
    // 若有多个，则建最大堆
    // 建堆（Build-Max-Heap）
    for (var i = Math.floor(n / 2); i >= 0; i--) {
        maxHeapify(iArr, i, n - 1, operations);
    }
    // 堆排序
    for (var j = 0; j < n; j++) {
        if (n - 1 - j != 0) {
            operations.push("\"get(0)\"");
            operations.push("\"get(" + (n - 1 - j).toString() + ")\"");
            operations.push("\"swap(0," + (n - 1 - j).toString() + ")\"");
            swap(iArr, 0, n - 1 - j)
        }
        maxHeapify(iArr, 0, n - 2 - j, operations);
    }
    json_str += operations.toString() + "]}";
    console.log(json_str);
    return json_str;
}
function maxHeapify(Arr, i, size, operations) {
    var l = 2 * i + 1, r = 2 * i + 2; // 左子节点为2i + 1，右子节点为2i + 2
    var largest = i;
    // 若子节点比节点大，则标记
    if (l <= size) {
        operations.push("\"get(" + largest.toString() + ")\"");
        operations.push("\"get(" + l.toString() + ")\"");
        if (Arr[l] > Arr[largest])
            largest = l;
    }
    if (r <= size) {
        operations.push("\"get(" + largest.toString() + ")\"");
        operations.push("\"get(" + r.toString() + ")\"");
        if (Arr[r] > Arr[largest])
            largest = r;
    }
    // 若标记有子节点，则交换父子位置，并递归计算
    if (largest !== i) {
        operations.push("\"get(" + largest.toString() + ")\"");
        operations.push("\"get(" + i.toString() + ")\"");
        operations.push("\"swap(" + largest.toString() + "," + i.toString() + ")\"");
        swap(Arr, i, largest);
        maxHeapify(Arr, largest, size, operations);
    }
}

function swap (arr, a, b) {
    if (a === b) { return; }
    var c = arr[a];
    arr[a] = arr[b];
    arr[b] = c;
}


export {
    sortFunction
}