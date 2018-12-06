<template>
    <div class="swiper">
        <swiper
            :indicator-dots="true"
            indicator-color="#EA5A49"
            :autoplay="true"
            :interval="6000"
            :duration="1000"
            :circular="true">
            <div v-for="top in imgUrls" :key="top.id">
                <swiper-item>
                    <img
                        @click="bookDetail(img)"
                        mode="aspectFit"
                        class="slide-image"
                        v-for="(img,imgIndex) in top"
                        :key="imgIndex"
                        :src="img.image">
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
export default {
  props: {
    tops: {
      type: Array,
      default: []
    }
  },
  computed: {
    imgUrls () {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  }
}
</script>
<style lang="scss">
.swiper{
    margin-top: 5px;
    .slide-image{
        width: 33%;
        height: 250rpx;
    }
}
</style>