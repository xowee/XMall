<template>
  <div id="good-list-item" @click="goodClick">
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
    }
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
    }
  },
  computed: {
    img () {
      return this.good.image || this.good.show.img || '' 
    },
    iid () {
      return this.good.iid
    }
  }
}
</script>

<style lang="scss" scoped>
  #good-list-item {
    --radius: 10px 10px 10px 10px;
    --radius-top: 10px 10px 0 0;
    --radius-bottom: 0 0 10px 10px;
    position: relative;
    width: 44vw;
    background-color: #fff;
    border-radius: 10px 10px 10px 10px;
    margin-bottom: 20px;

    /* box-shadow: -1px 1px 2px rgba(0, 0, 0, .1); */
  }
  #good-list-item>img {
    width: 100%;
    border-radius: 10px 10px 0 0;
  }
  .good-message {
    height: 70px;
    font-size: 14px;
    overflow: hidden;
    /* text-align: center; */
    padding: 3px 1em 3px 1em;
  }
  .good-message>p {
    color: #333;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .good-detail {
    position: relative;
    width: 100%;
  }
  .good-detail>span {
    position: absolute;
  }
  .good-detail>span>img {
    position: relative;
    top: 1px;
    width: 13px;
    height: 13px;
    margin-right: 2px;
  }
  .good-detail>span:first-child {
    left: -2px;
    top: 6px;
    color: $color-main;
  }
  .good-detail>span:nth-child(2) {
    right: 0;
    top: 10px;
    font-size: 14px;
  }
  .good-detail>span:first-child>strong {
    font-size: 20px;
  }
</style>