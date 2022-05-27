<template>
    <div class="advance-search">
        <v-row>
            <v-col cols="6" :style="showMapContainer" >
                <div class="map-container">
                    <div id="mapId"></div>
                </div>
            </v-col>
            <v-col cols="12" md="6" style="padding-left:30px">
                <v-card class="card-filter" :class="checkScrolling" >
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                dense
                                placeholder="دنبال چی می گردی؟"
                                outlined
                                hide-details="auto"
                                clearable
                                append-icon="mdi-magnify"
                                background-color="#fff"
                                v-model="text"
                            />
                        </v-col>
                        <v-col cols="6" >
                            <v-dialog
                                transition="dialog-bottom-transition"
                                max-width="500px"
                                v-model="showModal"
                                style="z-index: 1000000000"
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
                            dense
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
                        <v-col cols="6" md="8" style="padding:12px">
                            <v-select
                                :items="items"
                                label="همه ی دسته بندی ها"
                                outlined
                                background-color="#fff"
                                dense
                                v-model="selectedItem"
                            ></v-select>
                        </v-col>
                        <v-col  cols="12" md="4" @click="search" style="padding:5px">
                            <v-btn class="c-search__btn" color="primary" block>
                            جست و جو
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row
                        v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
                        justify="center"
                        style="padding:0 10px 15px 10px;margin-top:-20px"
                    >
                        <v-expansion-panels accordion >
                        <v-expansion-panel>
                            <v-expansion-panel-header
                                expand-icon="mdi-plus"
                                @click="createMap('map2')"
                            >
                                نقشه
                            </v-expansion-panel-header>
                            <v-expansion-panel-content >
                                <v-row style="padding:0 20px">
                                    <div id="map2"></div>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        </v-expansion-panels>
                    </v-row>
                </v-card>
                <v-row v-if="result.length>0" style="padding:20px 20px 0">
                    {{result.length}} نتیجه یافت شد
                </v-row>
                <v-row style="padding-left:20px;min-height:650px">
                    <v-col
                        cols="12"
                        md="6"
                        style="padding:0 12px"
                        v-for="(item,index) in result"
                        :key="index"
                    >
                        <div
                            class="card-container"
                            v-if="show(index) || showMore"
                        >
                            <nuxt-link :to="'/business/' + item.office_id">
                                <v-card
                                    rounded
                                >
                                    <v-img
                                        class="card-img"
                                        :src="item.logo"
                                    >
                                    </v-img>
                                    <div class="tab-logo">
                                        <v-icon color="#fff" size="30">
                                            mdi-heart-outline
                                        </v-icon>
                                    </div>
                                    <v-card-title style="color:#152d72;padding:8px 16px" >{{item.title}}</v-card-title>
                                    <v-card-text style="padding:5px 16px">
                                    <div style="height:50px">{{aboutJob(item.about)}}</div>
                                    </v-card-text>
                                    <v-chip-group style="margin-bottom:10px">
                                        <div class="filter-tag" >{{item.group_title}}</div>
                                    </v-chip-group>
                                    <v-row style="padding:0 16px 16px" >
                                        <v-icon color="#db3a3c">mdi-map-marker</v-icon>
                                        {{item.address}}
                                    </v-row>
                                </v-card>
                            </nuxt-link>
                        </div>
                    </v-col>
                </v-row>
                <v-row v-if="result.length>7">
                    <div class="showMore" @click="showMore= !showMore">
                        <p v-if="showMore">نمایش کمتر</p>
                        <p v-else style="margin-top:-70px">نمایش بیشتر</p>
                    </div>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import geolocation from 'geolocation'
    export default {
        data: () => ({
            items: [],
            groups:[],
            scroll:null,
            selectedItem:'',
            yourCity: '',
            showCity: false,
            showModal: false,
            states: [],
            cities: [],
            text:'',
            result:[],
            map:null,
            showMore:false,
        }),
        methods: {
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
            async fetchItems(){
                try {
                    const data = await this.$axios.$post('list_of_office_groups')
                    data.forEach(element => {
                        this.items.push(element.title)
                        this.groups.push({
                            name:element.title,
                            id:element.id
                        })
                    });
                } catch (error) {
                    console.log(error)
                }

            },
            async search(){
                this.$nuxt.$loading.start();
                const job=this.groups.find(elm=>elm.name===this.selectedItem)
                try {
                    const data= await this.$axios.$post('advance_search_customer',{
                        group_id:job.id,
                        city_id:this.yourCity.id,
                        title:this.text
                    })
                    this.result=data

                    if(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
                        this.createMap('map2')
                    else
                        this.createMap('mapId')


                    await  data.forEach(element => {
                            this.createMarker(element.latetiud,element.longetiud)
                        });


                    this.$nuxt.$loading.finish();
                } catch (error) {
                    this.$nuxt.$loading.finish();
                    console.log(error)

                }
            },
            createMap(mapContiner){
                    if (this.map) {
                        this.map.off();
                        this.map.remove();
                    }
                   return setTimeout(()=>{
                        this.map = L.map(mapContiner, {
                        minZoom: 1,
                        maxZoom: 20,
                        crs: L.CRS.EPSG3857,
                        center: [31, 52],
                        zoom: 5,
                        drawControl: false,
                        zoomControl: false
                    });

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                    }).addTo(this.map);
                    L.control.zoom({
                    position: 'bottomleft'
                    }).addTo(this.map);
                   },1000)
            },
            createMarker(lat,lng){
                const marker=L.marker([lat,lng]).addTo(this.map)
                    this.map.setView(marker.getLatLng(), 11,{
                    animate: true
                })
            },
            handleScroll(e) {
                this.scroll = window.scrollY || window.scrollTop
            },
            aboutJob(about) {
                if (about && about.length >= 100) {
                    return about.substring(0, 100) + "...";
                } else {
                    return about;
                }
            },
            show(index) {
                if(index<8)
                    return true
                return false
            }
        },
        computed: {
            checkScrolling() {
                if((this.scroll) && (!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm ))
                    return 'is-scroll'
            },
            showMapContainer(){
                if(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm )
                    return 'display:none'
            }
        },
        destroyed() {
            if (process.client) {
                window.addEventListener('scroll', this.handleScroll);
            }
        },
        created () {
            if (process.browser){
                this.createMap('mapId');
                window.addEventListener('scroll', this.handleScroll);
            }
            this.fetchItems()
        },
  }




