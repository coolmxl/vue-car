<template>
  <div>
    <div class="comment-title mrl">
      <p>想说点什么就说点吧:</p>
      <el-input
      id="input"
      type="textarea"
      :rows="5"
      placeholder="请输入内容"
      autosize
      v-model="comment"
      maxlength="300"
      show-word-limit
      >
      </el-input>
      <el-button style="width:100%" 
        @click="isComment"
        class="btn-btn"
        type="primary" >提交<i class="el-icon-upload el-icon--right"></i>
      </el-button> 
    </div>
    <span class="mrl">总{{total}}条</span>
    <div class="comment mrl">
      <div class="comment-box" v-for="item in mylist" :key="item.id" >
        <div class="c-b-title">
          <input type="hidden" :value="item.id"> 
          <input type="hidden" :value="item.comment_id">  
          <div><img :src="item.path" class="head-p" alt=""><div>{{item.comment_name}}</div></div>
          <span>{{item.comment_time}}</span>
        </div>
      <div class="content">{{item.content}}</div>
      <div class="c-b-footer">
        <div><a href="#" @click.prevent="Reply">回复</a></div>
        <a @click.prevent="turnOnReply">查看回复</a>
      </div>
      <div class="commented-box" v-show="item.isComed">
        <div class="comment-box-item" v-for="item in item.list" :key="item.id+1">
        <div class="c-b-title">
          <input type="hidden" :value="item.id"> 
          <input type="hidden" :value="item.id_branch">  
          <div class="who-reply"><img class="head-p" :src="item.path"  alt="">{{item.comment_name}} 回复 {{item.commented_name}}</div>
          <span>{{item.comment_time}}</span>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="c-b-footer"> <div style="width:13%"><a href="#" @click.prevent="Reply">回复</a> </div></div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from '@/api/myapi'
