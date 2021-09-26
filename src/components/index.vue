<template>
  <el-header>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router>
      <el-menu-item style="font-weight: bold;font-size: 20px;" index="/">主页</el-menu-item>
      <el-menu-item index="/home">算法可视化</el-menu-item>
      <el-button style="width: 80px;height: 50px;margin-top:3px"
                 @click="$router.push('/login')" plain round>登录
      </el-button>
      <el-button style="width: 80px;height: 50px;margin-top:3px"
                 @click="$router.push('/register')" plain round>注册
      </el-button>
    </el-menu>
  </el-header>

  <div id="back">
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <h1>算法可视化</h1>
          <h4>一个可以让学习算法变简单的网站</h4>
          <h5>A website that makes learning algorithms easier</h5>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :sm="4" :offset="6">
              <div class="grid-content bg-purple">
                <el-button style="font-size: 20px" class="button" @click="$router.push('/home')" type="info" round>
                  开始体验
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

  </div>
  <br>


  <el-main>
    <div id="main-content">
      <el-row :gutter="20">
        <el-col :span="1">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :sm="7">
          <div class="grid-content bg-purple">
            <el-image
                style="width: 100%; height: 320px"
                :src="url1"></el-image>
            <p class="content-title">排序</p>
            <div class="content">&emsp;&emsp;排序是计算机的一种操作方法,其目的是将一组“无序”的记录序列调整为“有序”的记录序列。</div>
            <div class="content"> &emsp;&emsp;排序算法（Sorting algorithm）是一种能将一串数据依照特定排序方式进行排列的一种算法。</div>
          </div>
        </el-col>
        <el-col :sm="8">
          <div class="grid-content bg-purple">
            <el-image
                style="width: 100%; height: 320px"
                :src="url2"></el-image>
            <p class="content-title">树</p>
            <div class="content">&emsp;&emsp;树是一种数据结构，它是由n(n≥1)个有限节点组成一个具有层次关系的集合。把它叫做“树”是因为它看起来像一棵倒挂的树，
              也就是说它是根朝上，而叶朝下的。
            </div>
          </div>
        </el-col>

        <el-col :sm="7">
          <div class="grid-content bg-purple">
            <el-image
                style="width: 100%; height: 320px"
                :src="url3"></el-image>
            <p class="content-title">图</p>
            <div class="content">&emsp;&emsp; 图结构是一种非线性的数据结构。所有的顶点构成一个顶点集合，所有的边构成边的集合，
              一个完整的图结构就是由顶点集合和边集合组成。图结构在数学上记为以下形式：
            </div>
            <div class="content"> &emsp;&emsp;G=(V,E)或者 G=(V(G)，E( G))</div>
          </div>
        </el-col>

      </el-row>
    </div>
  </el-main>

  <div id="foot-back">
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p style="font-size: 20px;font-weight: bold">链接</p>
          <div>
            <el-link :underline="false" href="https://github.com/nkcsavp" target="_blank">仓库地址
              <i class="el-icon-position"></i></el-link>
          </div>
          <div>
            <el-link :underline="false" @click="$router.push('/home')">开始体验
              <i class="el-icon-position"></i></el-link>
          </div>

        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">hhh</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">hhh</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      url1: '/sort.gif',
      url2: '/tree.gif',
      url3: '/figure.gif'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  }
}
</script>

<style>
#back {
  width: 100%;
  height: 600px;
  /*background-color: #99a9bf;*/
  /*background-image: url("https://www.blockchain.com/static/img/home/home-hero-gradient.svg");*/
  background-image: url("bc.jpg");
  background-size: cover;
}

h1 {
  font-size: 50px;
  /*margin-left: 450px;*/
  text-align: center;
  margin-top: 80px;
}

h4 {
  font-size: 30px;
  text-align: center;
  /*margin-left: 350px;*/
}

h5 {
  font-size: 25px;
  text-align: center;
  /*margin-left: 300px;*/
}

.button {
  width: 180px;
  height: 50px;
}

#main-content {
  width: 100%;
  /*height: 600px;*/
  /*background-color: red;*/
}

#foot-back {
  width: 100%;
  height: 200px;
  /*background-color: #303846;*/
  background: #d3dce6;
}

.content-title {
  font-weight: bold;
  font-size: 25px;
  text-align: center;
}

.content {
  letter-spacing: 3px;
}

</style>