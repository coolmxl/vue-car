<template>
    <div class="btn" >
        <router-link v-show='btn' to="login"><el-button  class="btn-btn" type="primary">登录</el-button></router-link>
        <router-link  v-show='btn' to="reginster"><el-button  class="btn-btn" style="margin-left: 1%;" type="success">注册</el-button></router-link>
        <div class="btn-box" v-show="!btn">
            <img   :src="path" style="width:50px" alt="">
            <h3 >会员,欢迎您</h3>
            <el-button  class="btn-btn" type="danger" @click="Remove">退出登录</el-button> 
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            btn:true,
            path:'',
            acount:''
        }
    },
    methods:{
        hasLocal() {
            if(localStorage.token2){
                this.btn = !this.btn
            }
        },
        Remove(){
            console.log(123)
            this.btn = true
            localStorage.removeItem('token2')
            localStorage.removeItem('car_user_name');
            localStorage.removeItem('car_user_id');
            localStorage.removeItem('path');
            location.reload();
        }
    },
    mounted() {
        this.acount = localStorage.car_user_na;
        // console.log(this.$store.state.data)
        this.path = localStorage.path
        // :src="'http://127.0.0.1:8000/static/img/'+this.$store.state.data[0].path"
    },
    created() {
        this.hasLocal()
        // console.log(localStorage)
    },
}
</script>

<style lang="stylus">
    .btn
        padding-top: 5%;
        padding-left: 2%;
        .btn-btn
            width: 48%;
            height: 38px;
            line-height: 12px;
        .btn-box
            display flex
            justify-content space-around
</style>
