<template>
  <div class="good-list-item" @click="goodClick">
    <img v-lazy="img" @load="goodImgLoaded">
    <div class="good-message">
      <p ref="good-title">{{good.title}}</p>
      <div class="good-detail">
        <span>￥<strong>{{good.price}}</strong></span>
        <span><img src="~assets/img/content/fav.svg"/>{{good.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodListItem',
    props: {
      good: {
        type: Object,
        default () {
          return {}
        }
      },
    },
    computed: {
      img () {
        return this.good.image || this.good.show.img || '' 
      },
      iid () {
        return this.good.iid
      },
    },
    methods: {
      goodImgLoaded () {
        this.$emit('goodImgLoaded')
      },
      goodClick () {
        // console.log(this.good);
        // console.log(this.iid)
        if (this.iid) {
          // this.$store.commit('setLoading', true)
          this.$router.push('/detail/'+this.iid)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .good-list-item {
    --radius: 10px 10px 10px 10px;
    --radius-top: 10px 10px 0 0;
    --radius-bottom: 0 0 10px 10px;
    position: relative;
    margin-bottom: 20px;
    width: 44vw;
    background-color: #fff;
    border-radius: 10px 10px 10px 10px;
    img {
      width: 100%;
      border-radius: 10px 10px 0 0;
    }
  }
  .good-message {
    padding: 3px 1em 3px 1em;
    height: 70px;
    overflow: hidden;
    font-size: $size-middle;
    &>p {
      display: -webkit-box;

      overflow: hidden;
      text-overflow: ellipsis;

      line-height: 1.2;
      color: $color-black;
      
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .good-detail {
    position: relative;
    width: 100%;
    color: $color-hint;
    &>span {
      position: absolute;
      &>img {
        position: relative;
        top: 1px;
        width: 13px;
        height: 13px;
        margin-right: 2px;
      }
    }
    &>span:first-child {
      left: -2px;
      top: 6px;
      color: $color-main;
    }
    &>span:nth-child(2) {
      right: 0;
      top: 10px;
      font-size: $size-middle;
    }
    &>span:first-child>strong {
      font-size: $size-large;
    }
  }
</style>