<template>
    <div>
        <el-input v-model="data.name" placeholder="请输入内容"></el-input>
        <el-input placeholder="请输入密码" v-model="data.pwd" show-password></el-input>
        <el-button @click="Login">登录</el-button>
        <!-- <el-button  class="btn-btn" style="margin-left: 1%;" type="success"  @click="openDia(2)">修改手机号</el-button> -->
        <el-button @click="openDia()">忘记密码</el-button>
        <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="85%"
        style="margin-right:11%"
        >
            <el-form :model="form">
                <el-form-item label="账号" >
                    <el-input v-model="name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" >
                    <el-input v-model="phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" >
                    <el-input v-model="code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" >
                    <el-input v-model="pwd" autocomplete="off"></el-input>
                </el-form-item>
                <input  class="getNumber" v-model="codeMsg" type="button"  @click="sendPhone" :disabled="codeDisabled" />
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getCode">确 定</el-button>
            </span>
        </el-dialog>
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
            },
            dialogVisible:false,
            form:{
            },
            pwd:'',
            phone:"",
            code:'',
            name:'',
            recode:'~!@#$$%^FCWAED%%*YGGF%',
            codeMsg:'获取验证码',
            codeDisabled:false,
            countdown: 60,
            timer: null,
            btn:Boolean,
           
        }
    },
    inject:['reload'],
    mounted() {
        // console.log(localStorage)
    },
    methods: {
         openDia(id){
            this.dialogVisible = true
        },
        Login(){
            let msg = JSON.stringify(this.data);
            // console.log(msg);
            let postData = this.$qs.stringify({
                data:msg,
            })
            // console.log(postData)
            let app = this
            axios.post('http://47.94.38.46:80/home/home/carusercheck',postData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                // console.log(res)
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
        sendPhone() {
            var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
            if(this.phone==''){
                alert("请输入手机号码");
                return false
            }else if(!reg.test(this.phone)){
                alert("手机格式不正确");
                return false
            }
            else{
                // 验证码60秒倒计时
                this.codeDisabled = true
                if (!this.timer) {
                    this.timer = setInterval(() => {
                        if (this.countdown > 0 && this.countdown <= 60) {
                        this.countdown--;
                            if (this.countdown !== 0) {
                                this.codeMsg = "重新发送(" + this.countdown + ")";
                            } else {
                                clearInterval(this.timer);
                                this.codeMsg = "获取验证码";
                                this.countdown = 60;
                                this.timer = null;
                                this.codeDisabled = false;
                            }
                        }
                    }, 1000)
                }
                let formData = new window.FormData() 
                formData.append('phone',this.phone)
                axios.post("http://47.94.38.46:80/home/home/sendsms",formData,{
                // axios.post("http://47.94.38.46:80/home/home/sendsms",formData,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then((res)=>{
                    if(res.data === 0){
                        confirm("该号码不存在，请重新输入或注册新号~")
                    }
                    else{
                        this.recode = res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        getCode() {
            if(this.code == this.recode){
                console.log("ok")
                console.log(this.pwd);
                
                let formData = new window.FormData() 
                formData.append('name',this.data.name)
                formData.append('pwd',this.pwd)
                formData.append('phone',this.phone)
                    // axios.post("http://47.94.38.46:80/home/home/sendsms",formData,{
                axios.post("http://47.94.38.46:80/home/index/changepwd",formData,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then((res)=>{
                    if(res){
                        // console.log("修改成功！")
                        // console.log(res);
                        alert("修改成功！")
                        location.reload()
                    }
                }).catch((err)=>{
                    console.log(err)
                })    
            }
            else{
                alert("验证码不正确，或为空。请重新输入")
            }
        }
    },
}
</script>

<style>

</style>
