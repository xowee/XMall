<template>
  <div class="feature-view">
    <header>正在流行</header>
    <div class="feature-content">
      <div class="feature-item" v-for="(feature, index) in features" :key="index">
        <img :src="feature.image" :alt="feature.title" load="featureImgLoaded">
        <div>{{feature.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeFeatureView',
    props: {
      features: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      featureImgLoaded () {
        this.$emit('featureImgLoaded')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .feature-view {
    padding-top: $padding-horizontal;
    text-align: center;
    color: $color-normal;
    background-color: $color-light;
    border-radius: 14px 14px 0 0;
    header {
      font-size: $size-normal;
      font-weight: bold;
      line-height: 1.5;
    }
    .feature-content {
      display: flex;
      flex-wrap: wrap;
      font-size: $size-small;
      .feature-item {
        margin: 10px 0 14px;
        width: 25%;
        img {
          margin-bottom: 4px;
          width: 60%;
          border-radius: 50%;
          box-shadow: -1px 1px 6px rgba(1, 1, 1, 0.07);
        }
      }
    }
  }
</style>