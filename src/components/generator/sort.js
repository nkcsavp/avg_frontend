/*
排序算法
sort.js
 */
export function getSortTypes() {
    return {
        /*
            在下方添加新增的算法名称
            Add new algorithms below
         */
        "bubble": "冒泡排序",
        "select": "选择排序",
        "insert": "插入排序",
        "quick": "快速排序",
        "shell": "希尔排序",
        "merge": "归并排序"

    }
}

export function getFunctions() {
    return {
        /*
            Example: 冒泡排序 Bubble Sort
        */
        "bubble": (data, mvs, infos) => {
            let len = data.length;
            for (let i = 0; i < len - 1; i++) {
                mvs.value.push("get(0)")
                infos.value.push("获取arr[1]的值")
                for (let j = 0; j < len - 1 - i; j++) {
                    // 必须保证mvs和infos的长度一致
                    mvs.value.push("get(" + (j + 1) + ")")
                    infos.value.push("获取arr[" + (j + 2) + "]的值")
                    if (data[j] > data[j + 1]) {
                        mvs.value.push("swap(" + j + "," + (j + 1) + ")")
                        infos.value.push("arr[" + (j + 1) + "]的值(" + data[j] + ")大于arr[" + (j + 2) + "]的值(" + data[j + 1] + ")，进行交换")
                        let temp = data[j + 1];
                        data[j + 1] = data[j];
                        data[j] = temp;
                    }
                }
                if (i === len - 2) {
                    mvs.value.push("clear()")
                    infos.value.push("排序完成")
                    return
                }
                mvs.value.push("clear()")
                infos.value.push("第" + (i + 1) + "次循环完成")
                mvs.value.push("barrier(" + (len - i - 1) + ")")
                infos.value.push("仅处理前" + (len - i - 1) + "个数字")
            }
        },
        /*
            在下方添加新增的算法
            Add new algorithms functions below
        */
        /*
            Example: 选择排序 Select Sort
        */
        "select": (data, mvs, infos) => {
            let len = data.length;
            for (let i = 0; i < len - 1; i++) {
                var minIndex = i
                for (let j = i + 1; j < len; j++) {
                    mvs.value.push("get(" + j.toString() + ")")
                    infos.value.push("获取arr[" + j.toString() + "]的值")
                    if (data[minIndex] > data[j]) {
                        minIndex = j
                    }
                }
                if (minIndex === i) {
                    mvs.value.push("barrier(" + (i + 1) + ")")
                    infos.value.push("前" + (i + 1) + "个数字已排好序")
                    mvs.value.push("clear()")
                    infos.value.push("第" + (i + 1) + "次循环完成")
                    continue
                }
                mvs.value.push("swap(" + i + "," + minIndex + ")")
                infos.value.push("arr[" + minIndex + "]的值" + data[minIndex] + "最小，与第" + (i + 1) + "个进行交换")
                let temp = data[minIndex];
                data[minIndex] = data[i];
                data[i] = temp;
                mvs.value.push("barrier(" + (i + 1) + ")")
                infos.value.push("前" + (i + 1) + "个数字已排好序")
                mvs.value.push("clear()")
                infos.value.push("第" + (i + 1) + "次循环完成")
            }
            mvs.value.push("clear()")
            infos.value.push("排序完成")
        },
        "insert": (data, mvs, infos) => {
            let len = data.length;
            for (let i = 1; i < len; i++) {
                let tempIndex = i
                for (let j = i - 1; j >= 0; j--) {
                    mvs.value.push("get(" + tempIndex + ")")
                    infos.value.push("获取arr[" + (tempIndex + 1) + "]的值")
                    mvs.value.push("get(" + j + ")")
                    infos.value.push("获取arr[" + (j + 1) + "]的值")
                    if (data[tempIndex] < data[j]) {
                        mvs.value.push("swap(" + j + "," + tempIndex + ")")
                        infos.value.push("arr[" + (j + 1) + "]的值(" + data[j] + ")大于arr[" + (tempIndex + 1) + "]的值(" + data[tempIndex] + ")，进行交换")
                        let temp = data[tempIndex];
                        data[tempIndex] = data[j];
                        data[j] = temp;
                        tempIndex = j
                    } else break
                }
                mvs.value.push("clear()")
                infos.value.push("第" + i + "次循环完成")
                mvs.value.push("barrier(" + (i + 1) + ")")
                infos.value.push("仅处理前" + (i + 1) + "个数字")
            }
            mvs.value.push("clear()")
            infos.value.push("排序完成")
        },

        "quick": (data, mvs, infos) => {
            const quickSort = (left, right) => {
                let i = left
                let j = right
                const baseVal = data[left] // 取无序数组第一个数为基准值
                mvs.value.push("get(" + left + ")")
                infos.value.push("获取arr[" + (left + 1) + "]的值为基准值")
                while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
                    // mvs.value.push("get(" + i + ")")
                    // infos.value.push("获取arr[" + (i + 1) + "]的值")
                    mvs.value.push("get(" + j + ")")
                    infos.value.push("获取arr[" + (j + 1) + "]的值")
                    while (j > i && data[j] > baseVal) { //找到一个比基准值小的数交换
                        mvs.value.push("get(" + j + ")")
                        infos.value.push("获取arr[" + (j + 1) + "]的值")
                        j--
                    }
                    while (i < j && data[i] < baseVal) { //找到一个比基准值大的数交换
                        mvs.value.push("get(" + i + ")")
                        infos.value.push("获取arr[" + (i + 1) + "]的值")
                        i++
                    }

                    if (i < j && data[i] === data[j]) {
                        mvs.value.push("get(" + i + ")")
                        infos.value.push("获取arr[" + (i + 1) + "]的值")
                        i++;
                    } else {//交换
                        if (i >= j) break
                        mvs.value.push("get(" + i + ")")
                        infos.value.push("获取arr[" + (i + 1) + "]的值")
                        mvs.value.push("get(" + j + ")")
                        infos.value.push("获取arr[" + (j + 1) + "]的值")
                        mvs.value.push("swap(" + i + "," + j + ")")
                        infos.value.push("arr[" + (i + 1) + "]的值(" + data[i] + ")大于arr[" + (j + 1) + "]的值(" + data[j] + ")，进行交换")
                        let temp = data[i];
                        data[i] = data[j];
                        data[j] = temp;
                    }
                }
                mvs.value.push("blank()")
                infos.value.push("该数字排在第" + (i + 1) + "位")
                // 将左边的无序数组重复上面的操作
                if (i - 1 > left) {
                    quickSort(left, j - 1)
                }
                // 将右边的无序数组重复上面的操作
                if (j + 1 < right) {
                    quickSort(j + 1, right)
                }
            }
            quickSort(0, data.length - 1)
            mvs.value.push("blank()")
            infos.value.push("排序完成")
        },

        "shell": (data, mvs, infos) => {
            const swap = (i, j) => {
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
            for (let gap = Math.floor(data.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (var i = gap; i < data.length; i += gap) {
                    var temp = i;
                    while (temp - gap >= 0) {
                        mvs.value.push("get(" + (temp - gap) + ")")
                        infos.value.push("获取arr[" + (temp - gap + 1) + "]的值")
                        mvs.value.push("get(" + (temp) + ")")
                        infos.value.push("获取arr[" + (temp + 1) + "]的值")
                        if (data[temp] < data[temp - gap]) {
                            mvs.value.push("swap(" + (temp - gap) + "," + temp + ")")
                            infos.value.push("arr[" + (temp - gap + 1) + "]的值(" + data[temp - gap] + ")大于arr[" + (temp + 1) + "]的值(" + data[temp] + ")，进行交换")
                            swap(temp - gap, temp);
                        } else
                            break;
                        temp -= gap;
                    }
                }
            }
        },
        "merge": (data, mvs, infos) => {
            const swap = (data, i, j) => {
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
            const merge = (arr, index, len) => {
                for (var i = index + len / 2; i <= Math.min(arr.length - 1, index + len - 1); i++) {
                    var temp = i;
                    while (temp - 1 >= 0) {
                        mvs.value.push("get(" + (temp - 1) + ")")
                        infos.value.push("获取arr[" + (temp) + "]的值")
                        mvs.value.push("get(" + (temp) + ")")
                        infos.value.push("获取arr[" + (temp + 1) + "]的值")
                        if (arr[temp] < arr[temp - 1]) {
                            mvs.value.push("swap(" + (temp - 1) + "," + temp + ")")
                            infos.value.push("arr[" + (temp) + "]的值(" + data[temp - 1] + ")大于arr[" + (temp + 1) + "]的值(" + data[temp] + ")，进行交换")
                            swap(data, temp - 1, temp);
                        } else {
                            break;
                        }
                        temp--;
                    }
                }
            }
            for (var i = 2; (i <= data.length) || (i / 2 < data.length && i > data.length); i *= 2) {
                for (var j = 0; j < data.length; j += i) {
                    merge(data, j, i);
                }
            }
        }
    }
}
