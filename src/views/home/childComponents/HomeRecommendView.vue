<template>
  <div class="recommend-view">
    <div v-for="(item, index) in recommends" :key="index">
      <img :src="item.image" alt="" @load="recommendImgLoaded">
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      recommends: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        loaded: false
      }
    },
    methods: {
      recommendImgLoaded () {
        if (this.loaded === false) {
          this.$emit('recommendImgLoaded')    
          this.loaded = true
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .recommend-view {
    display: flex;
    justify-content: space-between;
    padding-bottom: 18px;
    font-size: $size-middle;
    &>div {
      width: 20%;
      text-align: center;
      img {
        margin-bottom: 8px;
        width: 100%;
        border-radius: 50%;
      }
    }
  }
</style>
