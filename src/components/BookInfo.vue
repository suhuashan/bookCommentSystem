<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back" :src="info.image" mode="aspectFill">
            <img class="img" :src="info.image" mode="aspectFit">
            <div class="info">
                <div class="title">
                    {{info.title}}
                </div>
                <div class="author">
                    {{info.author}}
                </div>
            </div>
        </div>
        <div class="detail">
            <img :src="userinfo.image" mode="aspectFit" class='avatar'>
            {{userinfo.name}}
            <div class="right text-primary">
                {{info.rate}}分
                <Rate :rate="info.rate"></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" :key="tag" v-for="tag in info.tags">
                {{tag}}
            </div>
        </div>
        <div class="summary">
            <p :key="i" v-for="(sum,i) in info.summary">
                {{sum}}                
            </p>
        </div>
    </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {

    }
  },
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  },
  mounted () {

  },
  components: {
    Rate
  }
}
</script>

<style lang="scss">

.bookinfo{
    .badge{
        display: inline-block;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid #EA5A49;
        color: #EA5A49
    }
    .summary{
        padding: 0 15px;
        margin-top: 10px;
        p{
            text-indent: 2em;
            font-size: 14px;
        }
    }
    font-size: 14px;
    .right{
        float: right;
    }
    .detail{
        padding: 5px 10px;
        .avatar{
            height: 20px;
            width: 20px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .thumb{
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        .back{
            width: 100%;
            filter: blur(15px);
        }
        .img{
            position: absolute;
            height: 300rpx;
            width: 100%;
            left: 0;
            top: 3r0px;
        }
        .info{
            color:white;
            position: absolute;
            left: 0;
            top: 330rpx;
            width: 100%;
            text-align: center;
            .title{
                font-size: 20px;
            }
            .author{
                font-size: 14px;
            }
        }
    }

}
</style>
