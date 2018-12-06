<template>
    <div class="comment-list">
        <div class="page-title" v-if="comments.length">
            评论
        </div>
        <div class="comment" v-for="(comment,index) in comments" :key="index" @click="handerClick(comment)">
            <div class="user">
                <img :src="comment.user_info.image" mode="aspectFit" class="avatar">
                <span>  {{comment.user_info.title}}</span>
            </div>
            <div class="right">
                {{comment.location || "未知地点"}}
                <span class="text-primary">
                    --
                </span>
                {{comment.phone || "未知型号"}}
            </div>
            <div class="content">
                {{comment.comment}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    handerClick (comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + comment.bookid
        })
      }
    }
  }
}
</script>
<style lang="scss">
.comment-list{
    background: #eee;
    font-size: 14px;
    .comment{
        background: white;
        margin-bottom: 10px;
        padding: 5px 20px;
        .content{
            margin: 10px 0;
        }
        .user{
            display: inline-block;
            .avatar{
                vertical-align: middle;
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }

        }
    }   

}
</style>

