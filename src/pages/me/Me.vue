<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" :src="userinfo.avatarUrl" alt="">
      <p class="userinfo-nickName">{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if="userinfo.openId" class="btn" @click="scanBook">添加图书</button>
    <button v-else class="btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="login">登录</button>
  </div>
</template>

<script>
// Use Vuex
import qcloud from 'wafer2-client-sdk'
import {showSuccess, showLogin, post, showModal} from '@/utils/index'
import config from '@/config'
import YearProgress from '@/components/YearProgress'
export default {
  data: {
    userinfo: {
      avatarUrl: '../../../static/img/unlogin.png'
    }
  },
  onShow () {
    wx.showShareMenu()
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  computed: {

  },
  methods: {
    loginSuccess (res) {
      showSuccess('登录成功')
      wx.setStorageSync('userinfo', res)
      this.userinfo = res
    },
    login () {
      showLogin('登录中')
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      console.log(session)
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            console.log('没过期的登录', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      } else {
        qcloud.login({
          success: res => {
            console.log('登录成功', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      }
    },
    async addBook (isbn) {
      console.log(isbn)
      const res = await post('/weapp/addBook', {
        isbn,
        openid: this.userinfo.openId
      })
      showModal('添加成功', `${res.title}添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            console.log(res)
            this.addBook(res.result)
          }
        }
      })
    }
  },
  components: {
    YearProgress
  }
}
</script>

<style lang="scss">
.container{
  padding: 0 30rpx;
}
.userinfo{
  margin-top: 100rpx;
  text-align: center;
  img{
    width: 150rpx;
    height: 150rpx;
    margin: 20px;
    border-radius: 50%;
  }
}
</style>
