<template>
  <div class="m-sidebar-box">
    <div class="group-container">
      <div class="group">
        <div class="s-title">推荐</div>
        <ul class="ul">
          <li class="item active" @click="routerLinkTo('discover')"><i class="iconfont icon-music"></i> 发现音乐</li>
          <li class="item" @click="checkUpdate"><i class="iconfont icon-radar"></i> 私人FM</li>
          <li class="item"><i class="iconfont icon-mv"></i> MV</li>
          <li class="item"><i class="iconfont icon-friend"></i> 朋友</li>
        </ul>
      </div>
      <div class="group">
        <div class="s-title">我的音乐</div>
        <ul class="ul">
          <li class="item"><i class="iconfont icon-5avscdh1zr"></i> iTunes音乐</li>
          <li class="item"><i class="iconfont icon-xiazai"></i> 下载的音乐</li>
        </ul>
      </div>
      <div class="group">
        <div class="s-title">创建的歌单</div>
        <ul class="ul">
          <li class="item"><i class="iconfont icon-like"></i> 我喜欢的音乐</li>
          <li class="item"><i class="iconfont icon-22musicplaylist"></i> new music</li>
        </ul>
      </div>
      <div class="group">
        <div class="s-title">收藏的歌单</div>
        <ul class="ul">
          <li class="item"><i class="iconfont icon-22musicplaylist"></i> 2018年四月最热新歌TOP50</li>
          <li class="item"><i class="iconfont icon-22musicplaylist"></i> 倾听100部电影，爱情的美丽与哀愁</li>
        </ul>
      </div>
    </div>
    <div class="grop-blank"></div>
    <div class="play-card flex" v-if="playing.id">
      <div class="album"><img :src="playing.al && playing.al.picUrl" alt="" class="album-image"></div>
      <div class="album-item grow-1">
        <div class="music-title">{{playing.name}}</div>
        <div class="artauth">{{playing.ar[0].name}}</div>
      </div>
      <div class="album-item">
        <div class="el-icon-delete"></div>
        <div class="iconfont icon-like"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { ipcRenderer } from 'electron'
export default {
  name: 'sidebar',
  data () {
    return {}
  },
  created () {
    // this.$router.push({name: 'discover'})
  },
  computed: {
    ...mapGetters({
      playing: 'current_play_muisc'
    })
  },
  methods: {
    routerLinkTo (name) {
      this.$router.push({name: name})
    },
    checkUpdate () {
      ipcRenderer.send('checkForUpdate')
    }
  }
}
</script>

<style lang="less">
@background-color:#F5EEED;
@title-color:#767776;
@border-color:#BEBFBE;
.m-sidebar-box{
  // background-color: @background-color;
  border-right: 1px solid @background-color;
  height: 100%-10%;
  .group-container{
    height: 65%+20%;
    overflow: auto;
  }
  .group-blank{
    height: 15%;
  }
  .s-title{
    color: @title-color;
    padding: 5px 10px;
  }
  .ul{
    list-style: none;
    padding: 0;
    margin: 0;
    .item{
      padding: 5px 0 5px 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      &.active{
        background-color: #CAC3C2;
        &::before{
          content: '\00A0';
          position: relative;
          background-color: red;
          // height: 23px;
          // width: 3px;
          // margin-top: -2px;
          left: -20px;
        }
      }
    }
  }
  .play-card{
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 75px;
    border-top: 1px solid @border-color;
    width: 200px;
    .album-image{
      width: 70px;
      height: 70px;
      margin-left: 5px;
    }
    .album-item{
      padding:0 5px;
      font-size: 14px;
      div:nth-child(2n+1){
        margin-bottom: 10px;
      }
    }
  }
}
</style>
