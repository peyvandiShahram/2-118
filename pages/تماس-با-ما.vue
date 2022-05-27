<template>
  <v-col lg="8" cols="12" class="c-contact">
    <div class="c-contact-title">
      <div class="pa-4">
        <h3>
          تماس با ما
        </h3>
        <h4>شما می‌توانید از این درگاه با ما تماس بگیرید و سؤالات خود را مطرح کنید</h4>
      </div>
    </div>
    <div class="c-contact-form">
      <v-row>
        <v-col lg="6" cols="12">
          <v-text-field
            v-model="form.subject"
            label="موضوع"
            outlined
            dense
          />
        </v-col>
        <v-col lg="6" cols="12">
          <v-text-field
            v-model="form.name"
            label="نام و نام خانوادگی"
            outlined
            dense
          />
        </v-col>
        <v-col lg="6" cols="12">
          <v-text-field
            v-model="form.email"
            label="ایمیل"
            outlined
            dense
            hint="example@gmail.com"
          />
        </v-col>
        <v-col lg="6" cols="12">
          <v-text-field
            v-model="form.phone"
            label="تلفن تماس"
            outlined
            dense
            hint="09122222222"
          />
        </v-col>
        <v-col lg="12">
          <v-textarea
            v-model="form.body"
            label="متن پیام شما"
            outlined
            dense
            hint="متن پیام شما"
          />
        </v-col>
      </v-row>
      <div class="text-left">
        <v-btn color="primary" @click="sendForm()">
          ثبت و ارسال
        </v-btn>
      </div>
    </div>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      form: {
        subject: '',
        name: '',
        email: '',
        phone: '',
        body: ''
      }
    }
  },
  methods: {
    sendForm () {
      this.$axios.post('/', {
        subject: this.subject,
        name: this.name,
        email: this.email,
        phone: this.phone,
        body: this.body
      })
        .then((res) => {
          if (res.data[0].res === 1) {
            this.$toast.global.msgSuccess({
              message: 'پیام شما با موفقیت ارسال شد'
            })
            this.name = ''
            this.email = ''
            this.phone = ''
            this.body = ''
          } else {
            this.$toast.global.msgError({
              message: res.data[0].msg
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.c-contact {
    background: #ffffff;
    padding-top: 70px;
    padding-bottom: 50px;
    border-radius: $bradius;
    margin: 20px auto;
    .c-contact-title {
        border-bottom: solid 2px $border-color;
    }
    .c-contact-form {
      padding: 15px;
    }
}
@media only screen and (max-width: 960px){
    .c-contact{
        padding-top: 0px;
    }
}
</style>
