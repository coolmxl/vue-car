<template>
    <div>
        <el-input v-model="data.name" placeholder="请输入内容"></el-input>
        <el-input placeholder="请输入密码" v-model="data.pwd" show-password></el-input>
        <el-button @click="Login">登录</el-button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    components:{
    },
    data() {
        return {
            data:{
                name:'',
                pwd:''
            }
           
        }
    },
    inject:['reload'],
    mounted() {
        // console.log(localStorage)
    },
    methods: {
        Login(){
            let msg = JSON.stringify(this.data);
            console.log(msg);
            let postData = this.$qs.stringify({
                data:msg,
            })
            console.log(postData)
            let app = this
            axios.post('http://47.94.38.46:80/home/home/carusercheck',postData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                console.log(res)
                if(res.data ==2){
                    alert("账号或密码错误")
                }
                else if(typeof(res.data)!=="number"){
                    // console.log(res.data)
                    localStorage.car_user_name = app.data.name
                    localStorage.car_user_id = res.data[1]
                    localStorage.token2 = res.data[0]
                    this.$router.push('/home');
                    location.reload()
                }
            }).catch((error) => {
                console.log(error)
                alert("账号或密码错误")
            })
        },
    },
}
</script>

<style>

</style>
