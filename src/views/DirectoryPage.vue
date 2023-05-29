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
            <div v-if="tableData[i-1]">
              <div class="div-container" style="display: flex;align-items: center;justify-content: space-between;">
                <div style="display: flex;align-items: center;justify-content: space-between;margin-left: 8px" @click="navigateToRoute('/live', tableData[i-1])">
                  <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                </div>
                <div style="font-size: 15px;margin-left: 10px"><b @click="navigateToRoute('/live', tableData[i-1])" style="cursor: pointer;" v-if="tableData[i-1]">{{tableData[i-1].roomName}}</b></div>
                <div style=""><el-tag size="medium " type="warning"><b v-if="tableData[i-1]">{{tableData[i-1].classification}}</b></el-tag></div>
                <div style="margin-right: 8px">
                  <i class="el-icon-user" style="margin-right: 10px"></i><b v-if="tableData[i-1]">{{tableData[i-1].fans}}</b>
                </div>
                <el-button @click="unsubscribe(i)" size="medium" type="primary" icon="el-icon-star-on" style="background-color: #8d2ea9">取消订阅</el-button>
                <!--                <div class="inner-div" @click="navigateToRoute('/live')">Div 1</div>-->
                <!--                <div class="inner-div" @click="navigateToRoute('/live')">Div 2</div>-->
                <!--                <div class="inner-div" @click="navigateToRoute('/live')">Div 3</div>-->
              </div>
              <el-divider></el-divider>
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
  name: 'DirectoryPage',
  inject: ['reload'],
  data () {
    return {
      count: 0,
      loading: false,
      showDirectory: false,
      tableData: [],
      roomData: {},
      userData: {},
      updateValue: [],
      isSubscribe: true
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
    this.userData = JSON.parse(localStorage.getItem('user'))
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
    },
    // checkSubscribeState () {
    //   if (JSON.parse(localStorage.getItem('user')) == null) {
    //     this.isButtonVisible = false
    //   } else {
    //     axios({
    //       method: 'post',
    //       url: 'http://localhost:9090/query?roomId=' + this.roomData.roomId + '&userId=' + this.userData.userId
    //     }).then(resp => {
    //       if (resp.data.code === 1) {
    //         this.isSubscribe = false
    //       } else {
    //         this.isSubscribe = true
    //       }
    //     })
    //   }
    // },
    // subscribe (i) {
    //   axios({
    //     method: 'post',
    //     url: 'http://localhost:9090/subscribe?roomId=' + this.tableData[i-1].roomId + '&userId=' + this.userData.userId
    //   }).then(resp => {
    //     if (resp.data.code === 0) {
    //       console.log(resp.data.code)
    //
    //       // console.log(localStorage.getItem('user'))
    //       // console.log(JSON.parse(localStorage.getItem('user')))
    //       // this.$router.push("/bookSys")
    //       // this.newUser = JSON.parse(localStorage.getItem('user'))
    //       // this.loginFormVisible = false
    //       // this.checkLocalStorage()
    //       this.selectRoomByRoomId()
    //       this.searchUserRooms()
    //       setTimeout(() => {
    //         this.updateParentData()
    //       }, 400)
    //       this.$message.success('订阅成功! ')
    //       // setTimeout(() => {
    //       //   window.location.reload()
    //       // }, 400)
    //     } else {
    //       // eslint-disable-next-line no-unused-expressions,no-sequences
    //       console.log(resp.data.code),
    //       this.$message.error('订阅失败!')
    //     }
    //   })
    // },
    unsubscribe (i) {
      axios({
        method: 'post',
        url: 'http://localhost:9090/unsubscribe?roomId=' + this.tableData[i - 1].roomId + '&userId=' + this.userData.userId
      }).then(resp => {
        if (resp.data.code === 0) {
          console.log(resp.data.code)

          // console.log(localStorage.getItem('user'))
          // console.log(JSON.parse(localStorage.getItem('user')))
          // this.$router.push("/bookSys")
          // this.newUser = JSON.parse(localStorage.getItem('user'))
          // this.loginFormVisible = false
          // this.checkLocalStorage()
          this.selectRoomByRoomId(i)
          this.searchUserRooms()
          setTimeout(() => {
            this.updateParentData()
          }, 200)
          this.$message.success('取消订阅成功! ')
          // setTimeout(() => {
          //   window.location.reload()
          // }, 400)
        } else {
          // eslint-disable-next-line no-unused-expressions,no-sequences
          console.log(resp.data.code),
          this.$message.error('取消订阅失败!')
        }
      })
    },
    selectRoomByRoomId (i) {
      axios({
        method: 'post',
        url: 'http://localhost:9090/selectRoomByRoomId',
        data: {
          roomId: this.tableData[i - 1].roomId
        }
      }).then(resp => {
        // console.log('resp.data.rooms[1]')
        // console.log(resp.data.rooms[1])
        // this.carouselData = resp.data.rooms
        // localStorage.setItem('rooms', JSON.stringify(resp.data.rooms))
        // this.tableData = JSON.parse(localStorage.getItem('rooms'))
        console.log('selectRoomByRoomId:resp.data:')
        console.log(resp.data)
        this.tableData[i - 1].fans = resp.data.room.fans
      }).catch(error => {
        console.error(error)
      })
    },
    searchUserRooms () {
      axios({
        method: 'post',
        url: 'http://localhost:9090/selectRoomByUserSubscription',
        data: {
          userId: JSON.parse(localStorage.getItem('user')).userId
        }
      }).then(resp => {
        console.log('searchUserRooms:resp.data')
        console.log(resp.data)
        // localStorage.setItem('userrooms', JSON.stringify(resp.data.rooms))
        this.tableData = resp.data.rooms
        this.updateValue = resp.data.rooms
        console.log(resp.data.rooms)
      }).catch(error => {
        console.error(error)
      })
    },
    updateParentData () {
      let newValue = []
      newValue = this.updateValue
      console.log('newValue')
      console.log(newValue)
      this.$emit('update-data', newValue)
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
