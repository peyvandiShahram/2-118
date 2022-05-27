<template>
    <div>
        <v-row>
            <div class="others-title">آگهی های مشابه</div>
            <v-row>
                <v-sheet
                    class="mx-auto"
                    height="auto"
                    :max-width="width"
                    style="margin-bottom: 30px;"
                >
                    <v-slide-group
                        multiple
                        :show-arrows="showArow"
                    >
                        <v-slide-item v-for="(job,index) in data" :key="index">
                            <nuxt-link :to="'/business/' + job.id">
                                <v-card
                                    rounded
                                    class="card-container"
                                >
                                    <template slot="progress">
                                    <v-progress-linear
                                        color="deep-purple"
                                        height="10"
                                        indeterminate
                                    ></v-progress-linear>
                                    </template>

                                    <v-img
                                        class="card-img"
                                        :src="job.logo"
                                    >
                                    </v-img>
                                    <div>
                                        <img class="tab-logo" src="~/assets/img/logo/logo.png" alt="">
                                    </div>
                                    <v-card-title style="color:#152d72;padding:8px 16px" >{{titleLength(job.title)}}</v-card-title>
                                    <v-card-text style="padding:5px 16px;height:70px">
                                    <div>{{aboutJob(job.about)}}</div>
                                    </v-card-text>
                                    <v-chip-group style="margin-bottom:10px">
                                        <v-chip disabled>{{job.group_id}}</v-chip>
                                    </v-chip-group>
                                    <v-row >
                                        <div class="item-btns">
                                            <v-btn color="#152d72" width="35%" dark>
                                                <v-icon color="#fff" size="25px">mdi-map</v-icon>
                                                نقشه
                                            </v-btn>
                                            <v-btn color="#152d72" width="35%" dark>
                                                <v-icon color="#fff" size="25px">mdi-phone</v-icon>
                                                تماس
                                            </v-btn>
                                        </div>
                                    </v-row>
                                </v-card>
                            </nuxt-link>
                        </v-slide-item>                    
                    </v-slide-group>
                </v-sheet>
            </v-row>
        </v-row>
    </div>
</template>

<script>
    export default {
        name:'Others',
        props: {
            group_id: {
                type: String,
                require:true 
            },
        },
        computed: {
            width(){
                if(this.$vuetify.breakpoint.xs)
                    return 350 
                else if(this.$vuetify.breakpoint.sm)
                    return 550
                return 1200
            },
            showArow(){
                if(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
                    return false 
                return true
            }
        },
        data() {
            return {
                data:null
            }
        },
        methods: {
            fetch() {
                this.$axios.$post("other_office", {
                group_id: this.group_id
               })
                .then((res)=>{
                    this.data=res
                })
            },
            aboutJob(about) {
                if (about && about.length >= 100) {
                    return about.substring(0, 100) + "...";
                } else {
                    return about;
                }
            },
            titleLength(title){
                if (title && title.length >= 30) {
                    return title.substring(0, 30) + "...";
                } else {
                    return title;
                }
            }
        },
        created () {
            this.fetch();
        },
    }
</script>

<style lang="scss" scoped>
    .others-title{
        width: 100%;
        text-align: right;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 30px;
    }
    .card-container{
        -webkit-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        border-radius: 20px;
        width: 300px;
        margin-right: 20px;
        .card-img{
            height: 150px;
        }
        .item-btns{
            width: 100%;
            display: flex;
            justify-content: space-around;
            font-size: 15px;
            font-weight: 700;
            color: #fff;
            padding-bottom: 10px ;
        }
        .tab-logo{
            width: 45px;
            height: 45px;
            border-radius: 50px;
            background: #fff;
            padding: 5px;
            position: absolute;
            top: 115px;
            right: 12px;
        }
        @media only screen and (max-width: 690px){
            .others-title{
                margin-bottom: 10px;
            }
            .tab-logo{
                width: 40px;
                height: 40px;
            }
        }
    }
</style>