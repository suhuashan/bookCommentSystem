
<template>
  <div class="container">
    <CommentList type="user" :comments="comments" v-if="userinfo.openId"></CommentList>
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <Card v-for="book in books" :key="book.id" :book="book"></Card>
      <div v-if="!books.length">暂时还没添加书，快去添加几本吧!</div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import {get} from '@/utils/index'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'

export default {
  data () {
    return {
      comments: [],
      userinfo: {},
      books: {}
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '评论列表'
    })
  },
  onShow () {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    } else {
      this.init()
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  computed: {

  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks () {
      let books = await get('/weapp/bookList', {openId: this.userinfo.openId})
      this.books = books.list
    },
    async getComments () {
      let comments = await get('/weapp/commentList', {openId: this.userinfo.openId})
      this.comments = comments.list
    }
  },
  components: {
    CommentList,
    Card
  }
}
</script>

<style>

</style>
