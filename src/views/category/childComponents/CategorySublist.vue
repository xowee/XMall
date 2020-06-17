<template>
  <scroll class="category-sublist">
    <ul>
      <li v-for="item in subCategorys" :key="item.acm" @click="showTitle(item.title)">
        <div class="box"><img :src="item.image" alt=""></div>
        <div>{{item.title}}</div>
      </li>
    </ul>
  </scroll>
</template>

<script>
  import Scroll from 'common/scroll/Scroll.vue'

  export default {
    name: 'CategorySublist',
    components: {
      Scroll
    },
    props: {
      subCategorys: Array,
      default () {
        return []
      }
    },
    methods: {
      showTitle (title) {
        this.$toast.showMessage(`${title}~`)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .category-sublist {
    padding: 0 2vw;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: $color-light;
    ul {
      display: flex;
      flex-wrap: wrap;
      font-size: $size-middle;
      text-align: center;
      color: $color-normal;
      list-style: none;
      li {
        padding: 15px 4%;
        width: 33.3%;
        .box {
          position: relative;
          padding-bottom: 100%;
          margin-bottom: 10px;
          width: 100%;
          height: 0;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
