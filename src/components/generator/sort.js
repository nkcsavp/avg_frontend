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
                        mvs.value.push("swap(" + tempIndex + "," + j + ")")
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
        }
    }
}
