
<template>
  <div>
    <el-button @click="send">默认按钮</el-button>
  </div>


</template>

<script>
  // import Common from '@/components/Common'
  export default {

    // name:"Logc at",
    data() {
      return {
        items: [],
        // path:"ws://localhost:5555/Logcat",
        // path:"ws://" + Common.ip + ":" + Common.port + "/Logcat",
        path:"ws://192.168.33.170:8080/websocket/Logcat",
        socket:""
      }
    },
    created() {
      console.log("did createds")
    },

    mounted () {
        // 初始化
        this.init()
    },

    methods: {
        init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        },
        open: function () {
            console.log("socket连接成功")
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
            console.log(msg.data)
        },
        send: function () {
            this.socket.send("my data")
            console.log("did click send")

        },
        close: function () {
            console.log("socket已经关闭")
        },

        // scrollToBottom: function () {
        //   this.$nextTick(() => {
        //       var container = this.$el.querySelector("demo");
        //       console.log(container)
        //       container.scrollTop = container.scrollHeight;
        //   })
        // }
    },
    unmounted () {
        // 销毁监听
        this.socket.onclose = this.close
    }


  }
</script>

<style scoped>

  ul {
    height: calc(100vh - 100px - 100px);
    overflow: auto;
  }

</style>
