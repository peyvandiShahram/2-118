<template>
  <div class="search-container" >
    <div class="c-search">
      <v-row >
        <v-col cols="8" md="8" style="padding:5px">
          <v-text-field
            v-model="textSearch"
            label="نام مشاغل، کسب و کارها و..."
            outlined
            hide-details="auto"
            clearable
            dense
            prepend-inner-icon="mdi-magnify"
          />
        </v-col>
        <v-col cols="4" md="4" style="padding:5px">
          <v-dialog
            transition="dialog-bottom-transition"
            max-width="500px"
            v-model="showModal"
            style="z-index: 1000000000"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="yourCity.name"
                label="استان و شهر"
                outlined
                v-bind="attrs"
                v-on="on"
                hide-details="auto"
                clearable
                dense
                readonly
                @click="getState()"
                prepend-inner-icon="mdi-map-marker-radius"
              />
            </template>
              <v-card class="c-modal-useCity">
                <v-card-text>
                  <div v-if="showCity == false">
                    <h4>انتخاب استان</h4>
                    <ul>
                      <li
                        v-for="(state, index) in states"
                        :key="state.i"
                        @click="sendState(index)"
                      >
                        {{ state.name }}
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <h4>انتخاب شهر</h4>
                    <ul>
                      <li
                        v-for="(city, index) in cities"
                        :key="city.i"
                        @click="setCity(index)"
                      >
                        {{ city.name }}
                      </li>
                    </ul>
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @close="showModal = false"
                  >بستن</v-btn>
                </v-card-actions>
              </v-card>
        </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col  cols="8" @click="search" style="padding:5px">
          <v-btn class="c-search__btn" color="primary" block>
            نام مشاغل یا کسب و کار
          </v-btn>
        </v-col>
        <v-col cols="4" style="padding:5px">
          <v-btn
            outlined
            class="c-search__btn"
            block
            color="primary"
            @click="advanceSearch"
          >
            <i class="icon-sliderhorizontal" />
            <div v-if="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm">جست و جو پیشرفته</div>
          </v-btn>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      textSearch: '',
      yourCity: '',
      showCity: false,
      showModal: false,
      states: [],
      cities: [],
    }
  },
  methods: {
    search () {
      if (this.textSearch) {
        this.$router.push({
          path: `/search/?q=${this.yourCity.id}-${this.textSearch}`
        })
      } else {
        this.$toast.global.msgSuccess({
          message: 'متنی برای جستجو وارد نمایید'
        })
      }
    },
    advanceSearch() {
      this.$router.push({
        path: '/advance-search'
      })
    },
    getState() {
    this.$nuxt.$loading.start();
    this.showCity = false;
    this.showModal = true;
    this.$axios.post("list_of_state").then(res => {
        this.states = res.data;
        this.$nuxt.$loading.finish();
    });
    },
    sendState(index) {
    this.$axios
        .post("list_state_city", {
        id: index + 1
        })
        .then(res => {
        this.cities = res.data[0].city;
        this.showCity = true;
        });
    },
    setCity(index) {
    this.$cookies.set("city", this.cities[index]);
    this.yourCity = this.$cookies.get("city");
    this.showModal = false;
    },
  }
}
</script>

<style lang="scss" scoped>
  .c-modal-useCity {
    background: #fff;
    border-radius: $bradius2;
    padding: 20px;
    box-shadow: $bshadow2;
    ul {
        max-height: 400px;
        overflow-y: scroll;
        li {
        padding: 10px;
        border-bottom: solid 1px $border-color;
        cursor: pointer;
        }
    }
  }
  .c-modal-useCity {
    position: relative;
    background: #fff;
    border-radius: $bradius2;
    padding: 20px;
    box-shadow: $bshadow2;
    ul {
        max-height: 400px;
        overflow-y: scroll;
        li {
        padding: 10px;
        border-bottom: solid 1px $border-color;
        cursor: pointer;
        }
    }
    i {
        position: absolute;
        left: 20px;
        cursor: pointer;
    }
  }
.c-search {
    background: #fff;
    box-shadow: $bshadow2;
    border-radius: $bradius2;
    margin: 30px 20px 0px 20px;
    padding: 20px;
    font-size: 19px;
    i {
      font-size: 19px;
      margin-left: 5px;
      font-weight: 700;
    }

}
@media only screen and (min-width: 900px){
  .search-container{
    display: flex;
    justify-content: center;
  }
  .c-search{
    top: 290px;
    z-index: 10;
    position: absolute;
    padding: 20px 56px;
  }

}
// @media only screen and (min-width:1100px){
//   .c-search  {
//     left:27%;
//     top: 290px;
//     z-index: 10;
//     position: absolute;
//     padding: 20px 56px;
//   }
// }

@media only screen and (max-width: 900px) {
  .c-search{
    margin: 5px 100px 0 100px;
  }

}
@media only screen and (max-width: 700px) {
  .c-search{
    margin:10px 15px 0 15px;
  }

}

// @media only screen and (min-width: 700px) {
//   .c-search  {
//     top: 380px;
//     left:8%;
//     z-index: 10;
//     position: absolute;
//     padding: 20px 56px;
//   }
// }

.c-search__btn{
  border: 2px solid #152d72;
}
</style>
