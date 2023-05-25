<template>
  <div>
    <div style="height: 65px; display: flex; align-items: center;">
      <b style="font-size: 55px; margin-right: auto;">浏览</b>
    </div>
    <div style="display: flex; justify-content: space-between;margin-top: 40px">
      <div>
        <el-button style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">
          <span style="margin-right: 120px;">游戏</span>
          <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>
        </el-button>
      </div>
      <div>
        <el-button style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">
          <span style="margin-right: 120px;">游戏</span>
          <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>
        </el-button>
      </div>
      <div>
        <el-button style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">
          <span style="margin-right: 120px;">游戏</span>
          <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>
        </el-button>
      </div>
      <div>
        <el-button style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">
          <span style="margin-right: 120px;">游戏</span>
          <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>
        </el-button>
      </div>
    </div>
    <div style="overflow:hidden">
      <div style="height: 80px; display: flex; align-items: center;">
        <b style="font-size: x-large; margin-left: 10px;">推荐</b>
      </div>
      <div>
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="i in count" :key="i" class="infinite-list-item" style="list-style-type:none">
            <div class="div-container">
              <div class="inner-div" @click="navigateToRoute('/live')">Div 1</div>
              <div class="inner-div" @click="navigateToRoute('/live')">Div 2</div>
              <div class="inner-div" @click="navigateToRoute('/live')">Div 3</div>
            </div>
          </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectoryPage',
  data () {
    return {
      count: 3,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= 8
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 1000)
    },
    navigateToRoute (route) {
      this.$router.push(route) // 使用$router.push方法进行路由跳转
    }
  }
}
</script>

<style scoped>
.div-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.inner-div {
  flex: 1;
  background-color: #8D2EA9;
  margin-left: 10px;
  cursor: pointer;
}
</style>
