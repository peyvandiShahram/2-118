<template>
  <transition name="modal-ui">
    <!-- <div v-show="show" class="modal-ui" @click="$emit('close')"> -->
    <div v-show="show" class="modal-ui">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  watch: {
    show(val) {
      const body = document.body;
      if (val) {
        body.classList.add("modal-open");
      } else {
        body.classList.remove("modal-open");
      }
    }
  },
  beforeDestroy() {
    const body = document.body;
    body.classList.remove("modal-open");
  }
};
</script>

<style lang="scss" scoped>
.modal-ui {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  transition: opacity 0.2s ease;
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  &-enter-active,
  &-leave-active {
    opacity: 0;
  }
  &-enter-active &-container,
  &-leave-active &-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

}
</style>
