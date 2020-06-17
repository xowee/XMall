<template>
  <div class="detail-param-info">
    <header>商品参数</header>
    <table>
      <tr v-for="(row, index) in paramInfo.sizes" :key="index">
        <td v-for="(col, index) in row" :key="index">{{col}}</td>
      </tr>
    </table>
    <table>
      <tr v-for="(row, index) in paramInfo.infos" :key="index">
        <td class="param-key">{{row.key}}</td>
        <td class="param-value">{{row.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'DetailParamInfo',
    props: {
      paramInfo: {
        type: Object,
        default () {
          return {}
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-param-info {
    padding: $padding-vertical $padding-horizontal;
    margin-bottom: $padding-vertical;
    background-color: $color-light;
    &>header {
      padding: 10px 0;
      color: $color-black;
      border-bottom: $border;
    }
    table {
      width: 100%;
      font-size: $size-middle;
      
      border-collapse: collapse;
      tr {
        td {
          border-bottom: $border;
          padding: 10px 10px 10px 0;
        }
        &>td:first-of-type {
          white-space: nowrap;
          color: $color-black;
          padding-right: 20px;
        }
        .param-key {
          width: 95px;
        }
        .param-value {
          color: $color-main;
        }
      }
    }
    table:nth-of-type(2) {
      border-top: $border;
    }
  }
</style>
