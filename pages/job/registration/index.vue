<template>
  <div>
    <AppBox step="1" title="" description="">
      <v-col lg="9" class="c-submit-job">
        <v-row>
          <v-col lg="6" cols="12">
            <jobInfo />
          </v-col>
          <v-col lg="1" />
          <v-col lg="5" cols="12">
            <Tips />
          </v-col>
        </v-row>
      </v-col>
    </AppBox>
  </div>
</template>

<script>
import AppBox from '~/components/job/AppBaseForm'
import Tips from '~/components/job/AppTips.vue'
import jobInfo from '~/components/job/AppForm.vue'
export default {
  middleware: ['checkAuth','isAuthenticated'],
  components: {
    AppBox,
    Tips,
    jobInfo
  },
  data () {
    return {
      description: 'کاربر گرامی فرم هایی که داری علامت(*) هستند اجباری بوده و عدم تکمیل آنان باعث ثبت نشدن کسب و کار شما خواهد شد با تکمیل تمامی اطلاعات شانس خود را برای بیشتر دیده شدن افزایش خواهید داد'

    }
  }
}
</script>

<style lang="scss" scoped>
.c-submit-job {
    margin: 0px auto;
}
</style>
