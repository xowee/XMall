<template>
  <div class="background" v-show="$store.state.loading">
    <div class="ball-clip-rotate-pulse">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loader',
  }
</script>


<style lang="scss" scoped>
  .background {
    @include background;
    background-color: rgba(255, 255, 255, 0);
  }
  .ball-clip-rotate-pulse {
    position: relative;
    top: 50%;

    margin: -30px auto 0;

    width: 60px;
    height: 60px;

    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .2);
    div {
      position: absolute;
      top: 0px;
      left: 0px;

      border-radius: 100%;

      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    &>div:first-child {
      top: 22px;
      left: 22px;

      width: 16px;
      height: 16px;

      background: $color-main;

      -webkit-animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
      animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
    }
    &>div:last-child {
      position: absolute;
      top: 10px;
      left: 10px;

      width: 40px;
      height: 40px;

      background: transparent;
      // border: 2px solid $color-main;
      border: 2px solid;
      border-color: $color-main transparent $color-main transparent;

      -webkit-animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
      animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
    }
  }

  @-webkit-keyframes scale {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
    45% {
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
      opacity: 0.7;
    }
    80% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes scale {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
    45% {
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
      opacity: 0.7;
    }
    80% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg) scale(1);
      transform: rotate(0deg) scale(1);
    }
    50% {
      -webkit-transform: rotate(180deg) scale(0.6);
      transform: rotate(180deg) scale(0.6);
    }
    100% {
      -webkit-transform: rotate(360deg) scale(1);
      transform: rotate(360deg) scale(1);
    }
  }
</style>
