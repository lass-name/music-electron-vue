<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <el-container>
      <el-header>
        <n-header></n-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <n-sidebar></n-sidebar>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer height="10%">
        <n-footer></n-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import nHeader from './components/Header'
import nSidebar from './components/Sidebar'
import nFooter from './components/Footer'
export default {
  name: 'App',
  components: {
    nHeader,
    nSidebar,
    nFooter
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  position: absolute;
  display: -webkit-box;
  font-size:14px;
  .el-header{
    padding: 0;
  }
  .el-footer{
    padding: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 75px;
  }
  .el-main{
    margin-bottom: 80px;
  }
  .el-container{
    background-color: #FFFFFF;
  }
}
</style>
