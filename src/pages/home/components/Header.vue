<template>
<div>
     <h3 style="padding-left: 6%;" v-show="btn">欢迎您，临时用户</h3>
        <h3 style="padding-left: 6%;"  v-show="!btn">账户:{{this.acount}}</h3>
    <div class="h-header">
        <router-link to="/home"><i class="fa fa-home fa-2x"></i></router-link>
        <router-link to="/list"><i class="fa fa-retweet fa-2x"></i></router-link>
        <router-link to="/set"><i style="font-size:30px" class="el-icon-s-tools"></i></router-link>
        <router-link to="/comment"><i style="font-size:30px" class="el-icon-chat-round"></i></router-link>
    </div>
</div>

</template>

<script>
export default {
    data() {
        return {
            btn:true,
            acount:''
        }
    },
    methods: {
        hasLocal() {
            if(localStorage.token2){
                this.btn = false
            }
            else if(!localStorage.token2){
                this.btn = true
            }
        },
    },
    mounted() {
        this.acount = localStorage.car_user_name
        this.hasLocal()
    },
}
</script>

<style lang="stylus"> 
    *{
        margin 0
        padding 0
    }
    .h-header
        padding-top 2%
        display flex
        justify-content space-around
        align-items center
        .router-link-exact-active
            color red
</style>
