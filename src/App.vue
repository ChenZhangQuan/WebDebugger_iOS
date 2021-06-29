<template>
  <el-container>
    <el-header>
      <el-menu :default-active="1" mode="horizontal" @select="handleSelect">
        <!-- <el-menu-item index="0">测试</el-menu-item> -->
        <el-menu-item index="1">设备信息</el-menu-item>
        <el-menu-item index="2">网络信息</el-menu-item>
        <el-menu-item index="3">相册</el-menu-item>
        <el-menu-item index="4">Logcat</el-menu-item>
      </el-menu>
    </el-header>

    <el-main style="padding: 0px">
      <!-- <div v-if="zqselectIndex === '0'"><SocketTest/></div> -->
      <!-- <div v-show="zqselectIndex === '1'"><DeviceInfoView/></div>
      <div v-show="zqselectIndex === '2'"><NetworkTable/></div>
      <div v-show="zqselectIndex === '3'"><Album/></div>
      <div v-show="zqselectIndex === '4'"><Logcat/></div> -->
      <keep-alive>
          <component :is="currenPage"></component>
      </keep-alive>
    </el-main>

  </el-container>


</template>



<script>

  // import SocketTest from './components/SocketTest.vue'
  import DeviceInfoView from './components/DeviceInfoView.vue'
  import NetworkTable from './components/NetworkTable.vue'
  import Album from './components/Album.vue'
  import Logcat from './components/Logcat.vue'

  export default {
    name: 'App',
    data() {
      return {
        zqselectIndex : "1"
      }
    },
    computed:{
      currenPage(){
        if(this.zqselectIndex == '1'){
          return 'DeviceInfoView'
        }else if (this.zqselectIndex == '2') {
          return 'NetworkTable'
        }else if (this.zqselectIndex == '3') {
          return 'Album'
        }else if (this.zqselectIndex == '4') {
          return 'Logcat'
        }
        return 'DeviceInfoView'
      }
    },
    components: {
      // SocketTest,
      DeviceInfoView,
      NetworkTable,
      Album,
      Logcat
    },
    methods: {
      handleSelect(key) {
        this.zqselectIndex = key
      }
    },


  }
</script>




<style>

</style>