import axios from 'axios'
export default {
  name:"comment",
  data() {
    return {
      // 分页用的
      pagesize:5,
      currentPage:1,
      lookpl:"查看回复",
      // disabled:true,
      // 评论的内容
      comment:'',
      // 评论总数
      total:0,
      // 总评论的数据
      mylist:[],
      // pglist:[],
      // 被回复的名字
      commented_name:"",
      // 分支
      id_branch:'',
      // id
      id:'',
      // 评论的所有回复信息  在通过分支筛选每条评论的回复
      commenedList:[],
      //查看回复和收起回复的开关 
      btn:false,
      // agree_btn:false,
      // 分页的数据
      // pagesize:3,
      // currentPage:1,
      // isCurrent:''
      // 回复是否显示
      // isComed:false
    }
  },
  mounted() {
    
  },
  methods: {
    // handleSizeChange(val) {
    //   this.pagesize =val;
    // },
    // handleCurrentChange(val) {
    //     this.currentPage = val;
    // },
    // agree(item,e){
    //   if(!localStorage.car_user_id){
    //     confirm("您没有权限,请先登录或注册");
    //     return false
    //   }
    //   let last  = e.x;
    //   this.agree_btn = !this.agree_btn
    //   if(this.agree_btn == true){
    //     item.agree_count++
    //     // this.submitAgree(item.id,count)
    //   }
    //   else if(this.agree_btn == false){
    //     item.agree_count--
    //   }
    //   // this.agree_btn = false;
    //   // console.log(this.agree_btn)
    // },
    turnOnReply(e){
      // 打开回复列表
      let mybox = e.path[2].children[3];
      let ckpl =  e.path[1].children[1];
      // console.log(mybox);
      this.btn = !this.btn
      if(this.btn == true){
        mybox.style.display = ""
        mybox.style.opacity = "1"
        ckpl.innerText = "收起回复"
      }
      else if(this.btn == false){
        mybox.style.display = "none"
        mybox.style.opacity = "0"
        ckpl.innerText = "查看回复"
      }
    },
    Reply(e){
      // 获取被评论的人信息
      console.log(e);
      this.commented_name = e.path[3].children[0].children[2].children[1].innerText
      this.id = e.path[3].children[0].children[1].value
      this.id_branch = e.path[3].children[0].children[0].value
      // console.log('这是被评论人的名字'+this.commented_name)
      // console.log('这是图片id'+this.id_branch)
      // console.log('这是被评论人的id'+this.id)
      // console.log('这是当前用户的id'+localStorage.car_user_id)
      let myIpt = document.querySelector('#input')
      myIpt.focus()
    },
    async submitCommented(){
      // 提交回复的评论
      try {
        let msg = {
          id:localStorage.car_user_id,
          content:this.comment,
          id_branch:this.id_branch,
          commented_name:this.commented_name
        }
        let data = JSON.stringify(msg);
        // console.log(data)
        let postData = this.$qs.stringify({
          data:msg
        })
        console.log(localStorage.car_user_id,this.comment)
        let mycom = await axios.post(`http://47.94.38.46:80/home/index/subCommented`,postData,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
        })
        console.log(mycom)
        location.reload()
      } catch(e) {
        console.error(e)
      }
    },
    isComment() {
      // 判断是否登录 然后判断是评论还是回复
      let i = 1;
      if(!localStorage.car_user_id){
        confirm("您没有权限,请先登录或注册");
        return false
      }
      if(this.commented_name != ""){
        this.submitCommented()
      }
      else{
        this.submitComment()
      }
    },
    async submitComment(){
      // 提交评论
      try {
        // let msg = {
        //   id:localStorage.car_user_id,
        //   content:this.comment,
        // }
        // let data = JSON.stringify(msg);
        // let postData = this.$qs.stringify({
        //   data:msg
        // })
        // console.log(localStorage.car_user_id,this.comment)
        let FormData = new window.FormData()
        // console.log(this.comment)
        FormData.append('id',localStorage.car_user_id)
        FormData.append('content',this.comment)
        let mycom = await axios.post(`http://47.94.38.46:80/home/index/subComment`,FormData,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
        })
        console.log(mycom)
        location.reload()
      } catch(e) {
        console.error(e)
      }
    },
    async getComment(){
      // 得到所有评论信息
      let data = await api.get("http://47.94.38.46:80/home/index/getcomment")
      // console.log(data)
      data.filter( x => x.id_branch == null).map( x =>{
        x.comment_time = x.comment_time.substr(5)
        x.comment_time = x.comment_time.substr(0,11)
        x.path = "http://47.94.38.46:80/static/img/" + x.path
        this.mylist.push(x)
      })
      // 总条数
      this.total = this.mylist.length;
      // this.pglist = this.mylist.slice(0,4);
      // 根据分支与id匹配  获得评论里的回复
      this.commenedList  =  data.filter( x => x.id_branch != null)
      // console.log(this.commenedList[1].id_branch.substr(0,1))
      for(let item of this.mylist){
        // console.log(item.id)
        let List = []
        this.commenedList.map(x => {
          if(item.id == x.id_branch ){
            x.comment_time = x.comment_time.substr(5)
            x.comment_time = x.comment_time.substr(0,11)
            x.path = "http://47.94.38.46:80/static/img/" + x.path
            item.isComed = false
            List.push(x)
            item.list = List
          }
        })
      }
      // console.log(this.mylist)
    },
  },
  created() {
    this.getComment()
  },
  // mounted() {
  //   console.log(this.mytime)
  // },
}
</script>

<style lang="stylus">
.head-p{
  border-radius: 40px;
  width: 50px;
  height: 40px;
  line-height: 40px;
  margin-right 10%
}
.mrl{
  margin-left 5%
  margin-right  5%
}
.active{
  color blue
}
.comment{
}
.who-reply{
  width 40%
}
.comment-title 
  margin-top 3%
  p
    // margin-left 5% 
    // font-size 15px
    margin-bottom: 5%;
.comment-box
  font-size 17px
  border: 1px #666 solid;
  margin-bottom: 2%;
  .c-b-title
    display flex
    justify-content space-between
    align-items center
    margin-bottom 1%
    margin-top 1%
    div
      display flex
      align-items center
      width 35%
    span 
      font-size 12px
  .c-b-footer
    display flex
    flex-direction row-reverse
    justify-content space-between
    font-size 15px
    margin-top 1%
    margin-bottom  1%
    div
      width: 6%;
      span 
        margin-left  10%
  .content
    // background:rgb(64, 158, 255);
  .commented-box
      font-size 20px
      // border: 1px #666 solid;
      margin-bottom: 2%;
      margin-left 6%
      transition 0.5s all  linear
      .comment-box-item
        font-size 17px
        margin-bottom: 2%;
      // .c-b-title
      //   display flex
      //   justify-content space-between
      //   align-items center
      //   margin-bottom 3%
      //   span 
      //     font-size 12px
      // .c-b-footer
      //   display flex
      //   flex-direction row-reverse
      //   font-size 15px
      //   margin-top 1%
      //   margin-bottom  1%
      //   span 
      //     margin-left  3%
</style>