<template>
  <div class="reg-container">
    <Stepper :step="step" />
    <v-col lg="9" class="c-job-box__title">
      <div>
        <h3>{{ title }}</h3>
        <p v-if="description != null" class="c-job-box__description mt-2">
          {{ description }}
        </p>
      </div>
    </v-col>
    <slot />
  </div>
</template>

<script>

import Stepper from '~/components/AppStepper.vue'

export default {
  components: {
    Stepper
  },
  props: {
    step: {
      default: null,
      type: String
    },
    title: {
      default: null,
      type: String
    },
    description: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.c-job-box__title {
    margin: 10px auto 0px auto;
    padding-bottom: 0px !important;
    .c-job-box__description {
      font-weight: bold;
    }
}
.reg-container{
  margin-top: 120px;
}
@media only screen and (max-width: 600px) {
  .reg-container{
    margin-top: 10px;
  }
}
</style>
