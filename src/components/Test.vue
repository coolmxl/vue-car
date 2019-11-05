<template>
    <div>
            <!-- <form action="http://127.0.0.1:8000/home/index/goodssave" method="post" enctype="multipart/form-data"> -->
                <input type="text"  name="id" v-model="id" placeholder="请输入id">
                <input type="file" name="file" @change="getFile($event)">
                 <!-- @change="getFile($event)" -->
                <!-- <input type="submit" value="提交" />\
                 </form> -->
                 <!-- <input type="button" value="提交" /> -->
                  <el-button type="primary" @click="submit">主要按钮11</el-button>
                 <!-- <div>
                     <ul>
                         <li v-for="item in data" :key="item.id">{{item.id}} --{{item.path}}
                            <img :src="item.path"/>
                         </li>
                     </ul>
                 </div> -->
                 <!-- <img alt="Vue logo" src="/preview5.jpg"> -->
                  <!-- <img src="./assets/20190624\d4a113c6788220083d74ef38fd06cbb6.jpg  "/> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            id:"",
            file:"",
            rid:"",
            data:[]

        }
    },
    methods: {
        getFile(event) {
            this.file = event.target.files[0];
        },
        submit() {
            var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            formData.append('file', this.file)
            formData.append('id', this.id)
            axios.post('http://127.0.0.1:8000/home/index/goodssave', formData, {
            // axios.post('http://127.0.0.1:80/home/index/goodssave', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                }
            }).catch((error) => {
                    console.log(error)
            })
        },
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/home/index/index',{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
            }).then((res) => {
                if(res){
                console.log("ok")
                this.data = res.data
                console.log(res.data)
                }
            }).catch((error) => {
                    console.log(error)
            })
    },
}
</script>

<style scoped>

</style>
