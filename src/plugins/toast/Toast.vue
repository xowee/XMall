<template>
  <transition>
    <div class="toast" v-if="visible">
      <p>{{message.msg}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Toast',
    data () {
      return {
        messages: [],
        message: {},
        visible: false,
        showing: false,
      }
    },
    methods: {
      showMessage (msg, time=1000) {
        this.messages.push({msg, time})
        // console.log(this.messages)
        if (!this.showing) {
          this.showing = true
          this.show ()
        }
        // setTimeout(() => this.visible = false, time)
      },
      show () {
        this.message = this.messages.shift()
        this.visible = true
        setTimeout(() => {
          this.visible = false
          if (this.messages.length) {
            setTimeout(() => this.show(), 200)
          } else {
            this.showing = false
          }
        }, this.message.time)
      }
    }
  }
</script>

<style scoped>
  .toast {
    display: flex;
    justify-content: center;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    
    height: 0;

    font-size: 14px;
    line-height: 14px;
  }
  p {
    position: absolute;
    bottom: 18vh;
    
    padding: 15px;
    
    background-color: #fff;
    
    border-radius: 12px;
    border: 0.3px solid rgba(127, 127, 127, 0.2);
    
    box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
  }
  .v-enter-active {
    transition: opacity .5s;
    animation: entery .3s;
  }
  .v-leave-active {
    transition: opacity .3s;
  }
  .v-enter, .v-leave-to {
    opacity: 0;
    transform: translateY(0);
  }
  @keyframes entery {
    0% {transform: translateY(40px) scale(.1);}
    80% {transform: translateY(-2px) scale(1.02);}
    100% {transform: translateY(0) scale(1);}
  }
</style>