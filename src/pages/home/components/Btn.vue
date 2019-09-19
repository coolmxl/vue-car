<template>
    <div class="btn" >
        <router-link v-show='btn' to="login"><el-button  class="btn-btn" type="primary">登录</el-button></router-link>
        <router-link  v-show='btn' to="reginster"><el-button  class="btn-btn" style="margin-left: 1%;" type="success">注册</el-button></router-link>
        <div class="btn-box" v-show="!btn">
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
            location.reload();
        }
    },
    mounted() {
        this.acount = localStorage.car_user_na
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
