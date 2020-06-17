<template>
  <div class="confirm">
    <fade>
      <div ref="background" class="background" v-show="visible" @click.stop=""></div>
    </fade>
    <fade>
      <div class="message" v-show="visible">
        <div class="message-detail">
          <slot></slot>
        </div>
        <div>
          <div ref="cancel" class="cancel" v-if="cancelVisible" @click.stop="">取消</div>
          <div ref="sure" class="sure" @click.stop="">确定</div> 
        </div>
      </div>
    </fade>
  </div>
</template>

<script>
  import {Fade} from 'common/transition/index.js'
  export default {
    name: 'Confirm',
    components: {
      Fade,
    },
    data () {
      return {
        visible: false,
      }
    },
    props: {
      message: {
        type: String,
        default: '您确定吗？'
      },
      cancelVisible: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      show () {
        this.visible = true
        let result = new Promise((resolve, reject) => {
          this.$refs.sure.addEventListener('click', () => {
            this.visible = false
            resolve('点击了确定')
          })
          if (this.cancelVisible) {
            this.$refs.cancel.addEventListener('click', () => {
              this.visible = false
              reject('点击了取消')
            })
          }
          this.$refs.background.addEventListener('click', () => {
            this.visible = false
            reject('点击了背景')
          })
        })
        return result
      },
    },
  }
</script>

<style lang="scss" scoped>
  .confirm {
    position: absolute;
    width: 100%;
    .background {
      @include background;
    }
    .message {
      position: fixed;
      top: 50vh;
      left: 15vw;

      width: 70vw;
      background-color: #fff;
      border-radius: 2px;
      &>div:first-of-type {
        padding: 15px;
        border-bottom: $border;
        font-size: $size-middle;
        line-height: 20px;
        text-align: center;
      }
      &>div:last-of-type {
        display: flex;
        font-size: $size-normal;
        text-align: center;
        .cancel, .sure {
          flex: 1;
          line-height: 40px;
          font-weight: 600;
        }
        .cancel {
          border-right: $border;
        }
        .sure {
          color: $color-main;
        }
      }
    }
  }
</style>
