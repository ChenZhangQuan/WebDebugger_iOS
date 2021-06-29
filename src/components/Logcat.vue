
<template>
  <div>
  <ul ref="testref" class="demo">
    <li v-for="item in items" :key="item.message">
      {{ item.message }}
    </li>
  </ul>
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
        path:"ws://" +  window.location.hostname + ":" + window.location.port + "/websocket/Logcat",
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
            this.items.push({message:msg.data})

            var container = this.$refs.testref
            container.scrollTop = container.scrollHeight;


            // this.$nextTick(() => {
            //    var container = this.$root;
            //    container.scrollTop = container.scrollHeight;
            // })
            // console.log(container)
            // this.scrollBottom();

            // example1.items.push({ message: 'Baz' })
        },
        send: function () {
            // this.socket.send(params)
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

  li {
    overflow-wrap:break-word;
  }

</style>
