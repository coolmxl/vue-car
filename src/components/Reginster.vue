<template>
    <div>
        <el-input v-model="uid" placeholder="请输入账号"></el-input>
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <el-input placeholder="请确认密码" v-model="repwd" show-password></el-input>
        <el-input placeholder="请输入手机号码" v-model="phone"></el-input>
        <el-input placeholder="请填写车牌1（至少写一个最多可写四个）" v-model="carid1" ></el-input>
        <el-input placeholder="请填写车牌2" v-model="carid2" ></el-input>
        <el-input placeholder="请填写车牌3" v-model="carid3" ></el-input>
        <el-input placeholder="请填写车牌4" v-model="carid4" ></el-input>
        <p v-text="data"></p>
        <el-button round @click="reginster">注册</el-button>
        <el-button round @click="sub">注册</el-button>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            uid:'',
            pwd:'',
            repwd:'',
            phone:'',
            data:'',
            carid1:"",
            carid2:"",
            carid3:"",
            carid4:""

        }
    },
    components:{
    },
    mounted() {
    },  
    methods: {
        sub() {
        let carid = this.carid1+this.carid2+this.carid3+this.carid4
        console.log(carid)
        },
        reginster(){
            if(this.pwd != this.repwd){
                this.data = "两次密码不一致"
                return false
            }
            let msg = {
                name:this.uid,
                pwd:this.pwd,
                phone:this.phone,
                carid: this.carid1+this.carid2+this.carid3+this.carid4
            }
            let data = JSON.stringify(msg);
            let postData = this.$qs.stringify({
                data:msg
            })
            console.log(data)
            axios.post("http://47.94.38.46:80/home/home/userCarSave",postData,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res)=>{
                    console.log(res)
                    // alert("注册成功！")
                    //  this.$router.push('/login');
            }).catch((err)=>{
                console.log(err)
            })
        },
    }

}
</script>

<style>

</style>