</script>

<style lang="scss" scoped>
    .advance-search{
        background: #f1f2f6;
        padding-right: 20px;
        padding-top: 120px;
    }
    .is-scroll{
        margin-top: -65px;
        width: 46% !important;
        position: fixed;

    }
    .card-filter{
        width: 100%;
        padding: 20px 20px 10px 20px;
        z-index: 999;
    }
    @media only screen and (max-width: 960px){
        .advance-search{
            padding-top: 10px;
        }
        .map-container{
            display: none;
        }
        .card-filter{
            width: 100%;
        }
    }
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
    .map-container{
        position: fixed;
        width: 48%;
    }
    #mapId{
        height: 600px;
        margin-top: -50px;
        width: 100%;
        margin-bottom: 20px;
    }
    #map2{
        height: 400px;
        margin: 5px 0 20px 0;
        width: 100%;
    }
    .c-search__btn{
        border: 2px solid #152d72;
        margin-top: 10px;
        @media only screen and (max-width: 960px){
            margin-top: -30px;
            margin-bottom:25px
        }
    }
    .tab-logo{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        position: absolute;
        background: red;
        top: 170px;
        left: 12px;
        display: flex;
        justify-content: center;
    }
    .card-img{
        height: 200px;
    }
    .card-container{
        margin: 30px 0;

        &:hover{
            -webkit-box-shadow: 10px 10px 37px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 10px 10px 37px 0px rgba(0,0,0,0.75);
            box-shadow: 10px 10px 37px 0px rgba(0,0,0,0.75);
            margin-top: 10px;
            margin-bottom: 50px;
            transition: .5s;
            cursor: pointer;
        }
    }
    .filter-tag{
        color:#51badd;
        font-size: 15px;
        font-weight: 500;
        padding-right: 16px;
        margin-top: 15px;
    }
</style>
