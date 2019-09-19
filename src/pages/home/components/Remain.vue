<template>
    <div class="remain">
        <div class="remain-content">
            <h3>园区总车位</h3>
            <h3>888</h3>
            <!-- {{this.allcount}} -->
        </div>
        <div class="remain-content">
            <h3>当前车位剩余</h3>
            <h3>{{Remaincount}}</h3>
            <!-- {{this.allcount}} -->
        </div>
        <p v-text="state"></p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        this.getUserInfo()
        if(this.Remaincount > 750){
            this.state = "园区状态稀疏"
        }
        else if(this.Remaincount > 550 && this.Remaincount <= 750) {
            this.state = "园区状态良好"
        }
        else if(this.Remaincount > 350 && this.Remaincount <= 550) {
            this.state = "园区状态良好"
        }
        else if(this.Remaincount > 150 && this.Remaincount <= 350) {
            this.state = "园区状态拥挤"
        }
        else if(this.Remaincount > 0 && this.Remaincount <= 150) {
            this.state = "园区状态堵塞"
        }
    },
    data() {
        return {
            allcount:'',
            state:''
        }
    },
    computed: {
        Remaincount () {
            return 888 - this.allcount
        }
    },
    methods: {
        getUserInfo(){
            axios.get('http://47.94.38.46:80/home/home/getAllOrderCount1', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.allcount = res.data
                    // this.$store.state.data.push(res.data)
                    // console.log(res)
                }
            }).catch((error) => {
                    console.log(error)
            })
        }
    },
}
</script>

<style lang="stylus">
    .remain
        padding-top: 2%;
        padding-left: 7%;
        padding-right: 7%;
        display: flex;
        flex-direction: column;
        height: 88px;
        justify-content: space-around;
        .remain-content
            display flex
            justify-content space-between
</style>
