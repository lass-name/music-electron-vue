<template>
  <div class="m-header-box flex" id="header">
    <div class="h-name"><i class="iconfont icon-CN_NetEasemusic"></i>网易云音乐</div>
    <div class="h-content flex grow-1">
      <div class="buttons">
        <el-button size="mini"><i class="el-icon-arrow-left"></i></el-button>
        <el-button size="mini"><i class="el-icon-arrow-right"></i></el-button>
      </div>
      <div class="h-search-box grow-1">
        <el-input type="search" @dblclick.stop="noneMethod" prefix-icon="el-icon-search" placeholder="搜索音乐、歌手、歌词、用户" size="mini"></el-input>
      </div>
      <div class="h-setting-box">
        <!-- <el-button><i class="el-icon-message"></i></el-button> -->
        <i class="el-icon-message"></i>
        <i class="el-icon-setting"></i>
      </div>
    </div>
    <div class="h-userinfo">
      <div class="mini-button">-</div>
      <div class="user-info">
        <el-dropdown trigger="click" class="">
          <span class="el-dropdown-link flex">
            <span class="user-icon">
              <img src="../assets/logo.png" alt="">
            </span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              评论
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              回复
              <el-badge class="mark" :value="3" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
export default {
  name: 'Header',
  mounted () {
    document.getElementById('header').addEventListener('dblclick', function () {
      ipcRenderer.send('window-max')
    })
  },
  methods: {
    noneMethod () {}
  }
}
</script>

<style lang="less">
@background-color:#B92500;
@border-color:#9C1600;
.flex{
  display: flex;
}
.grow-1{
  flex-grow: 1;
}
.grow-2{
  flex-grow: 2;
}
.m-header-box{
  background-color: @background-color;
  -webkit-app-region:drag;
  width: 100%;
  height: 100%;
  color: #FFFFFF;
  .h-name{
    padding: 25px;
    font-size: 25px;
    .iconfont{
      font-size:25px;
    }
  }
  .h-search-box{
    -webkit-app-region:no-drag;
  }
  .h-content{
    flex-grow: 1;
    align-items: center;
    justify-content: space-around;
    padding: 36px;
    .el-input--mini{
      width: 50%;
    }
    .el-input--mini .el-input__inner{
      border-radius: 20px;
    }
    .el-button--mini{
      padding: 4px;
      background-color: @background-color;
      color: #FFFFFF;
      border: 1px solid @border-color;
    }
    .el-button:first-child{
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .el-button+.el-button{
      margin: 0 5px 0 -4px;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .h-userinfo{
    width: 70px;
    border-left: 1px solid @border-color;
    padding: 0 10px;
    text-align: right;
    .user-icon{
      width: 30px;
      height: 30px;
      overflow: hidden;
      border-radius: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .el-dropdown-link{
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
