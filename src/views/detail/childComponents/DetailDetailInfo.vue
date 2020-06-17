<template>
  <div class="detail-detail-info">
    <header>
      <div class="start"></div>
      <div class="desc">
        {{detailInfo.desc}}
      </div>
      <div class="end"></div>
    </header>
    <section v-for="(item, index) in detailInfo.detailImage" :key="index">
      <div>{{item.key}}</div>
      <img v-for="(img, i) in item.list" v-lazy="img" :key="i" @load="detailImgLoaded">
    </section>
  </div>
</template>

<script>
  export default {
    name: 'DetailDetailInfo',
    props: {
      detailInfo: {
        type: Object,
        default () {
          return {}
        }
      },
    },
    methods: {
      detailImgLoaded () {
        this.$emit('detailImgLoaded')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-detail-info {
    background-color: $color-light;
    padding: $padding-vertical $padding-horizontal;
    header {
      .desc {
        padding: 15px 0;
        font-size: $size-middle;
        text-indent: 2em;
        line-height: 1.5;
      }
      .line {
        position: relative;
        width: 90px;
        height: 1px;
        background-color: #000;
      }
      .dot {
        content: '';
        height: 7px;
        width: 7px;
        border-radius: 50%;
        background-color: #000;

        position: absolute;
        bottom: -3px;
      }
      .start {
        @extend .line;
        float: left;
        &::before {
          @extend .dot;
        }
      }
      .end {
        @extend .line;
        float: right;
        &::after {
          @extend .dot;
          right: 0;
        }
      }
    }
    section {
      margin-top: 20px;
      div {
        border-left: 2px solid $color-main;
        text-align: left;
        padding-left: 10px;
        margin-bottom: 10px;
        color: $color-normal;
        font-size: $size-normal;
        font-weight: bold;
      }
      img {
        width: 100%;
        display: block;
      }
    }
  }
</style>
