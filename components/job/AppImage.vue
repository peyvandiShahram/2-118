<template>
  <div>
    <AppBox step="5" title="تصاویر کسب و کار">
      <v-col lg="9" cols="12" class="c-job-upload__image">
        <div class="c-job_form">
          <v-row>
            <v-col lg="6" cols="12">
              <h3>لوگو</h3>
              <p>لوگوی کسب و کار خود را میتوانید از این بخش ارسال نمایید</p>
              <div class="text-center">
                <button class="c-job-file" @click="$refs.logo.click()">
                  <img src="~assets/img/import_camera.svg" width="75px" />
                  <div>آپلود تصویر مورد نظر</div>
                </button>
                <input
                  v-show="false"
                  ref="logo"
                  type="file"
                  @change="handleLogoUpload()"
                />

                {{
                  filesUploadedMessages.logo.length >= 1 ? "لوگو اپلود شد" : ""
                }}
              </div>
            </v-col>
            <v-col lg="6" cols="12">
              <h3>تصاویر کسب و کار</h3>
              <p>تصاویری از کسب و کار خود ارسال نمایید</p>
              <div class="text-center">
                <button class="c-job-file" @click="$refs.slider.click()">
                  <img src="~assets/img/import_camera.svg" width="75px" />
                  <div>آپلود تصویر مورد نظر</div>
                </button>
                <input
                  v-show="false"
                  ref="slider"
                  type="file"
                  multiple
                  @change="handleSliderUpload()"
                />
                {{ checkImgLength }}
              </div>
            </v-col>
            <v-col lg="6" cols="12">
              <h3>کاور کسب و کار</h3>
              <p>یک کاور از محل کسب و کار خود ارسال نمایید</p>
              <div class="text-center">
                <button class="c-job-file" @click="$refs.cover.click()">
                  <img src="~assets/img/import_camera.svg" width="75px" />
                  <div>آپلود تصویر مورد نظر</div>
                </button>
                <input
                  v-show="false"
                  ref="cover"
                  type="file"
                  @change="handleCoverUpload()"
                />
                {{
                  filesUploadedMessages.cover.length >= 1 ? "کاور اپلود شد" : ""
                }}
              </div>
            </v-col>
            <v-col lg="6" cols="12">
              <h3>تصویر 360درجه</h3>
              <p>تصاویر ۳۶۰ درجه محیط کسب و کار خود را ارسال نمایید</p>
              <div class="text-center">
                <button class="c-job-file" @click="$refs.rotate.click()">
                  <img src="~assets/img/import_360.svg" width="75px" />
                  <div>آپلود تصویر مورد نظر</div>
                </button>
                <input
                  v-show="false"
                  ref="rotate"
                  type="file"
                  multiple
                  @change="handlerotateUpload()"
                />
                {{
                  filesUploadedMessages.rotate.length >= 1
                    ? "تصویر ۳۶۰ درجه اپلود شد"
                    : ""
                }}
              </div>
            </v-col>
          </v-row>
        </div>
        <br />
        <v-btn color="primary" class="btn-job" @click="checkIfFilesUploaded">
          <v-icon medium> mdi-chevron-right </v-icon>
          ثبت و ادامه
        </v-btn>
        <br /><br />
      </v-col>
    </AppBox>
  </div>
</template>

<script>
import AppBox from "~/components/job/AppBaseForm";

