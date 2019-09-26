<template>
  <div class="play-list-container">
    <div class="list-header-box flex">
      <div class="img-box"><img :src="item.coverImgUrl" alt="" class="cover-img"></div>
      <div class="section-right">
        <div class="title-row flex">
          <div>
            <el-tag size="mini" color="#AA3319">歌单</el-tag>
          </div>
          <div class="grow-1 l-title">
            {{item.name}}
          </div>
          <div>歌曲数{{item.trackCount}}/收听数{{+item.playCount/100000>1?`${~~(item.playCount/10000)}万`:item.playCount}}</div>
        </div>
        <div class="auth flex">
          <span><img :src="item.creator && item.creator.avatarUrl" alt="" class="creator-icon"></span>
          <span>{{item.creator && item.creator.nickname}}</span>
          <span>{{item.createTime | m('YYYY-MM-DD')}}创建</span>
        </div>
        <div class="m-buttons">
          <el-button size="mini"><i class="iconfont icon-play1"></i>播放全部</el-button>
          <el-button size="mini"><i class="iconfont icon-shoucang"></i>收藏({{item.subscribedCount}})</el-button>
          <el-button size="mini"><i class="iconfont icon-share1"></i>分享({{item.shareCount}})</el-button>
          <el-button size="mini"><i class="iconfont icon-41download"></i>下载全部</el-button>
        </div>
        <div class="flex l-tags-box">
          <span class="l-tags">标签：</span>
          <div class="tags-box">
            <el-button type="text" v-for="(m,index) in item.tags" :key="index" size="mini">{{m}} <i v-if="index<item.tags.length-1">/</i></el-button>
          </div>
          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(m,index) in item.tags" :key="index"><a href="/">{{m}}</a></el-breadcrumb-item>{{item.description.replace(/\n/g,'dd')}}
          </el-breadcrumb> -->
        </div>
        <div>
          <span class="l-tags">简介：</span>
          <div>
          <!-- <div class="summary packup" :data-content="item.description.replace(/\n/g,'<br>')"> -->
          <span class="l-desc" :class="{'desc-expand':isDown}" v-html="item.description && item.description.replace(/\n/g,'<br>')"></span>
          <span class="arrow-box" @click="triggerDesc"><i class="el-icon-arrow-down" :class="{'el-icon-arrow-up':isDown}"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div class="music-list-tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first">
          <el-table :data="item.tracks" style="width: 100%" @row-dblclick="dbclickEvent" :row-class-name="selectedRow">
            <el-table-column label="" width="60" :formatter="playFormate">
              <template slot-scope="scope">
                <i class="iconfont icon-volume-" v-show="playing.id===scope.row.id"></i>
                <span v-show="playing.id!==scope.row.id">{{indexMethod(scope.$index)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="操作" width="80">
              <template slot-scope="scope">
                <i class="iconfont icon-like"></i>
                <i class="iconfont icon-xiazai"></i>
              </template>
            </el-table-column>
            <el-table-column label="音乐标题" min-width="80">
              <template slot-scope="scope">
                {{scope.row.name}}
                <i class="iconfont icon-sq"></i>
                <i class="iconfont icon-mv" v-show="scope.row.mvid"></i>
                <i class="iconfont icon-arrow-sharp-r"></i>
              </template>
            </el-table-column>
            <el-table-column label="歌手" width="120">
              <template slot-scope="scope">
                <!-- <span class="album-name">{{scope.row.album.artists[0].name}}</span> -->
                <span class="album-name">{{scope.row.ar[0].name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="专辑" width="100">
              <template slot-scope="scope">
                <!-- <span class="album-name">{{scope.row.album.name}}</span> -->
                <span class="album-name">{{scope.row.al.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="时长" width="80">
              <template slot-scope="scope">
                {{scope.row.dt | duration}}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`评论(${item.commentCount || 0})`" name="second">评论(126)</el-tab-pane>
        <el-tab-pane label="收藏者" name="third">收藏者</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {common} from '@/api/service'
import {mapGetters} from 'vuex'
export default {
  name: 'play-list',
  data () {
    return {
      item: {},
      activeName: 'first',
      isDown: false // 判断是否展开
    }
  },
  created () {
    let {id} = this.$route.params
    this.getPlayListById(id)
  },
  computed: {
    ...mapGetters({
      playing: 'current_play_muisc'
    })
  },
  methods: {
    getPlayListById (id) {
      let obj = common(`/playlist/detail?id=${id}`)
      this.$store.dispatch('getAlbumMuisc', obj).then(({data}) => {
        console.log(data)
        this.item = data.playlist
      })
    },
    indexMethod (index) {
      return String.prototype.padStart.apply(index + 1, [2, '0'])
    },
    playFormate (e, column, cell, index) {
      /* if (this.playing.id === e.id) {
        // return `<i class='iconfont icon-volume'></i>`
      } else {
        return String.prototype.padStart.apply(index + 1, [2, '0'])
      } */
    },
    selectedRow ({row, rowIndex}) {
      // console.log(row, rowIndex)
      return row.id === this.playing.id ? 'row-active' : ''
    },
    dbclickEvent (e) {
      console.log(e)
      this.$store.dispatch('setCurrentPlayMuisc', e)
      this.getMusic(e.id)
    },
    getMusic (id) {
      // let obj = common(`/music/url?id=${id}`)
      let obj = common(`/song/url?id=${id}`)
      this.$store.dispatch('setCurrentPlayMusicUrl', obj).then(({data}) => {
        console.log(data)
        // this.audioUrl = data.data[0].url
      })
    },
    triggerDesc () {
      this.isDown = !this.isDown
    }
  }
}
</script>

<style lang="less" scoped>
.play-list-container{
  .list-header-box{
    justify-content: flex-start;
    .img-box{
      width: 20%;
    }
    .cover-img{
      width: 100%;
    }
    .section-right{
      margin-left: 10px;
      width: 100%;
      .el-tag{
        color: #FFFFFF;
      }
      .l-title{
        font-size: 25px;
      }
    }
  }
  .auth{
    align-items: center;
    .creator-icon{
      width: 30px;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
  .m-buttons{
    margin: 20px 0 10px;
    .el-button--mini{
      padding: 7px 10px;
    }
    .iconfont{
      font-size: 15px;
      margin-right: 3px;
    }
  }
  .l-tags-box{
    align-items: center;
  }
  .el-button--text{
    padding: 0;
  }
  .l-tags{
    font-size: 13px;
    font-weight: 600;
  }
  .l-desc{
    font-size: 12px;
    height: 60px;
    overflow: hidden;
    display: inherit;
  }
  .desc-expand{
    height: auto;
  }
  .arrow-box{
    float: right;
  }
  .el-button+.el-button{
    margin-left: 0;
  }
  .el-breadcrumb{
    font-size: 13px;
    line-height: inherit;
  }
  .album-name{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .row-active{
    background-color: #E1E0E2;
  }

  .summary{
    position: relative;
    overflow: hidden;
    margin-bottom: 5px;
    line-height: 22px;
    word-break: break-all;
    // text-indent: 10px;
  }
  .packup span{
    height: 90px;
  }
  .packup::before{
    display: block;
    content: attr(data-content);
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    height: 66px;
    width: 100%;
    overflow: hidden;
    color: #000;
    background-color: #FFFFFF;
    // text-indent: 10px;
  }
  .packup::after{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-line-clamp:4;
    content:attr(data-content);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // text-indent: 10px;
    padding-right: 10px;
    color: #000;
    background-color: #FFFFFF;
  }
}
</style>
