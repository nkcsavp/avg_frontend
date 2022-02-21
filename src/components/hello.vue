<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>交互式算法可视化平台</h1>
          <h2>Interactive Algorithm Visualization Platform</h2>
          <el-link href="https://github.com/nkcsavp">Github<i class="el-icon-star-on el-icon--right"></i> </el-link>
        </div>
      </template>
      <h4>作者：</h4>
      <div class="author-box">
        <el-link href="https://github.com/lihangyu1913092">李航宇 @lihangyu1913092<i class="el-icon-arrow-right el-icon--right"></i> </el-link>
        <br>
        <el-link href="https://github.com/NicerWang">王浩伟 @NicerWang<i class="el-icon-arrow-right el-icon--right"></i> </el-link>
        <br>
        <el-link href="https://github.com/TumbledoreAlalalala">陶稳冲 @TumbledoreAlalalala<i class="el-icon-arrow-right el-icon--right"></i> </el-link>
        <br>
        <el-link href="https://github.com/lmj2001">黎明杰 @lmj2001<i class="el-icon-arrow-right el-icon--right"></i> </el-link>
        <br>
        <el-link href="https://github.com/orgs/nkcsavp/people/lvyou2000">吕尤 @lvyou2000<i class="el-icon-arrow-right el-icon--right"></i> </el-link>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h3>开发进度</h3>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hollow="activity.hollow"
            :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>

    </el-card>
  </div>

</template>

<script>
import { useStore } from "vuex";

export default {
  name: "hello",
  setup(){
    const store = useStore()
    store.dispatch("Finished")
    return{
      activities: [
        {
          content: '图算法模块-动画模块v2',
          timestamp: '2021-11-10',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          content: '树算法模块-动画模块v2',
          timestamp: '2021-10-10',
        },
        {
          content: '排序算法模块-动画模块v1',
          timestamp: '2021-9-28',
        },
        {
          content: '网站前端搭建',
          timestamp: '2021-9-01',
        },
        {
          content: '基于docker-compose的部署',
          timestamp: '2021-06-23',
        },
        {
          content: '网站后端搭建',
          timestamp: '2021-05-28',
        },
      ],
    }
  },
}
</script>

<style scoped>
h1 h2{
  display: inline;
}
.card-header {
  justify-content: space-between;
  align-items: center;
}
.author-box{
  padding: 10px;
}
.author-box div{
  padding: 5px;
}
.box-card {
  width: 80%;
  padding: 20px;
  margin: 40px;
}
</style>