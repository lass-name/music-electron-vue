<template>
  <div class="music-item-container">
    <div class="music-title"><span>热门精选</span></div>
    <div class="music-items-box flex">
      <div class="m-list-item" v-for="(item,index) in items" :key="index" @click="handleList(item.id)">
        <i class="iconfont icon-erji play-count"><span class="play-text">{{+item.playCount/100000>1?`${~~(+item.playCount*10/100000)}万`:~~item.playCount}}</span></i>
        <img :src="item.picUrl" alt="" class="cover-img">
        <div class="l-item-text">{{item.name}}</div>
      </div>
      <!-- <div class="m-list-item">
        <img src="../assets/logo.png" alt="" class="cover-img">
        <div class="l-item-text">夏天快要来临，牵你手去买冰淇淋</div>
      </div>
      <div class="m-list-item">
        <img src="../assets/logo.png" alt="" class="cover-img">
        <div class="l-item-text">夏天快要来临，牵你手去买冰淇淋</div>
      </div>
      <div class="m-list-item">
        <img src="../assets/logo.png" alt="" class="cover-img">
        <div class="l-item-text">夏天快要来临，牵你手去买冰淇淋</div>
      </div>
      <div class="m-list-item">
        <img src="../assets/logo.png" alt="" class="cover-img">
        <div class="l-item-text">夏天快要来临，牵你手去买冰淇淋</div>
      </div>
      <div class="m-list-item">
        <img src="../assets/logo.png" alt="" class="cover-img">
        <div class="l-item-text">夏天快要来临，牵你手去买冰淇淋</div>
      </div>
      <div class="m-list-item">
        <img src="../assets/logo.png" alt="" class="cover-img">
        <div class="l-item-text">夏天快要来临，牵你手去买冰淇淋</div>
      </div>
      <div class="m-list-item">
        <img src="../assets/logo.png" alt="" class="cover-img">
        <div class="l-item-text">夏天快要来临，牵你手去买冰淇淋</div>
      </div> -->
    </div>
    <!-- <div class="music-bottom"></div> -->
  </div>
</template>

<script>
import {common} from '@/api/service'
export default {
  name: 'music-item',
  data () {
    return {
      items: []
    }
  },
  created () {
    this.getRecommand()
  },
  methods: {
    getRecommand () {
      let obj = common('/personalized')
      this.$store.dispatch('add', obj).then(({data}) => {
        console.log(data)
        this.items = data.result// .filter((c, index) => index < 8)
      })
    },
    handleList (id) {
      this.$router.push({name: 'playlist', params: {id: id}})
    }
  }
}
</script>

<style lang="less" scoped>
@border-color:#E1E1E1;
.music-item-container{
  .music-title{
    font-size: 18px;
    border-bottom:1px solid @border-color;
    font-weight: bold;
    span{
      padding: 5px;
      display: inherit;
      position: relative;
      &::before{
        content: '';
        position: absolute;
        width: 80px;
        height: 4px;
        background-color: @border-color;
        margin-top:21px+0px;
        margin-left: -3px;
      }
    }
  }
  .music-items-box{
    // justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;
    text-align: center;
    .m-list-item{
      width: 24%;
      margin: 10px 0;
      position: relative;
    }
    .play-count{
      position: relative;
      display: inline-block;
      color: #FFFFFF;
      right: 10px;//-60px+5px+5px;
      top: 0px;
      font-size: 15px;
      position: absolute;
    }
    .play-text{
      font-size: 12px;
      font-weight: bold;
      padding-right: 10px;
    }
    .cover-img{
      width: 85%;
    }
    .l-item-text{
      padding:0 10%;
      text-align: left;
    }
  }
  .music-bottom{
    height: 100px;
  }
}
</style>
