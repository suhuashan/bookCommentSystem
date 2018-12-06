<template>
<div>
  <TopSwiper :tops="tops"></TopSwiper>
  <Card v-for="item in books" :key="item.id" :book="item"></Card>
  <p class="text-footer" v-if="!more">
    没有更多数据
  </p>
</div>

</template>

<script>
// Use Vuex
import {get} from '@/utils/index'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  mounted () {
    this.getList(true)
    this.getTop()
  },
  computed: {

  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/bookList', {page: this.page})
      if (books.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      let tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
  },
  onReachBottom () {
    if (!this.more) {
      return
    }
    this.page++
    this.getList(false)
  },
  components: {
    Card,
    TopSwiper
  }
}
</script>

<style>

</style>
