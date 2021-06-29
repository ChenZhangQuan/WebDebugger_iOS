<template>
    <div>
        <div v-for="(item, i1) in deviceInfoGroups" v-bind:key="i1">
            <div style="border:1px solid #dfe6e9"></div>
            <h2>{{item.groupName}}</h2>
            <p v-for="(info, i2) in item.infos" v-bind:key="i2">{{info.name}}：{{info.value}}</p>
        </div>
        <footer style="height: 50px"></footer>
    </div>
</template>

<script>
    export default {
        name: "DeviceInfoView",
        data() {
            return {
              deviceInfoGroups:[{
                groupName:"groupname",
                infos:[{
                  name:"info",
                  value:"value"
                },
                {
                  name:"info",
                  value:"value"
                }]
              }]
            }
        },
        mounted () {
        // updated () {
            // 初始化
            this.init()
        },
        methods: {
            init: function () {
              this.axios.get("/api/deviceinfo").then((resp) => {
                  console.log(resp)

                  if (resp.data.success) {

                      this.deviceInfoGroups = resp.data.result.deviceInfoGroups
                  }
              })
            }

        }
    }
</script>

<style scoped>
    p {
        display: inline-block;
        font-size: 17px;
        width: 33%;
    }
    h2 {
        margin-top: 50px;
    }
</style>
