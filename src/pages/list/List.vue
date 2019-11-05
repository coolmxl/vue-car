<template>
    <div>
        <div style="margin-top: 5%;" >
            <el-table  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe fit empty-text="暂无数据" style="width: 100%" size="mini"
                    :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column
                    prop="id"
                    label="id"
                    sortable
                    >
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    label="add_time"
                    sortable
                    >
                </el-table-column>
                <el-table-column
                    prop="carid"
                    label="carid"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="stopTime"
                    label="停车时间/小时"
                    sortable
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="mini">结束</el-button>
                    </template>
                    </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="5"
                layout="total, prev, pager, next"
                :total="tableData.length">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    components:{
    },
    data(){
        return {
            tableData: [],
            pagesize:5,
            currentPage:1,
            state:'',
            key_id:""
        }
    },
    methods: {
        handleClick(key) {
            console.log(key.id)
            var key_word = new window.FormData()
            key_word.append('id',key.id)
            axios.post('http://47.94.38.46:80/home/home/webcarlistdelete',key_word, {
            // axios.post('http://127.0.0.1:80/home/index/goodssave', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                if(res){
                    console.log(res)
                    // location.reload();
                }
            }).catch((error) => {
                    console.log(error)
            })
        },
        handleSizeChange(val) {
            this.pagesize =val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        getMsg() {
            var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            if(!localStorage.car_user_name){
                this.state = "临时车"
            }
            else{
                this.state = localStorage.car_user_name
            }
            formData.append('state', this.state)
            axios.post('http://47.94.38.46:80/home/home/webcarlist', formData, {
            // axios.post('http://127.0.0.1:80/home/index/goodssave', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                if (res.status == 200) {
                    for(let i = 0; i < res.data.length; i++){
                        let Ntime = new Date()
                        let date = new Date(res.data[i].add_time)
                        let Stime = parseInt((Ntime - date) / 1000 / 60/ 60)
                        // 停车时间
                        const tableItem = {
                            id: res.data[i].id,
                            add_time: res.data[i].add_time,
                            carid: res.data[i].carid,
                            stopTime:Stime
                        }
                        // console.log(tableItem)
                        this.tableData.push(tableItem)
                    }
                }

            }).catch((error) => {
                    console.log(error)
            })
        },
    },
        mounted() {
        this.getMsg()
    },
}
</script>

<style>

</style>
