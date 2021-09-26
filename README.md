# avg_frontend
frontend for Algorithm Visualization Platform.


* 部署方法

    ```shell
      npm run build
    ```

  而后将dist目录下产生的文件，上传到服务器的`/root/Project/files/avp_frontend`中，即可通过服务器IP访问

* 使用方法

  * 运行方法:(需要有nodejs环境,在项目根目录下执行)
    ```shell
      npm install
      npm run dev
    ```
    而后在`localhost:3000`即可访问.
  
  * 排序动画代码放在animate/sort-core.vue中,调试直接访问`http://localhost:3000/#/debug/s`

  * js算法直接将js文件全部放在model中即可,后续会进行利用

* 注意事项
 
  * 不要上传提交node_modules和.idea和package-lock.json

  * 对于html中的类而言，不同单词使用全小写中划线连接，如`contenttitle`应写为`content-title`
  
  * 对于js中的函数而言，必须使用驼峰命名，每行代码结束必须有分号。

  * 对ajax请求而言，推荐采用以下写法：
  
  ```js
  axios({
        method: "POST",
        url: "LogInServlet",
        params: {
          tel: tel.value,
          pwd: pwd.value,
        }
      }).then((res) => {
        if (res.data) {
          store.dispatch("SignIn", res.data);
          router.push("/movie");
        } else {
          pwd.value = "";
          wrong.value = true;
        }
        store.dispatch("Finished");
      });
  ```