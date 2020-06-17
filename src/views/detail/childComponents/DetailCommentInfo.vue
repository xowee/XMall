<template>
  <div class="detail-comment-info">
    <header>
      <span>用户评价</span>
      <span>更多<span class="arrow-right"></span></span>
    </header>
    <section v-if="visible">
      <header>
        <img :src="avatar">
        <span>{{uname}}</span>
      </header>
      <article>
        {{commentInfo.content}}
      </article>
      <footer>
        {{commentDate}}
        {{commentInfo.style}}
      </footer>
      <ul>
        <li v-for="(img, index) in commentInfo.images" :key="index">
          <img :src="img">
        </li>
      </ul>
    </section>
    <div v-else class="no-comment">
      还没有人评价~
    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/common/utils.js'

  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      commentDate () {
        return formatDate(new Date(this.commentInfo.created * 1000), 'yyyy-MM-dd')
      },
      avatar () {
        return this.commentInfo.user ? this.commentInfo.user.avatar : ''
      },
      uname () {
        return this.commentInfo.user ? this.commentInfo.user.uname : ''
      },
      visible () {
        return JSON.stringify(this.commentInfo) === '{}' ? false : true
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-comment-info {
    padding: 0 $padding-horizontal $padding-vertical;
    margin-bottom: 15px;
    background-color: $color-light;
    &>header {
      height: 50px;
      line-height: 50px;
      border-bottom: $border;
      &>span:first-child {
        float: left;
        font-size: $size-normal;
        color: $color-black;
      }
      &>span:nth-child(2) {
        float: right;
        font-size: $size-middle;
        position: relative;
        right: 10px;
      }
    }
    section {
      &>header {
        padding: 10px 0 0 0;
        img{
          height: 42px;
          width: 42px;
          border-radius: 50%;
          margin-right: 8px;
        }
        span{
          position: relative;
          top: -15px;
        }
      }
      article {
        padding: 10px 0;
        font-size: $size-middle;
        line-height: 1.5;
        // color: $color-normal;
      }
      footer {
        font-size: $size-small;
        color: $color-hint;
        // margin-bottom: 10px;
      }
      ul {
        display: flex;
        // padding-bottom: 10px;
        list-style: none;
        // background-color: black;
        li>img {
          display: block;
          margin-right: 6px;
          margin-top: 10px;
          height: 70px;
          box-shadow: 0 0 6px rgba(0, 0, 0, .2);
        }
      }
    }
    .no-comment {
      padding: 30px;
      text-align: center;
    }
  }
</style>
