<template>
    <div>
        <Btn/>
        <div style="margin-top:5%;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账户">
                    <el-input style="width: 93%;" v-model="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="车牌">
                    <el-input style="width: 93%;" v-model="form.carid" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input style="width: 93%;" v-model="form.phone" disabled></el-input>
                </el-form-item>
            </el-form>
            <div class="btn">
                <div class="upload-head">
                    <!-- <input style="width:70%" type="file" name="file" @change="getFile($event)"> -->
                    <el-upload
                        class="upload-demo"
                        action="/api/rest/2.0/ocr/v1/license_plate?access_token=24.702852826d482c327fa91f0d0ec7925a.2592000.1573199629.282335-16643891"
                        :before-remove="beforeRemove"
                        :on-change="getBase64"
                        multiple
                        :limit="1"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <el-button style="width: 20%; margin-right: 10%;" type="primary" @click="submit">上传头像</el-button>
                </div>
                <el-button  class="btn-btn" type="primary"  @click="openDia(1)"  >修改车牌</el-button>
                <el-button  class="btn-btn" style="margin-left: 1%;" type="success"  @click="openDia(2)">修改手机号</el-button>
            </div>
        </div>
        <el-dialog
        title="修改手机号"
        :visible.sync="dialogVisible"
        width="100%"
        >
            <el-form :model="form">
                <el-form-item label="新的电话号码" >
                    <el-input v-model="phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" >
                    <el-input v-model="code" autocomplete="off"></el-input>
                </el-form-item>
                <input  class="getNumber" v-model="codeMsg" type="button"  @click="sendPhone" :disabled="codeDisabled" />

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getCode">确 定</el-button>
            </span>
        </el-dialog>
                <el-dialog
        title="修改车牌（第一个车牌为默认车牌）"
        :visible.sync="dialogVisible1"
        width="100%"
        >
            <el-form >
                <li v-for="(item,index) in arr" :key=item.index>
                    <el-form-item :label="index+1+'车牌'" >
                        <el-input v-model="arr[index]" autocomplete="off"></el-input>
                    </el-form-item>
                </li>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="submitModify">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Btn from '../home/components/Btn'
import axios from 'axios'
export default {
    components:{
        Btn
    },
    mounted() {
        if(localStorage.token2){
            this.state = "会员"
        }
        // let count = 10000
        if(localStorage.car_user_name){
            this.acount = localStorage.car_user_name
        }
        this.getUserInfo()
        this.getHead_p()
    },
    data() {
        return {
            form:{
                name:'',
                carid:'',
                phone:''
            },
            dialogVisible: false,
            dialogVisible1: false,
            phone:'',
            arr:[],
            code:'',
            recode:'~!@#$$%^FCWAED%%*YGGF%',
            codeMsg:'获取验证码',
            codeDisabled:false,
            countdown: 60,
            timer: null,
            btn:Boolean,
            // 头像
            file:'',
            fileList:[],
        }
    },
    methods: {
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        getFile(event) {
            this.file = event.target.files[0];
        },
        getBase64(file,fileList){
             this.file = file.raw;
        },
        submit() {
            // console.log(this.file);
            if(!this.file){
                confirm("请选择文件");
                return false;
            }
            var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            formData.append('file', this.file)
            formData.append('u_id', localStorage.car_user_id)
            // console.log(formData.get("file"));
            axios.post('http://47.94.38.46:80/home/index/headSave', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                if (res.status == 200) {
                    // this.data = res.data
                    // this.$store.state.data.push(res.data)
                    console.log(res)
                }
            }).catch((error) => {
                    console.log(error)
            })
        },
        async getHead_p(){
            let data = await axios.get("http://47.94.38.46:80/home/index/gethead");
            // localStorage.path = "http://47.94.38.46:80/static/img/"+this.$store.state.data[0][0].path
            // this.$store.state.data.push(data.data);
            let pathArr = data.data.filter( x => x.u_id == localStorage.car_user_id)
            localStorage.path =  "http://47.94.38.46:80/static/img/" + pathArr[0].path
            // console.log(pathArr);
            // console.log(data.data);
        },
        openDia(id){
             if(!localStorage.car_user_name){
                 alert("请先登录或注册")
                 return false
            }
            if(id == 1){
                this.dialogVisible1 = true
            }
            else if(id == 2){
                this.dialogVisible = true

            }
        },
        submitModify() {
            this.dialogVisible1 = false
            let key = this.arr.join('')
            var formData = new window.FormData() 
			formData.append('id',localStorage.car_user_id)
            formData.append('key',key)
            axios.post("http://47.94.38.46:80/home/index/modifyUserInfo",formData,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res)=>{
                alert("修改成功")
            }).catch((err)=>{   
				console.log(err)
				// alert("注册失败！")
            })
        },
        getUserInfo() {
            var formData = new window.FormData() 
            // console.log(localStorage)
			formData.append('id',localStorage.car_user_id)
			axios.post("http://47.94.38.46:80/home/home/getUserInfo",formData,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res)=>{
                this.form.name = res.data.name
                this.form.carid = res.data.carid.substr(0,7)
                this.form.phone = res.data.phone
                for(let i = 0; i<res.data.carid.length/7;i ++){
                    this.arr[i] = res.data.carid.substr(i*7,7)
                }
            }).catch((err)=>{
				console.log(err)
				// alert("注册失败！")
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
                    if(res){
                        this.recode = res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        getCode() {
            if(this.code == this.recode){
                let formData = new window.FormData() 
                formData.append('phone',this.phone)
			    formData.append('id',localStorage.car_user_id)
                
                    // axios.post("http://47.94.38.46:80/home/home/sendsms",formData,{
                axios.post("http://47.94.38.46:80/home/home/changePhone",formData,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then((res)=>{
                    if(res){
                        // console.log("修改成功！")
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

<style lang="stylus">
    li{
    list-style: none;
    }
    .btn
        padding-top: 5%;
        padding-left: 2%;
        .btn-btn
            width: 48%;
            height: 38px;
            line-height: 12px;
    .getNumber{
      width: 35%;
      height: 36px;
      float: right;
      margin-top: 3px;
      border: 1px solid #09BB07;
      color: #09BB07;
      background: #fff;
      border-radius: 4px;
      outline: none;
      -webkit-appearance:none;
    }

    .upload-head
        display  flex
        justify-content space-between
        align-items center
        margin-left 5%
</style>