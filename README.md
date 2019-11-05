 前后端分离停车管理系统用户界面

## 后端
```
采用thinkPHP开发，运用mysql数据库，运用第三方包如阿里短信验证
```

### 前端
```
采用Vue框架开发，运用众多依赖。如vue-router、styuls、element-ui、axios等
```

### 功能
```
1. 登陆、注册
2. 停车使用百度api车牌识别、
3. 评论列表
  3-1 评论
  3-2 回复  
4. 修改个人车牌
5. 通过手机验证修改个人手机号
6. 上传头像
7. 查看个人停车信息
```

### 网站展示
```
http://47.94.38.46/dist/index.html#/home
PS（由于个人实力有限，当我打包到线上时，我使用的proxy代理百度API的请求失效。所以百度API出现了跨域问题，各方求解无济于事（比如使用Nginx反向代理）。所以在线上停车有BUG，若有需要，我可以本地演示，或者视频。）
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# vue-car
