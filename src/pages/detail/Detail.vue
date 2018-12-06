<template>
    <div>
        <BookInfo :info="info"></BookInfo>
        <CommentList :comments="comments"></CommentList>
        <div class="comment" v-if="showAdd">
            <textarea v-model="comment" class="textarea" maxlength="100" placeholder="请输入图书短评">
            </textarea>
            <div class="location">
                地理位置:
                <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                手机型号:
                <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
                <span class="text-primary">{{phone}}</span>
            </div>
            <button class='btn' @click="addComment">评论</button>
        </div>
        <div class="text-footer" v-else>未登录或者已经评论过了呀</div>
        <button class="btn" open-type="share">转发给好友</button>
    </div>
</template>
<script>
import {get, post, showModal} from '@/utils/index'
import CommentList from '@/components/CommentList'
import BookInfo from '@/components/BookInfo'
export default {
  data () {
    return {
      userinfo: {},
      bookId: 0,
      info: {},
      comment: '',
      location: '',
      phone: '',
      comments: []
    }
  },
  computed: {
    showAdd () {
      if (!this.userinfo.openId) {
        return false
      } else if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookDetail', {id: this.bookId})
      this.info = info
      wx.setNavigationBarTitle({
        title: info.title
      })
    },
    getGeo (e) {
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      let ak = '6B9m4d687ObvnoT6rp2Z6EYA6I2CfZd5'
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        let phone = wx.getSystemInfoSync()
        this.phone = phone.model
      } else {
        this.phone = ''
      }
    },
    async getComments () {
      let comments = await get('/weapp/commentList', {bookId: this.bookId})
      this.comments = comments.list
    },
    async addComment () {
      if (!this.comment) {
        return
      }
      const data = {
        bookId: this.bookId,
        openId: this.userinfo.openId,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      try {
        await post('/weapp/addComment', data)
        this.comment = ''
        showModal('成功', '评论成功')
        this.getComments()
      } catch (e) {
        showModal('失败', e.msg)
      }
    }
  },
  onShareAppMessage (from, target) {
    if (from.from === 'button') {
      console.log(target)
      return {

      }
    }

    wx.showShareMenu()
  },
  mounted () {
    this.bookId = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  components: {
    BookInfo,
    CommentList
  }
}
</script>

<style lang="scss">
.comment{
    margin-top: 10px;
    .textarea{
        background: #eee;
        padding: 10px;
        width: 730rpx;
        height: 220rpx;
    }
    .location{
        margin-top: 10px;
    }
    .phone{
        margin-top: 10px;
    }
}

</style>