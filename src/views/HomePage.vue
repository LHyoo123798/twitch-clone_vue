<template>
  <div class="demo">
    <div>
      <el-carousel :interval="0" :type="carouselType" height="280px" width="500px" indicator-position="none" arrow="always">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
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
        <b style="font-size: x-large; margin-left: 10px;">当前热门</b>
      </div>
      <div>
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="i in count" :key="i" class="infinite-list-item" style="list-style-type:none">
            <div class="div-container">
              <div class="inner-div">Div 1</div>
              <div class="inner-div">Div 2</div>
              <div class="inner-div">Div 3</div>
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
  name: 'HomePage',
  props: ['carouselType'], // 接收来自父组件的carouselType属性
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
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.div-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.inner-div {
  flex: 1;
  background-color: #8D2EA9;
  margin-left: 10px;
}

</style>
