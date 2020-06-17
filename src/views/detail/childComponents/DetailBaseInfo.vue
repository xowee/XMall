<template>
  <div class="detail-base-info">
    <header>{{baseInfo.title}}</header>
    <section>
      <span class="price">{{baseInfo.price}}</span>
      <span v-if="baseInfo.oldPrice">
        <span class="oldprice">{{baseInfo.oldPrice}}</span>
        <span class="discount">
          <span :style="showStyle()">{{baseInfo.discountDesc}}</span>
        </span>
      </span>
    </section>
    <ul class="columns">
      <li v-for="(item, index) in baseInfo.columns" :key="index">{{item}}</li>
    </ul>
    <ul class="services">
      <li v-for="(item, index) in baseInfo.services" :key="index" >
        <img :src="item.icon" v-if="item.icon">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      baseInfo: {
        type: Object,
        default () {
          return {}
        }
      },
    },
    methods: {
      showStyle () {
        return {
          backgroundColor: this.baseInfo.discountBgColor,
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-base-info {
    padding: $padding-vertical $padding-horizontal;
    margin-bottom: $padding-vertical;
    background-color: $color-light;
    color: $color-normal;
    header {
      padding-bottom: 10px;
      color: $color-black;
    }
    section {
      padding-bottom: 10px;
      .price {
        padding-right: 6px;
        font-size: 22px;
        color: $color-main;
      }
      .oldprice {
        font-size: $size-middle;
        color: $color-hint;
        text-decoration: line-through;
      }
      .discount {
        position: relative;
        display: inline-block;
        width: 100px;
        &>span {
          box-sizing: border-box;
          display: block;
          position: absolute;

          padding: 4px 8px;
          
          font-size: $size-mini * 2;
          line-height: 1;
          color: $color-light;
          border-radius: 20px;

          -webkit-transform-origin: 4px -40px;
          transform-origin: 4px -40px;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
        }
      }
    }
    .columns {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;

      font-size: $size-middle;
      color: $color-normal;

      list-style: none;
      border-bottom: $border;
      li {
        text-align: center;
      }
    }
    .services {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-top: 10px;

      list-style: none;
      font-size: $size-small;
      text-align: center;
      li {
        padding: 4px 3px 4px 0;
        line-height: 1;
        img {
          display: inline-block;
          position: relative;
          top: 1px;
          width: 12px;
          height: 12px;
        }
      }
    }
  }
</style>
