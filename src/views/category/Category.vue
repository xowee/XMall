<template>
  <div id="category">
    <category-nav-bar></category-nav-bar>
    <section>
      <category-side-bar :categorys="categorys" @liClick="showSubCategory"></category-side-bar>
      <category-sublist :sub-categorys="subCategorys"></category-sublist>
    </section>
  </div>
</template>

<script>
  import CategoryNavBar from './childComponents/CategoryNavBar.vue'
  import CategorySideBar from './childComponents/CategorySideBar.vue'
  import CategorySublist from './childComponents/CategorySublist.vue'

  import {getCategory, getSubcategory} from 'network/category.js'

  export default {
    name: 'Category',
    components: {
      CategoryNavBar,
      CategorySideBar,
      CategorySublist,
    },
    data () {
      return {
        categorys: [],
        subCategorys: [],
      }
    },
    created () {
      getCategory().then((res) => {
        this.categorys = res.data.category.list
        return getSubcategory(this.categorys[0].maitKey)
      }).then((res) => {
        this.subCategorys = res.data.list
      })
    },
    activated () {
      this.$store.commit('setLoading', false)
    },
    methods: {
      showSubCategory ({maitKey}) {
        getSubcategory(maitKey).then((res) => {
          this.subCategorys = res.data.list
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  #category {
    @include fill-viewport;
    &>section {
      display: flex;
      height: calc(100% - 44px);
      .category-detail {
        flex: 1;
        background-color: #fff;
      }
    }
  }
</style>
