<template>
  <scroll class="category-side-bar">
    <ul>
      <li 
        v-for="(item, index) in categorys" 
        :key="index" 
        :class="{actived: isActived(index)}"
        @click="liClick(index, item)"
      >
        {{item.title}}
      </li>
    </ul>
  </scroll>
</template>

<script>
  import Scroll from 'common/scroll/Scroll.vue'

  export default {
    name: 'CategorySideBar',
    components: {
      Scroll,
    },
    props: {
      categorys: {
        type: Array,
        default () {
          return []
        }
      },
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      isActived (index) {
        return this.currentIndex === index
      },
      liClick (index, item) {
        this.currentIndex = index
        // console.log(item)
        this.$emit('liClick', item)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .category-side-bar {
    flex-shrink: 0.7;
    overflow: hidden;
    height: 100%;
    width: 100px;
    text-align: center;
    color: $color-normal;
    li {
      padding: 14px 0;
      border-bottom: $border-thin;
    }
    .actived {
      color: $color-main;
      background-color: #fff;
      border-left: 2px solid $color-main;
    }
  }
</style>
