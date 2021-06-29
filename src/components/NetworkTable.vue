
<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <el-form label-position="left" inline class="demo-table-expand">


          <el-form-item label="请求头" style="width: 100%">
              <code>{{ props.row.requestHeaders }}</code>
              <el-tooltip class="item" effect="dark" content="复制请求头" placement="top">
                  <el-button type="primary" icon="el-icon-document-copy" size="mini"
                             @click="copyContent(props.row.requestHeaders)"></el-button>
              </el-tooltip>
          </el-form-item>

          <el-form-item label="请求内容" style="width: 100%">
              <pre><code>{{ props.row.requestBody }}</code></pre>
              <el-tooltip class="item" effect="dark" content="复制请求内容" placement="top">
                  <el-button type="primary" icon="el-icon-document-copy" size="mini"
                             @click="copyContent(props.row.requestBody)"></el-button>
              </el-tooltip>
          </el-form-item>
          <el-form-item label="请求用时" style="width: 40%">
              <code>{{ props.row.timeCost }}ms</code>
          </el-form-item>
          <el-form-item label="响应码" style="width: 40%">
              <code>{{ props.row.code }}</code>
          </el-form-item>
          <el-form-item label="响应头" style="width: 100%;">
              <code>{{ props.row.responseHeaders }}</code>
          </el-form-item>
          <el-form-item label="响应内容" style="width: 100%;">
              <pre><code>{{ props.row.responseBody }}</code></pre>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="请求方式"
      prop="method">
    </el-table-column>
    <el-table-column
      label="请求时间"
      prop="requestDataTime">
    </el-table-column>
    <el-table-column
      label="Url"
      prop="url">
    </el-table-column>
  </el-table>

</template>

<script>
  // import Common from '@/components/Common'

  export default {
    data() {
      return {
        // path:"ws://localhost:5555/Network",
        // path:"ws://192.168.33.170:5555/Network",
        // path:"ws://" + Common.ip + ":" + Common.port + "/Network",
        path:"ws://" +  window.location.hostname + ":" + window.location.port + "/websocket/Network",
        socket:"",
        tableData:[]
      }
    },
    mounted () {
        // 初始化
        this.init()
    },

    methods: {
        init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{                // 实例化socket
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
          let data = JSON.parse(msg.data)
          this.tableData.unshift(data)

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
        copyContent(content) {
            let jsonString =  JSON.stringify(content, null, 4)

            // 复制到粘贴板
            const aux = document.createElement("textarea");
            aux.value = jsonString
            document.body.appendChild(aux)
            aux.select()
            document.execCommand("copy")
            document.body.removeChild(aux)
        },

    },
    unmounted () {
        // 销毁监听
        this.socket.onclose = this.close
    }

  }
</script>

<style>

.el-form--inline .el-form-item__content {
    display: inline;
    line-height: 30px;
}

.el-form-item__label {
    font-size: 10px;
}

</style>
