<template>
  <div id="app" style="overflow: hidden;">
    <div style="display: flex; justify-content: space-between; height: 500px;">
      <template>
        <vue-aliplayer-v2
          :source="source"
          ref="VueAliplayerV2"
          :options="options"
        />
      </template>
      <div style="margin-top: 20px;">
<!--        <b>弹幕</b>-->
      </div>
    </div>
    <div style="height: 100px;text-align: center; margin-top: -100px;display: flex;align-items: center;">
      <div class="block" style="display: flex; justify-content: space-between;align-items: center"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
      <div style="display: flex; justify-content: space-between;align-items: center">
        <div style="margin-left: 10px;"><b>湖南张家界水绕四门</b></div>
        <div><el-tag size="medium " type="warning"><b>湖南</b></el-tag></div>
      </div>
      <div style="margin-left: 400px;">
        <el-button size="medium" type="primary" icon="el-icon-star-on" style="background-color: #8D2EA9">订阅</el-button>
        <i class="el-icon-user" style="margin-left: 10px" ></i>
        <b style="margin-left: 5px" >500</b>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/aliplayercomponents-1.0.9.min.js'

const danmukuList = [{
  mode: 1,
  text: '哈哈',
  stime: 5000,
  size: 25,
  color: '0xffffff'
}, {
  mode: 1,
  text: '前方高能',
  stime: 6000,
  size: 25,
  color: '0xff0000'
}, {
  mode: 1,
  text: '灵魂歌手',
  stime: 7000,
  size: 25,
  color: '0xff0000'
}, {
  mode: 1,
  text: '顺手一划',
  stime: 8000,
  size: 25,
  color: '0x00c1de'
}]

export default {
  data () {
    return {
      options: {
        isLive: true, // 切换为直播流的时候必填
        width: '70%',
        height: '80%',
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
      source: 'http://gcksc.v.kcdnvip.com/gc/xjtcmys_1/index.m3u8',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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

</style>
