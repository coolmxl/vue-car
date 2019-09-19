<template>
    <div>
        <input class="upload" type="file" name="file" @change="uploadPhoto($event)">
        <el-button type="primary" @click="Getdata">停车</el-button>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            // data:'',
            id:"",
            file:"",
            carid:"",
            state:'临时车',
            name:'',
            msg:'',
            btn:true
        }
    },
    //将车牌信息保存数据库
    watch: {
        carid(val) {
            // console.log("a",val)
            var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            formData.append('id', this.id)
            formData.append('state',this.state)
            formData.append('carid', val)
            if(!localStorage.car_user_name){
                this.name = "临时车"
            }
            else{
                this.name = localStorage.car_user_name
            }
            // console.log(this.name)
            formData.append('name', this.name)
            axios.post('http://47.94.38.46:80/home/index/goodssave', formData, {
            // axios.post('http://127.0.0.1:80/home/index/goodssave', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                if (res.status == 200) {
                    // console.log(res)
                    alert("操作成功~")
                    location.reload()
                }
            }).catch((error) => {
                    // console.log(error)
                    alert("操作失败！")
            })
        }
    },
    //获取车牌
    methods: {
        getFile(event) {
            this.file = event.target.files[0];
            return this.file
        },
        uploadPhoto(e) {
            // 利用fileReader对象获取file
            var file = e.target.files[0];
            var filesize = file.size;
            var filename = file.name;
            // 2,621,440   2M
            if (filesize > 2101440) {
                // 图片大于2MB
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            var _this = this
            reader.onload = function (e) {
                // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                var imgcode = e.target.result;
                // console.log(imgcode);
                _this.data = imgcode.replace(/^data:image\/\w+;base64,/, "")
            }
        },
        Getdata() {
            let that = this
            // console.log("sasasas",that.data)
            this.$http.post('/api',
                {image:that.data},
                {emulateJSON:true})
                .then((response) => {
                    that.msg = JSON.parse(response.bodyText)
                    that.carid = that.msg.words_result.number
                    // localStorage.carid = that.msg.words_result.number
                    // console.log("ok 获取车牌成功"+that.carid)
                }, (error) => {
                    console.log(error)
                })
                .catch(error => {
                console.log('在整个请求到响应过程中，只要程序出错了就会被调用。')
                }
            )
        },



    },
//     {
//     "refresh_token": "25.853a35695940951228eaef6a73041f54.315360000.1876879263.282335-16643891",
//     "expires_in": 2592000,
//     "session_key": "9mzdCrD7OAsDze6vFAEGMxBj66fn6TykSSfYN2GdKDXdalpId4JV8kutX+tr6nEOVxVLPzyJUEsJJLR0S7qIbfWr9NxArQ==",
//     "access_token": "24.1462e5a1a3c1cc8e99f9f224f7b7c8cb.2592000.1564111263.282335-16643891",
//     "scope": "public vis-ocr_ocr brain_ocr_scope brain_ocr_general brain_ocr_general_basic vis-ocr_business_license brain_ocr_webimage brain_all_scope brain_ocr_idcard brain_ocr_driving_license brain_ocr_vehicle_license vis-ocr_plate_number brain_solution brain_ocr_plate_number brain_ocr_accurate brain_ocr_accurate_basic brain_ocr_receipt brain_ocr_business_license brain_solution_iocr brain_ocr_handwriting brain_ocr_passport brain_ocr_vat_invoice brain_numbers brain_ocr_train_ticket brain_ocr_taxi_receipt vis-ocr_household_register vis-ocr_机动车检验合格证识别 vis-ocr_车辆vin码识别 vis-ocr_定额发票识别 brain_ocr_vin brain_ocr_quota_invoice brain_ocr_household_register brain_ocr_vehicle_certificate wise_adapt lebo_resource_base lightservice_public hetu_basic lightcms_map_poi kaidian_kaidian ApsMisTest_Test权限 vis-classify_flower lpq_开放 cop_helloScope ApsMis_fangdi_permission smartapp_snsapi_base iop_autocar oauth_tp_app smartapp_smart_game_openapi oauth_sessionkey smartapp_swanid_verify smartapp_opensource_openapi smartapp_opensource_recapi",
//     "session_secret": "0d6ddb38fa22c1373ef579c719318203"
// "refresh_token": "25.3be6c39d8936a3bc20efce83ddf0a366.315360000.1880010498.282335-16643891",
//     "expires_in": 2592000,
//     "session_key": "9mzdWEDatGQ0lqbeNMungAJv39tt/YcS//FHCvsIbgWgWwucJm7luU0DQgwuZUXAEdd7SJIMoZ+JvqJ1BM60HoqX/vPysQ==",
//     "access_token": "24.c04c1cb19b8e373007f409ca75e3070f.2592000.1567242498.282335-16643891",
//     "scope": "vis-ocr_vis-classify_birth_certificate vis-ocr_台湾通行证 vis-ocr_港澳通行证 brain_ocr_birth_certificate brain_ocr_HK_Macau_pass brain_ocr_taiwan_pass public vis-ocr_ocr brain_ocr_scope brain_ocr_general brain_ocr_general_basic vis-ocr_business_license brain_ocr_webimage brain_all_scope brain_ocr_idcard brain_ocr_driving_license brain_ocr_vehicle_license vis-ocr_plate_number brain_solution brain_ocr_plate_number brain_ocr_accurate brain_ocr_accurate_basic brain_ocr_receipt brain_ocr_business_license brain_solution_iocr brain_ocr_handwriting brain_ocr_passport brain_ocr_vat_invoice brain_numbers brain_ocr_train_ticket brain_ocr_taxi_receipt vis-ocr_household_register vis-ocr_机动车检验合格证识别 vis-ocr_车辆vin码识别 vis-ocr_定额发票识别 brain_ocr_vin brain_ocr_quota_invoice brain_ocr_household_register brain_ocr_vehicle_certificate wise_adapt lebo_resource_base lightservice_public hetu_basic lightcms_map_poi kaidian_kaidian ApsMisTest_Test权限 vis-classify_flower lpq_开放 cop_helloScope ApsMis_fangdi_permission smartapp_snsapi_base iop_autocar oauth_tp_app smartapp_smart_game_openapi oauth_sessionkey smartapp_swanid_verify smartapp_opensource_openapi smartapp_opensource_recapi fake_face_detect_开放Scope",
//     "session_secret": "6182171c12053fb9e98d494da4b5aadc"
// }

}
</script>

<style lang="stylus" scoped>
    .upload
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #FFF;
        border: 1px solid #DCDFE6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        padding: 12px 19px;
        font-size: 14px;
        border-radius: 4px;
        
</style>
