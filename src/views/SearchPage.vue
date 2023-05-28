<template>
  <div>
    <div style="height: 65px; display: flex; align-items: center;margin-bottom: 20px">
      <b style="font-size: 50px; margin-right: auto;">搜索</b>
    </div>
    <el-divider></el-divider>
    <div>
      <div style="overflow:hidden" v-if="tableData.length>0">
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
  name: 'SearchPage',
  data () {
    return {
      count: 0,
      loading: false,
      tableData: [],
      inputValue: ''
    }
  },
  computed: {
    noMore () {
      return this.count >= this.tableData.length
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  mounted () {
    const dataString = this.$route.query.data
    if (dataString) {
      this.inputValue = JSON.parse(dataString)
      this.searchAll()
      console.log('this.inputValue')
      console.log(this.inputValue)
    }
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
    searchAll () {
      if (this.inputValue === '风景' || this.inputValue === '游戏' || this.inputValue === '电影') {
        if (this.inputValue === '风景') {
          // eslint-disable-next-line vue/no-mutating-props
          this.inputValue = 'landscape'
        } else if (this.inputValue === '游戏') {
          // eslint-disable-next-line vue/no-mutating-props
          this.inputValue = 'game'
        } else if (this.inputValue === '电影') {
          // eslint-disable-next-line vue/no-mutating-props
          this.inputValue = 'movie'
        }
        axios({
          method: 'post',
          url: 'http://localhost:9090/selectRoom',
          data: {
            roomName: '',
            classification: this.inputValue
          }
        }).then(resp => {
          console.log('resp.data.rooms[1]')
          console.log(resp.data.rooms[1])
          this.tableData = resp.data.rooms
          // localStorage.setItem('rooms', JSON.stringify(resp.data.rooms))
          console.log('this.tableData:')
          console.log(this.tableData)
        }).catch(error => {
          console.error(error)
        })
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:9090/selectRoom',
          data: {
            roomName: this.inputValue,
            classification: ''
          }
        }).then(resp => {
          console.log('resp.data.rooms[1]')
          console.log(resp.data.rooms[1])
          this.tableData = resp.data.rooms
          // localStorage.setItem('rooms', JSON.stringify(resp.data.rooms))
          console.log('this.tableData:')
          console.log(this.tableData)
        }).catch(error => {
          console.error(error)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
