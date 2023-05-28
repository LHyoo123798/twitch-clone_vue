<template>
  <div>
    <div style="height: 65px; display: flex; align-items: center;margin-bottom: 20px">
      <b style="font-size: 50px; margin-right: auto;">个人订阅</b>
    </div>
    <el-divider></el-divider>
    <div :style="{'display': showDirectory ? 'block' : 'none'}">
<!--      <div style="display: flex; justify-content: space-between;margin-top: 40px">-->
<!--        <div>-->
<!--          <el-button style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">-->
<!--            <span style="margin-right: 120px;">全部</span>-->
<!--            <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>-->
<!--          </el-button>-->
<!--        </div>-->
<!--        <div>-->
<!--          <el-button style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">-->
<!--            <span style="margin-right: 120px;">风景</span>-->
<!--            <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>-->
<!--          </el-button>-->
<!--        </div>-->
<!--        <div>-->
<!--          <el-button style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">-->
<!--            <span style="margin-right: 120px;">电影</span>-->
<!--            <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>-->
<!--          </el-button>-->
<!--        </div>-->
<!--        <div>-->
<!--          <el-button style="height: 50px;width:240px;color:white;border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;font-size: x-large;display: flex; align-items: center;">-->
<!--            <span style="margin-right: 120px;">游戏</span>-->
<!--            <i class="el-icon-video-camera-solid" style="font-size: xx-large;"></i>-->
<!--          </el-button>-->
<!--        </div>-->
<!--      </div>-->
      <div style="overflow:hidden" v-if="tableData.length>0">
<!--        <div style="height: 80px; display: flex; align-items: center;">-->
<!--          <b style="font-size: x-large; margin-left: 10px;">个人订阅</b>-->
<!--        </div>-->
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="i in count" :key="i" class="infinite-list-item" style="list-style-type:none">
            <div class="div-container" style="display: flex;align-items: center;justify-content: space-between;">
              <div style="display: flex;align-items: center;justify-content: space-between;margin-left: 8px" @click="navigateToRoute('/live', tableData[i-1])">
                <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              </div>
              <div style="font-size: 15px;margin-left: 10px"><b @click="navigateToRoute('/live', tableData[i-1])" style="cursor: pointer;">{{tableData[i-1].roomName}}</b></div>
              <div style=""><el-tag size="medium " type="warning"><b>{{tableData[i-1].classification}}</b></el-tag></div>
              <div style="margin-right: 8px">
                <i class="el-icon-user" style="margin-right: 10px"></i><b>{{tableData[i-1].fans}}</b>
              </div>
              <div><el-button size="medium" type="primary" icon="el-icon-star-on" style="background-color: #8d2ea9">订阅</el-button></div>
              <div><el-button size="medium" type="primary" icon="el-icon-star-on" style="background-color: #8d2ea9">取消订阅</el-button></div>
              <!--                <div class="inner-div" @click="navigateToRoute('/live')">Div 1</div>-->
              <!--                <div class="inner-div" @click="navigateToRoute('/live')">Div 2</div>-->
              <!--                <div class="inner-div" @click="navigateToRoute('/live')">Div 3</div>-->
            </div>
            <el-divider></el-divider>
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
  name: 'DirectoryPage',
  data () {
    return {
      count: 0,
      loading: false,
      showDirectory: false,
      tableData: []
    }
  },
  computed: {
    noMore () {
      return this.count >= JSON.parse(localStorage.getItem('userrooms')).length
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  mounted () {
    this.checkLocalStorage()
    this.tableData = JSON.parse(localStorage.getItem('userrooms'))
    console.log('this.tableData(浏览)')
    console.log(this.tableData)
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 1
        this.loading = false
      }, 300)
    },
    navigateToRoute (route, obj) {
      this.$router.push({
        path: route,
        query: { data: JSON.stringify(obj) }
      })
    },
    checkLocalStorage () {
      if (localStorage.getItem('user') != null) {
        // window.location.reload()
        // this.showDiv = false
        this.showDirectory = true
        // this.isLoggedIn = true
      } else {
        // window.location.reload()
        // this.showDiv = true
        this.showDirectory = false
        // this.isLoggedIn = false
      }
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

.el-avatar {
  cursor: pointer;
}
</style>
