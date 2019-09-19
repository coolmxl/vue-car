<template>
    <div>
        <!-- <Header/> -->
        <Btn/>
        <Remain/>
        <section class="data_section" style="width:90%;">
            <header class="section_title" >园区数据统计</header>
            <el-row :gutter="20" style="margin-bottom: 10px; display:flex">
                <el-col :span="4"><div class="data_list today_head" style="width:143px;margin-left:40%;}"><span class="data_num head">当日数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list " style="width:143px;margin-left:350%;}"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head" style="width:143px;margin-left:40%;"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list" style="width:143px;margin-left:350%;"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
            </el-row>
        </section>
        <Tendency :sevenDate='sevenDate' :sevenDay='sevenDay' />
    </div>
</template>

<script>
import Header from './components/Header'
import Btn from './components/Btn'
import Remain from './components/Remain'
import Tendency from '../../components/Tendency'
import axios from 'axios'
export default {
    components:{
        Header,
        Btn,
        Remain,
        Tendency
    },
    data() {
        return {
            orderCount: null,
            allOrderCount:'',
            sevenDay:[],
            sevenDate: []
        }
    },
    mounted() {
        this.getSevenDay()
        this.getOrderCount()
        this.getAllOrderCount()
    },
    methods: {
         getSevenDay() {
            var myDate = new Date(); //获取今天日期
            myDate.setDate(myDate.getDate() - 7); 
            var dateArray = [];
            var dateTemp;
            var flag = 1;
            for (var i = 0; i < 7; i++) { 
                dateTemp = myDate.getFullYear()+ "-" + (myDate.getMonth() + 1) + "-" + (myDate.getDate()+1);
                dateArray.push(dateTemp);
                myDate.setDate(myDate.getDate() + flag);
            } 
            // let ntime = myDate.getFullYear()+ "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
            // dateArray.push(ntime)
            this.sevenDay = dateArray                
        },
        getOrderCount() {
            axios.get('http://47.94.38.46:80/home/home/getOrderCount',{
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    }
            }).then((res) => {
                this.orderCount = res.data[0].count
                for(let i = 0; i < res.data.length; i++){
                    this.sevenDate.push(res.data[i].count)
                }
                this.sevenDate.reverse();
            }).catch((error) =>{
                console.log(error)
            })
        },
        getAllOrderCount() {
            axios.get('http://47.94.38.46:80/home/home/getAllOrderCount',{
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    }
            }).then((res) => {
                console.log(res.data)
                this.allOrderCount = res.data[0].id
            }).catch((error) =>{
                console.log(error)
            })
        }
    },
}
</script>

<style lang="stylus">
    .section_title{
        text-align: center;
        font-size: 24px;
        margin-bottom: 10px;
    }
    .el-col-4 {
        width: 19.66667%;
    }
    .data_list{
        text-align: center;
        font-size: 14px;
        color: #666;
        border-radius: 6px;
        background: #E5E9F2;
        .data_num{
            color: #333;
            font-size: 26px;
            padding-left 10%

        }
        .head{
            border-radius: 6px;
            font-size: 18px;
            padding: 4px 0;
            color: #fff;
            display: inline-block;
        }
    }
    .today_head{
        background: #FF9800;
    }
    .all_head{
        background: #20A0FF;
    }
</style>
