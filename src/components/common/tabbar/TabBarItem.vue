<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="isActive">
      <slot name="item-img-act"></slot>
    </div>
    <div v-show="!isActive">
      <slot name="item-img"></slot>
    </div>
    <div :style="showStyle()">
      <slot name="item-name"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      activeColor: {
        type: String,
        default: '#d81e06'
      },
      path: {
        type: String
      },
    },
    computed: {
      isActive () {
        return this.$route.path.indexOf(this.path) !== -1
      }
    },
    methods: {
      showStyle () {
        return this.isActive ? { color: this.activeColor } : {}
      },
      itemClick () {
        if (this.path !== this.$route.path) {
          this.$router.replace(this.path)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tab-bar-item {
    flex: 1;
    img{
      height: 20px;
      width: 20px;
      margin-top: 8px;
      margin-bottom: 4px;
    }
  }
</style>
