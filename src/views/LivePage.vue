<template>
  <div id="app" style="overflow: hidden">
    <div style="display: flex; justify-content: space-between; height: 500px" v-if="source">
      <template>
        <vue-aliplayer-v2 v-if="source" @error="handleErr" :source="source" ref="VueAliplayerV2" :options="options" />
      </template>
    </div>
    <div style="
          height: 70px;
          text-align: center;
          margin-top: -70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
      <div class="block" style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
        <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
          <div style="margin-left: 10px"><b>{{roomData.roomName}}</b></div>
          <div style="margin-left: 8px;">
            <el-tag size="medium " type="warning"><b>{{roomData.classification}}</b></el-tag>
          </div>
        </div>
      </div>
      <div style="margin-right: 0px">
        <el-button :class="{ 'hidden-button': !isButtonVisible }" v-if="needSubscribe" @click="subscribe()" size="medium" type="primary" icon="el-icon-star-on" style="background-color: #8d2ea9">订阅</el-button>
        <el-button :class="{ 'hidden-button': !isButtonVisible }" v-else @click="unsubscribe()" size="medium" type="primary" icon="el-icon-star-on" style="background-color: #8d2ea9">取消订阅</el-button>
        <i class="el-icon-user" style="margin-left: 10px"></i>
        <b style="margin-left: 5px">{{roomData.fans}}</b>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/aliplayercomponents-1.0.9.min.js'
import axios from 'axios'

const danmukuList = [
  {
    mode: 1,
    text: '哈哈',
    stime: 1000,
    size: 25,
    color: '0xffffff'
  },
  {
    mode: 1,
    text: '前方高能',
    stime: 1500,
    size: 25,
    color: '0xff0000'
  },
  {
    mode: 1,
    text: '灵魂歌手',
    stime: 2000,
    size: 25,
    color: '0xff0000'
  },
  {
    mode: 1,
    text: '顺手一划',
    stime: 3000,
    size: 25,
    color: '0x00c1de'
  }
]

export default {
  inject: ['reload'],
  data () {
    return {
      options: {
        isLive: true, // 切换为直播流的时候必填
        width: '100%',
        height: '85%',
        autoplay: true,
        controlBarVisibility: 'hover',
        components: [
          {
            name: 'AliplayerDanmuComponent', // 弹幕组件
            // eslint-disable-next-line no-undef
            type: AliPlayerComponent.AliplayerDanmuComponent,
            args: [danmukuList]
          }
        ]
      },
      source: '',
      // source: 'https://cn-gddg-ct-01-16.bilivideo.com/live-bvc/384967/live_486592656_25467575_1500/index.m3u8',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      roomData: {},
      userData: {},
      updateValue: [],
      needSubscribe: true,
      isButtonVisible: true
    }
  },
  mounted () {
    const dataString = this.$route.query.data
    if (dataString) {
      this.roomData = JSON.parse(dataString)
      this.userData = JSON.parse(localStorage.getItem('user'))
      console.log('this.roomData')
      console.log(this.roomData)
      this.source = this.roomData.url
    }
    console.log('this.source')
    console.log(this.source)
    this.checkSubscribeState()
  },
  methods: {
    checkSubscribeState () {
      if (JSON.parse(localStorage.getItem('user')) == null) {
        this.isButtonVisible = false
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:9090/query?roomId=' + this.roomData.roomId + '&userId=' + this.userData.userId
        }).then(resp => {
          if (resp.data.code === 1) {
            this.needSubscribe = false
          } else {
            this.needSubscribe = true
          }
        })
      }
    },
    /**
     * 播放器事件回调
     */
    handleErr (e) {
      console.log('error', e)
      this.$message.error('主播还在赶来的路上！请观看其他直播！')
      setTimeout(() => {
        this.$refs.VueAliplayerV2.dispose()
        this.$router.push({ path: '/', name: 'home' })
        window.location.reload()
      }, 800)
    },
    subscribe () {
      axios({
        method: 'post',
        url: 'http://localhost:9090/subscribe?roomId=' + this.roomData.roomId + '&userId=' + this.userData.userId
      }).then(resp => {
        if (resp.data.code === 0) {
          console.log(resp.data.code)

          // console.log(localStorage.getItem('user'))
          // console.log(JSON.parse(localStorage.getItem('user')))
          // this.$router.push("/bookSys")
          // this.newUser = JSON.parse(localStorage.getItem('user'))
          // this.loginFormVisible = false
          // this.checkLocalStorage()
          this.selectRoomByRoomId()
          this.searchUserRooms()
          setTimeout(() => {
            this.updateParentData()
          }, 200)
          this.$message.success('订阅成功! ')
          this.needSubscribe = false
          // setTimeout(() => {
          //   window.location.reload()
          // }, 400)
        } else {
          // eslint-disable-next-line no-unused-expressions,no-sequences
          console.log(resp.data.code),
          this.$message.error('订阅失败!')
          this.needSubscribe = true
        }
      })
    },
    unsubscribe () {
      axios({
        method: 'post',
        url: 'http://localhost:9090/unsubscribe?roomId=' + this.roomData.roomId + '&userId=' + this.userData.userId
      }).then(resp => {
        if (resp.data.code === 0) {
          console.log(resp.data.code)
          // console.log(localStorage.getItem('user'))
          // console.log(JSON.parse(localStorage.getItem('user')))
          // this.$router.push("/bookSys")
          // this.newUser = JSON.parse(localStorage.getItem('user'))
          // this.loginFormVisible = false
          // this.checkLocalStorage()
          this.selectRoomByRoomId()
          this.searchUserRooms()
          setTimeout(() => {
            this.updateParentData()
          }, 200)
          this.$message.success('取消订阅成功! ')
          this.needSubscribe = true
          // setTimeout(() => {
          //   window.location.reload()
          // }, 400)
        } else {
          // eslint-disable-next-line no-unused-expressions,no-sequences
          console.log(resp.data.code),
          this.$message.error('取消订阅失败!')
          this.needSubscribe = false
        }
      })
    },
    selectRoomByRoomId () {
      axios({
        method: 'post',
        url: 'http://localhost:9090/selectRoomByRoomId',
        data: {
          roomId: this.roomData.roomId
        }
      }).then(resp => {
        // console.log('resp.data.rooms[1]')
        // console.log(resp.data.rooms[1])
        // this.carouselData = resp.data.rooms
        // localStorage.setItem('rooms', JSON.stringify(resp.data.rooms))
        // this.tableData = JSON.parse(localStorage.getItem('rooms'))
        console.log('selectRoomByRoomId:resp.data:')
        console.log(resp.data)
        this.roomData.fans = resp.data.room.fans
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
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.source-box {
  padding: 5px 10px;
  margin-bottom: 20px;

  .source-label {
    margin-right: 20px;
    font-size: 16px;
    display: block;
  }

  #source {
    margin-top: 10px;
  }

  .source-input {
    margin-top: 10px;
    padding: 5px 10px;
    width: 80%;
    border: 1px solid #ccc;
  }
}

.ali-danmuku-control {
  display: flex;
  justify-content: space-between;
}

.ali-danmu-input-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-right: 5px;
}

.ali-danmu-input {
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
}

.prism-controlbar {
  position: relative;
}

.ali-danmuku-control {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.iconfont icon-danmu-open {
  margin-bottom: 10px;
}

.hidden-button {
  display: none;
}
</style>