export default {
  components: {
    AppBox
  },
  data() {
    return {
      sliderItemLength: 0,
      files: {
        logo: "",
        cover: "",
        slider: [],
        rotate: []
      },
      filesUploaded: {
        logo: false,
        cover: false,
        slider: false,
        rotate: false
      },
      filesUploadedMessages: {
        logo: "",
        cover: "",
        slider: "",
        rotate: ""
      }
    };
  },
  // watch: {
  //   filesUploaded: {
  //     handler: "checkIfFilesUploaded",
  //     deep: true
  //   }
  // },
  computed: {
    user() {
      this.$store.dispatch('fetchUser')
      return this.$store.getters.getUser;
    },

    checkImgLength() {
      if (this.sliderItemLength === 1) {
        return "تصویر اول اپلود شد";
      } else if (this.sliderItemLength === 2) {
        return "تصویر دوم اپلود شد";
      } else if (this.sliderItemLength === 3) {
        return "تصویر سوم اپلود شد";
      } else if (this.sliderItemLength === 4) {
        return "تصویر اخر اپلود شد";
      }
    }
  },
  methods: {
    checkIfFilesUploaded() {
      this.$toast.global.msgSuccess({
        message: "تصاویر با موفقیت اپلود شد"
      });

      setTimeout(() => {
        this.$router.push("/profile/my-jobs");
      }, 500);
      

      
    },
    handleLogoUpload() {
      let size = this.$refs.logo.files[0]
        ? (this.$refs.logo.files[0].size / 1024 / 1024).toFixed(2)
        : "";
      if (size > 0.05) {
        size = "";
        this.$toast.global.msgError({
          message: "حجم فایل باید کمتر از 50 کلیوبایت باشد"
        });
        return;
      } else if (size && size.length >= 1) {
        this.files.logo = this.$refs.logo.files[0];
        let fileExt = this.$refs.logo.files[0].name
          .split(".")
          .pop()
          .toLowerCase();
        if (fileExt === "jpg" || fileExt === "png" || fileExt === "jpeg") {
          this.uploadLogo();
        } else {
          this.$toast.global.msgError({
            message: "فرمت عکس نامعتبر است"
          });
          return;
        }
      }
    },
    handleCoverUpload() {
      let size = this.$refs.cover.files[0]
        ? (this.$refs.cover.files[0].size / 1024 / 1024).toFixed(2)
        : "";
      if (size >1) {
        size = "";
        this.$toast.global.msgError({
          message: "حجم فایل باید کمتر از 1 مگابایت باشد"
        });
        return;
      } else if (size && size.length >= 1) {
        this.files.cover = this.$refs.cover.files[0];

        let fileExt = this.$refs.cover.files[0].name
          .split(".")
          .pop()
          .toLowerCase();
        if (fileExt === "jpg" || fileExt === "png" || fileExt === "jpeg") {
          this.uploadCover();
        } else {
          this.$toast.global.msgError({
            message: "فرمت عکس نامعتبر است"
          });
          return;
        }
      }
    },
    handleSliderUpload() {
      let size = this.$refs.slider.files[0]
        ? (this.$refs.slider.files[0].size / 1024 / 1024).toFixed(2)
        : "";
      if (size > 0.5) {
        size = "";
        this.$toast.global.msgError({
          message: "حجم فایل باید کمتر از500 کیلوبایت باشد"
        });
        return;
      } else if (size && size.length >= 1) {
        this.files.slider = this.$refs.slider.files;

        let fileExt = this.$refs.slider.files[0].name
          .split(".")
          .pop()
          .toLowerCase();
        if (fileExt === "jpg" || fileExt === "png" || fileExt === "jpeg") {
          this.uploadSliders();
        } else {
          this.$toast.global.msgError({
            message: "فرمت عکس نامعتبر است"
          });
          return;
        }
      }
    },
    handlerotateUpload() {
      let size = this.$refs.rotate.files[0]
        ? (this.$refs.rotate.files[0].size / 1024 / 1024).toFixed(2)
        : "";
      if (size > 1) {
        size = "";
        this.$toast.global.msgError({
          message: "حجم فایل باید کمتر از1 مگابایت باشد"
        });
        return;
      } else if (size && size.length >= 1) {
        this.files.rotate = this.$refs.rotate.files;

        let fileExt = this.$refs.rotate.files[0].name
          .split(".")
          .pop()
          .toLowerCase();
        if (fileExt === "jpg" || fileExt === "png" || fileExt === "jpeg") {
          this.uploadRotationImages();
        } else {
          this.$toast.global.msgError({
            message: "فرمت عکس نامعتبر است"
          });
          return;
        }
      }

      // https://serversideup.net/uploading-files-vuejs-axios/
    },

    //
    uploadLogo() {
      const formData = new FormData();
      formData.append("bill_0", this.files.logo);
      formData.append("office_user_id", this.$route.params.id);
      formData.append("token", this.user.token);
      this.$nuxt.$loading.start();
      this.$axios
        .post("/update_office_logo", formData, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
          },
          data: {
            token: this.user.token,
            office_user_id: this.$route.params.id
          }
        })
        .then((res)=> {
          this.$nuxt.$loading.finish();
          this.filesUploadedMessages.logo = "لوگو با موفقیت آپلود شد";
        })
        .catch((err) =>{
          console.log(err)
          this.$nuxt.$loading.finish();
          this.$toast.global.msgError({
            message: "خطلا در ارتباط لطفا دوباره تلاش کنید"
          })
        });
    },
    uploadCover() {

      const formData = new FormData();
      formData.append("bill_1", this.files.cover);
      formData.append("office_user_id", this.$route.params.id);
      formData.append("token", this.user.token);
      this.$nuxt.$loading.start();
      this.$axios
        .post("/update_office_cover", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(()=> {
          this.$nuxt.$loading.finish();
          this.filesUploadedMessages.cover = "کاور با موفقیت آپلود شد";
        })
        .catch((err) =>{
          console.log(err)
          this.$nuxt.$loading.finish();
          this.$toast.global.msgError({
            message: "خطلا در ارتباط لطفا دوباره تلاش کنید"
          })
        });
    },
    uploadSliders() {
      const formData = new FormData();
      for (let i = 0; i < this.files.slider.length; i++) {
        const file = this.files.slider[i];
        formData.append("bill_" + i + "", file);
      }
      formData.append("office_user_id", this.$route.params.id);
      formData.append("token", this.user.token);
      if (this.sliderItemLength <= 3) {
        this.$nuxt.$loading.start();
        this.$axios
          .post("/add_office_galery", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then((res)=> {
            this.sliderItemLength++;
            this.$nuxt.$loading.finish();
            this.filesUploadedMessages.slider = res.data[0].message;
          })
          .catch((err) =>{
            console.log(err)
            this.$nuxt.$loading.finish();
            this.$toast.global.msgError({
              message: "خطلا در ارتباط لطفا دوباره تلاش کنید"
            })
          });
      }
    },
    uploadRotationImages() {
      const formData = new FormData();
      for (let i = 0; i < this.files.rotate.length; i++) {
        const file = this.files.rotate[i];
        formData.append("bill_" + i + "", file);
      }
      formData.append('office_user_id', this.$route.params.id)
      formData.append('token', this.user.token)
      this.$nuxt.$loading.start();
      this.$axios
        .post(
          "/add_office_360",
          formData,
          {
            token: this.user.token,
            office_user_id: this.$route.params.id
          },
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then((res)=> {
          this.$nuxt.$loading.finish();
          this.filesUploadedMessages.rotate = "لوگو با موفقیت اپلود شد";
          console.log(res);
        })
        .catch((err) =>{
          console.log(err)
          this.$nuxt.$loading.finish();
          this.$toast.global.msgError({
            message: "خطلا در ارتباط لطفا دوباره تلاش کنید"
          })
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.c-job-upload__image {
  margin: 10px auto;
}
.c-job_form {
  background: #fff;
  padding: 15px;
  border-radius: $bradius;
  border: solid 1px $border-color;
  margin-bottom: 15px;
  margin-top: 10px;
}

.c-job-file {
  width: 150px;
  height: 150px !important;
  margin: 0px auto;
  border: solid 4px $primary;
  border-radius: $bradius;
  background: #fff !important;
}
</style>
