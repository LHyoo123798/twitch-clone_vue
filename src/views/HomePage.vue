<template>
  <div class="demo">
    <div v-if="carouselData.length>0">
      <el-carousel :interval="0" :type="carouselType" height="280px" width="500px" indicator-position="none" arrow="always" v-if="carouselData.length>0">
        <el-carousel-item v-for="item in 6" :key="item">
          <div style="height: 100%;width: 100%;display: flex;align-items: center">
            <div style="width: 70%;height: 100%" @click="navigateToRoute('/live', carouselData[item-1])" v-if="carouselData[item-1]">
              <el-image :src="require('@/assets/cover/'+carouselData[item-1].cover)"></el-image>
            </div>
            <div style="width: 30%;height: 100%" v-if="carouselData[item-1]">
              <div style="width: 100%;height: 18%"><el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar></div>
              <div style="width: 100%;height: 18%;font-size: 15px"><b>{{carouselData[item-1].roomName}}</b></div>
              <div style="width: 100%;height: 18%"><el-tag size="medium " type="warning"><b>{{carouselData[item-1].classification}}</b></el-tag></div>
              <div style="width: 100%;height: 18%">
                <i class="el-icon-user" style="margin-right: 10px"></i><b>{{carouselData[item-1].fans}}</b>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="display: flex; justify-content: space-between;margin-top: 40px">
      <div>
        <el-button @click="searchAll ('','')" style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">
          <span style="margin-right: 120px;">全部</span>
          <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>
        </el-button>
      </div>
      <div>
        <el-button @click="searchAll ('','landscape')" style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">
          <span style="margin-right: 120px;">风景</span>
          <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>
        </el-button>
      </div>
      <div>
        <el-button  @click="searchAll ('','movie')" style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">
          <span style="margin-right: 120px;">电影</span>
          <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>
        </el-button>
      </div>
      <div>
        <el-button  @click="searchAll ('','game')" style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">
          <span style="margin-right: 120px;">游戏</span>
          <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>
        </el-button>
      </div>
    </div>
    <div style="overflow:hidden">
      <div style="height: 80px; display: flex; align-items: center;">
        <b style="font-size: x-large; margin-left: 10px;">当前热门</b>
      </div>
      <div v-if="tableData.length>0">
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="i in count" :key="i" class="infinite-list-item" style="list-style-type:none">
            <div class="div-container" v-if="tableData.length>0">
              <div style="height: 320px;width: 100px" v-for="index in 3" :key="index" class="inner-div" @click="navigateToRoute('/live', tableData[i * 3 - 3 + index - 1])">
                <div style="height: 80%;width: 100%"  v-if="tableData[i * 3 - 3 + index - 1]">
                  <el-image :src="require('@/assets/cover/'+tableData[i * 3 - 3 + index - 1].cover)"></el-image>
                </div>
                <div style="height: 20%;width: 100%;display: flex;align-items: center;justify-content: space-between;" v-if="tableData[i * 3 - 3 + index - 1]">
                  <div style="display: flex;align-items: center;justify-content: space-between;margin-left: 8px"><el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar></div>
                  <div style="font-size: 15px;margin-left: 10px"><b>{{tableData[i * 3 - 3 + index - 1].roomName}}</b></div>
                  <div style=""><el-tag size="medium " type="warning"><b>{{tableData[i * 3 - 3 + index - 1].classification}}</b></el-tag></div>
                  <div style="margin-right: 8px">
                    <i class="el-icon-user" style="margin-right: 10px"></i><b>{{tableData[i * 3 - 3 + index - 1].fans}}</b>
                  </div>
                </div>
              </div>
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

import axios from 'axios'

export default {
  name: 'HomePage',
  props: ['carouselType'], // 接收来自父组件的carouselType属性
  data () {
    return {
      count: 3,
      loading: false,
      tableData: [], // 初始化为一个空数组
      roomName: '',
      classification: '',
      carouselData: []
    }
  },
  // created () {
  //   this.searchAll()
  //   console.log('(created)this.tableData:')
  //   console.log(this.tableData)
  // },
  computed: {
    noMore () {
      return this.count >= this.tableData.length / 3
    },
    disabled () {
      return this.loading || this.noMore
    }
    // getCoverImagePath (index) {
    //   console.log('图片：')
    //   console.log(`@/assets/cover/${this.carouselData[index - 1].cover}`)
    //   return `@/assets/cover/${this.carouselData[index - 1].cover}`
    // }
  },
  mounted () {
    this.searchHot()
    this.searchAll(this.roomName, this.classification)
    // this.tableData = JSON.parse(localStorage.getItem('rooms'))
    console.log('(mounted)this.tableData:')
    console.log(this.tableData)
  },
  methods: {
    searchHot () {
      axios({
        method: 'post',
        url: 'http://localhost:9090/selectRoom',
        data: {}
      }).then(resp => {
        // console.log('resp.data.rooms[1]')
        // console.log(resp.data.rooms[1])
        this.carouselData = resp.data.rooms
        // localStorage.setItem('rooms', JSON.stringify(resp.data.rooms))
        // this.tableData = JSON.parse(localStorage.getItem('rooms'))
        console.log('this.tableData:')
        console.log(this.tableData)
      }).catch(error => {
        console.error(error)
      })
    },
    searchAll (roomName, classification) {
      axios({
        method: 'post',
        url: 'http://localhost:9090/selectRoom',
        data: {
          roomName: roomName,
          classification: classification
        }
      }).then(resp => {
        console.log('resp.data.rooms[1]')
        console.log(resp.data.rooms[1])
        this.tableData = resp.data.rooms
        // localStorage.setItem('rooms', JSON.stringify(resp.data.rooms))
        // this.tableData = JSON.parse(localStorage.getItem('rooms'))
        console.log('this.tableData:')
        console.log(this.tableData)
      }).catch(error => {
        console.error(error)
      })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 1000)
    },
    navigateToRoute (route, obj) {
      this.$router.push({
        path: route,
        query: { data: JSON.stringify(obj) }
      })
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
  background-color: white;
  margin-left: 10px;
  cursor: pointer;
}

.el-image {
  height: 100%;
}
</style>
