<template>
  <div class="tab-control">
    <div v-for="(tab, index) in tabs" :key="index" @click="tabClick(index)">
      <span :class="{'active': isActive(index)}">{{tab}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
    },
    data () {
      return {
        curIndex: 0
      }
    },
    methods: {
      isActive (index) {
        if (index === this.curIndex) {
          return true
        } else {
          return false
        }
      },
      tabClick (index) {
        this.curIndex = index
        this.$emit('tabclick', index)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tab-control {
    display: flex;
    z-index: 10;

    padding: 12px 20px 0;
    
    width: 100%;
    height: 44px;

    background-color: $color-light;
    &>div {
      flex: 1;
      text-align: center;
      span {
        padding: 5px 12px;
      }
      .active {
        border-bottom: 2px solid $color-main;
      }
    }
  }
</style>