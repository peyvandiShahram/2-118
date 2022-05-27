<template>
  <div class="c-footer__link">
    <span class="c-footer__title">{{ title }}</span>
    <ul class="mt-4">
      <li v-for="item in list" :key="item.i">
        <nuxt-link :to="item.link">
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.c-footer__link {
    text-align: center;
    .c-footer__title {
        font-size: 20px;
        font-weight: bold;
        color: $primary;
    }
    li {
        line-height: 2;
        a   {
            font-size: 14px;
            color: $text-color !important;
        }
    }
}
</style>
