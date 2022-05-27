<template>
    <div class="image-section">
        <v-row class="search-box">
            <v-col cols="7" style="padding:12px 2px">
                <v-text-field
                v-model="textSearch"
                label="جستجو"
                outlined
                hide-details="auto"
                dense
                height="30px"
                clearable
                />
            </v-col>
            <v-col cols="3" style="padding:12px 2px">
              <v-dialog
                transition="dialog-bottom-transition"
                max-width="500px"
                v-model="showModal"
              >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="yourCity.name"
                    label="شهر و استان"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    hide-details="auto"
                    clearable
                    height="30px"
                    dense
                    @click="getState"
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
            <v-col cols="2" style="padding:12px 2px">
              <div class="c-header-search__btn" @click="search">
                <i class="icon-search" />
              </div>
            </v-col>
          </v-row>
        <v-row class="edit" v-if="edit">
            <div  @click="editImage">ویرایش تصاویر</div>
            <v-icon size="25" color="#152d72">
                mdi-square-edit-outline
            </v-icon>
        </v-row>
        <CoverImg :cover="setCover" :key="setIndex" />
        <v-row>
            <v-sheet
                class="mx-auto"
                max-width="800px"
            >
                <v-slide-group
                    multiple
                    show-arrows
                >
                <v-slide-item
                    v-for="(image,index) in galery"
                    :key="index"
                >
                    <img class="small-image" @click="chengeCover(image.img)" :src="image.img" alt="">
                </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </v-row>
        <InfoCard                         
            :title="job.title"
            :tel="job.tel"
            :address="job.address"
            :website="job.website"
            :like="job.count_of_like"
            :id="$route.params.id"
            :edit="edit"
            v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
        />
        <v-row>
            <div class="business-context">
                {{about}}
            </div>
        </v-row>
    </div>
</template>

<script>
import InfoCard from '~/components/business/infoCard'
import AppImage from "~/components/job/edit/AppImage.vue";
import CoverImg from '~/components/business/coverImg'
    export default {
        name:'InfoImages',
        data() {
            return {
                open: false,
                index:0,
                textSearch: "",
                showModal: false,
                states: [],
                cities: [],
                yourCity: '',
                stateSearch: "",
                showCity: false,
            }
        },
        props: {
            cover: {
                type: String,
                require:true 
            },
            galery:{
                type: Array,
                require:true                 
            },
            about:{
                type: String,
                require:true                 
            },
            rating:{
                type: Number,
                require:true                 
            },
            group:{
                type:String,
                require:true
            },
            edit:{
                type:Boolean,
                require:true
            },
            id:{
                type:String,
                require:true
            },
            job:{
                type:Object,
                require:false
            }
        },
        components: {
            InfoCard,
            AppImage,
            CoverImg
        },
        methods: {
            editImage() {
                this.$router.push({ path: `/job/edit/${this.id}`, query: { step: 5 }})
            },
            chengeCover(url){
                this.cover=url
                this.index++
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
                    // console.log(this.cities)
                    this.showCity = true;
                    });
            },
            setCity(index) {
                this.$cookies.set("city", this.cities[index]);
                this.yourCity = this.$cookies.get("city");
                this.showModal = false;
             },
            search () {
                if (this.textSearch) {
                    this.$router.push({
                    path: `/search/?q=${this.yourCity.id}-${this.textSearch}`
                    })
                    setTimeout(()=>{
                    this.$router.go(this.$router.currentRoute)
                    },100)
                    
                } else {
                    this.$toast.global.msgSuccess({
                    message: 'متنی برای جستجو وارد نمایید'
                    })
                }
            },
        },
        computed: {
            setCover() {
                return this.cover 
            },
            setIndex(){
                return this.index
            }
        },
    }
</script>

<style lang="scss" scoped>
    .image-section{
        margin-top: 20px;
    }
    .image-container{
        border-radius: 20px;
        width: 100%;
        height: 300px;
        margin-bottom: 20px;
    }
    .small-image{
        border-radius: 20px;
        width: 150px;
        height: 100px;
        margin-right: 20px;
        cursor: pointer;
    }
    .business-context{
        margin: 20px 0;
    }
    .filters{
        color: #ff9900;
        font-weight: 500;
        font-size: 13px;
        margin-top: 15px;
    }
    .icon-container{
        border-radius: 50px;
        border:1px solid black;
        padding: 5px;
        margin-right: 10px;
    }
    .point{
        font-weight: 500;
        font-size: 15px;
    }
    .icons{
        display: flex;
        margin-top: 10px;
        
    }
    .edit{
        font-weight: 700;
        font-size: 17px;
        color: #152d72; 
        cursor: pointer;
        margin-bottom: 20px ;
    }
    @media only screen and (min-width: 690px){
        .search-box{
            display: none;
        }
    }
    @media only screen and (max-width: 600px){

        .image-section{
            margin-top: 20px;
        }
        .image-container{
            height: 180px;
        }
        .business-context{
            font-size: 12px;
        }
        .small-image{
            border-radius: 15px;
            width: 120px;
            height: 80px;
            margin-right: 5px;
        }
        .filters{
            font-size: 10px;            
        }
        .icons{
            padding: 0 12px 10px 12px;
            margin-top: 0;
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
    .c-modal-useCity__search {
        border: solid 1px $border-color;
        border-radius: $bradius;
        width: 100%;
        padding: 4px;
    }
    .c-header-search__btn {
        background: #142d73;
        padding: 5px;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
        i {
            color: #fff;
            font-size: 19px;
            margin-top: 5px;
        }
    }
</style>