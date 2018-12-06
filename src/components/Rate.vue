<template>
    <div class="rate">
        <span>☆☆☆☆☆</span>
        <div class="hollow" :style="style">
            ★★★★★
        </div>
    </div>
</template>
<script>
export default {
  props: {
    rate: {
      type: [Number, String],
      default: '0'
    }
  },
  computed: {
    style () {
      let width = ((this.rate / 2) * 12.5).toFixed(1)
      return `width:${width}px`
    }
  }
}
</script>
<style lang="scss">
    .rate{
        position: relative;
        display: inline-block;
        .hollow{
            position: absolute;
            display: inline-block;
            top: 0;
            left: 0;
            width: 0;
            overflow: hidden;
        }
    }
</style>
