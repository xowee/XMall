<template>
  <div class="good-list">
    <div class="left-column">
      <good-list-item 
        v-for="(item, index) in leftColumns" 
        :key="index" 
        :good="item" 
        @goodImgLoaded="goodImgLoaded">
      </good-list-item>
    </div>
    <div class="right-column">
      <good-list-item 
        v-for="(item, index) in rightColumns" 
        :key="index" 
        :good="item" 
        @goodImgLoaded="goodImgLoaded">
      </good-list-item>
    </div>
  </div>
</template>

<script>
  import GoodListItem from './GoodListItem.vue'

  export default {
    name: 'GoodList',
    components: {
      GoodListItem,
    },
    props: {
      goodList: {
        default () {
          return []
        }
      },
    },
    data () {
      return {  
        leftColumns: [],
        rightColumns: [],
        currentIndex: 0
      }
    },
    watch: {
      goodList: function (val) {
        // 切割出新增的数组
        const tempList = val.slice(this.currentIndex)
        
        this.currentIndex = val.length

        // 平均分配给左右两列
        const length = tempList.length
        const leftLength = length / 2
        const rightLength = length - leftLength
        this.leftColumns.push(...tempList.slice(0, leftLength))
        this.rightColumns.push(...tempList.slice(leftLength, leftLength + rightLength))
      },
    },
    methods: {
      initColList () {
        this.currentIndex = 0
        this.leftColumns = []
        this.rightColumns = []
      },
      goodImgLoaded () {
        this.$emit('goodImgLoaded')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  @mixin column {
    margin-top: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .left-column {
    @include column;
    align-items: flex-start;
  }
  .right-column {
    @include column;
    align-items: flex-end;
  }
</style>