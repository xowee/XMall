<template>
  <div class="detail-shop-info">
    <header>
      <img :src="shopInfo.shopLogo" :alt="shopInfo.name">
      {{shopInfo.name}}
    </header>
    <section>
      <div class="total">
        <div>
          <div class="count">{{cSells}}</div>
          <div class="desc">总销量</div>
        </div>
        <div>
          <div class="count">{{shopInfo.cGoods}}</div>
          <div class="desc">全部宝贝</div>
        </div>
      </div>
      <div class="score">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.score}}</td>
            <td><span class="score-icon" :class="showScoreStyle(item.isBetter)">{{showScore(item.isBetter)}}</span></td>
          </tr>
        </table>
      </div>
    </section>
    <footer>
      <div>进店逛逛</div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'DetailShopInfo',
    props: {
      shopInfo: {
        type: Object,
        default () {
          return {}
        }
      },
    },
    computed: {
      cSells () {
        if (this.shopInfo.cSells >= 10000) {
          return Math.round(this.shopInfo.cSells / 10000).toFixed(0)+'w'
        }
        return this.shopInfo.cSells
      },
    },
    methods: {
      showScore (isBetter) {
        return isBetter ? '高' : '低'
      },
      showScoreStyle (isBetter) {
        // return isBetter ? {backgroundColor: 'red'} : {backgroundColor: 'green'}
        return {better: isBetter}
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-shop-info {
    padding: $padding-vertical $padding-horizontal 0;
    margin-bottom: $padding-vertical;
    background-color: $color-light;
    header {
      display: flex;
      align-items: center;
      color: $color-black;
      img {
        margin-right: 10px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: $border;
      }
    }
    section {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-top: 10px;
      .total {
        flex: 1;
        display: flex;
        justify-content: space-around;
        text-align: center;
        border-right: $border;
        .count {
          margin-bottom: 10px;
          font-size: 18px;
          color: $color-black;
        }
        .desc {
          font-size: $size-middle;
        }
      }
      .score {
        flex: 1;
        table {
          margin-left: 30px;
          width: 120px;
          font-size: $size-middle;
          tr>td {
            position: relative;
            padding: 5px 0;
          }
          .score-icon {
            position: absolute;
            box-sizing: border-box;
            display: inline-block;
            
            padding: 4px;
            
            font-size: $size-small * 2;
            line-height: 1;
            color: $color-light;
            background-color: #4a4;
            border-radius: 50%;

            -webkit-transform-origin: 0 -18px;
            transform-origin: 0 -18px;
            -webkit-transform: scale(.5);
            transform: scale(.5);
          }
          .better {
            background-color: $color-main;
          }
        }
      }
    }
    footer {
      text-align: center;
      div {
        display: inline-block;
        text-align: center;
        font-size: $size-middle * 2;
        line-height: normal;
        
        padding: 10px 80px;
        background-color: $color-back;
        border-radius: 4px;
        transform: scale(.5);
      }
    }
  }
</style>
