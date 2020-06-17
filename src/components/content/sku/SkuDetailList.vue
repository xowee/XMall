<template>
  <div class="sku-detail-list">
    <header>{{prop.label}}</header>
    <div class="list">
      <span v-for="item in prop.list" :key="item.index" 
            @click="itemClick(item)"
            :class="{active: isActive(item), disable: item.stock === 0}">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'SkuDetailList',
  computed: {
    ...mapGetters(['skuTypeIndex'])
  },
  props: {
    prop: {
      type: Object,
      defult () {
        return {}
      }
    }
  },
  methods: {
    itemClick (item) {
      if (item.index === this.skuTypeIndex(item.type)) {
        this.$store.dispatch('setSkuSelects', {index: -1, name: '', type: item.type})
      } else {
        this.$store.dispatch('setSkuSelects', item)
      }
    },
    isActive ({index, type}) {
      return this.skuTypeIndex(type) === index ? true : false
    }
  }
}
</script>

<style lang="scss" scoped>
  .sku-detail-list {
    font-size: 14px;
    line-height: 14px;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  header {
    text-align: left;
    padding: 14px 0;
    font-size: 16px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
  span {
    /* width: 100%; */
    padding: 10px 10px 10px 10px;
    margin: 0 10px 10px 0;
    font-size: 14px;
    line-height: 14px;
    border-radius: 4px;
    border: 1px solid #eee;
    background-color: #eee;
    text-align: left;
  }
  .active {
    border-color: $color-main;
    color: $color-main;
  }
</style>