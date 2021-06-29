
<template>
<el-row>
  <div class='alert'>请在手机端同意访问手机相册权限</div>
</el-row>

<el-row>
  <el-col :span="7" class='albumlist'>
    <!-- <h5>默认颜色</h5> -->
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose" @select="handleSelect">
      <el-menu-item v-for="(album,index) in albums" :index=index :key=album.name>
        <i class="el-icon-menu"></i>
        <template #title>{{album.name + '(' + album.images.length + ')'}}</template>

      </el-menu-item>
    </el-menu>
  </el-col>


  <el-col :span="16">

    <el-row :gutter="6" class="imagesView">
      <el-col justify='center' :span="24/5.0" v-for="(album,index) in currentPageList" :index=index :key=album.name>
        <el-image v-if="album.mediaType === 1" style="width: 200px; height: 200px" :src="'img/' + album.id" fit='cover' @click="imageClick($event)"></el-image>
        <video v-if="album.mediaType === 2" id="video" controls="controls" style="height: 200px; width: 200px">
            <source v-bind:src="'img/' + album.id + '.mp4'">
        </video>
        <!-- <source src="resources/normal video.mp4"> -->
<!-- mediaType -->
      </el-col>

    </el-row>

    <el-row :gutter="20" class="pageControl">
        <el-pagination
          ref='pageControl'
          layout="prev, pager, next"
          :total=this.albums[this.zqselectIndex].images.length
          :page-size=pageCount
          @current-change='pageControlClick'>
        </el-pagination>
    </el-row>

  </el-col>


</el-row>
</template>

<script>
  export default {
    computed: {

      currentPageList(){
        var allImages = this.albums[this.zqselectIndex].images
        var start = (this.currentPage - 1) * this.pageCount
        var end = this.currentPage * this.pageCount
        var pageList = allImages.slice(start,end)
        return pageList
      }
    },
    data() {
      return {
        currentPage : 1,//当前页码
        pageCount : 20,//每页多少个
        albums:[{
          name:"",
          index:0,
          images:[]
        }],
        zqselectIndex : 0
      }
    },
    methods: {

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      init: function () {

        this.axios.get("/api/albums").then((resp) => {
            console.log(resp)

            if (resp.data.success) {
                var newArray = []
                newArray = newArray.concat(resp.data.result)
                // newArray = newArray.concat(resp.data.result)
                // newArray = newArray.concat(resp.data.result)
                // newArray = newArray.concat(resp.data.result)
                // newArray = newArray.concat(resp.data.result)
                // newArray = newArray.concat(resp.data.result)
                this.albums = newArray
            }
        })
      },
      handleSelect(value) {
        console.log('czq' + value)
        this.zqselectIndex = value
      },
      pageControlClick(value) {
        console.log('pageControlClick:' + value)
        this.currentPage = value
      },
      imageClick(event) {
        console.log('imageClick1:' + event.target.src)
        var src = event.target.src
        // var src = "http://192.168.33.136:8082/media/2021%E5%B9%B46%E6%9C%8817%E6%97%A5%20%E4%B8%8B%E5%8D%882:32:31%20%E6%88%AA%E5%B1%8F.png"
        // var src = "http://192.168.33.170:5555/img/F90BB0B2-07CA-4CFE-9C54-1EC34D1F947B%2FL0%2F001.PNG"
        // return
        var a = document.createElement('a')
        a.href = src
        // a.download = src
        a.target = src
        a.click()
        a.remove()
      }
    },

    mounted () {
        // 初始化
        this.init()
    },



  }


</script>

<style>

.alert{
  padding-left: 18px;
    margin-left: 8px;
    background-color: #fef0f0;
    color: #f56c6c;
    width: calc(100vw)
}

.albumlist{
  /* max-width: 30%; */
  height: calc(100vh - 100px - 100px);
  overflow: auto;
}


.imagesView{
  height: calc(100vh - 100px - 100px - 35px);
  overflow: auto;

}

.pageControl{
  height: 35px;
  /* overflow: auto; */
}
/* .el-col el-col-6 is-guttered{
  height: 50px;
  width: 50px;
} */
</style>
