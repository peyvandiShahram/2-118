<template>
    <div class="business">
        <v-container>
           
            <v-row v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
                <InfoImages
                    :cover="data.cover"
                    :galery="data.galery"
                    :about="data.about"
                    :rating="data.rating"
                    :group="data.group_title" 
                    :id="$route.params.id"
                    :edit="editable"
                    :job="data"
                  />
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <InfoCard
                        v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm" 
                        :title="data.title"
                        :tel="data.tel"
                        :address="data.address"
                        :website="data.website"
                        :like="data.count_of_like"
                        :id="$route.params.id"
                        :edit="editable"
                     />
                    <InfoMap 
                        :lat="data.latetiud" 
                        :lng="data.longetiud" 
                        :id="$route.params.id"
                        :edit="editable" 
                    /> 
                    <TimeWork 
                        :worktime="data.worktime" 
                        :id="$route.params.id"
                        :edit="editable" 
                    />
                    <ImagePar :images="data.pic360" />
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md="7">
                    <InfoImages
                        v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
                        :cover="data.cover"
                        :galery="data.galery"
                        :about="data.about"
                        :id="$route.params.id"
                        :edit="editable"
                        :rating="data.rating"
                      />
                    <div class="divider"></div>
                    <Branchs 
                        :title="data.title"
                        :branchs="data.branch"
                        :id="$route.params.id"
                        :edit="editable"
                    />
                    <div class="divider"></div>
                    <RatingResult :opinion="data.opinion[0]"/>
                    <div class="divider"></div>
                    <Comment/>
                </v-col>
            </v-row>
            <Others :group_id="data.group_id" /> 
        </v-container>
    </div>
</template>

<script>
    import InfoCard from '~/components/business/infoCard'
    import InfoImages from '~/components/business/infoImages'
    import InfoMap from '~/components/business/infoMap'
    import Branchs from '~/components/business/branchs'
    import Comment from "~/components/business/AppComment.vue";
    import Others from "~/components/business/others";
    import ImagePar from "~/components/business/imagePar"
    import RatingResult from '~/components/business/ratingResult'
    import TimeWork from '~/components/business/timeWork'

    export default {
        components: {
            InfoCard,
            InfoImages,
            InfoMap,
            Branchs,
            Comment,
            Others,
            ImagePar,
            RatingResult,
            TimeWork
         },
         asyncData(context) {
            return context.app.$axios.
             $post("office_info1", {
                 id: context.params.id
             })
             .then((res)=>{
                return{
                    data:res[0],
                    editable:false  
                }
             })
         },
         methods: {
            async checkOwner() {
                if(this.user.token){
                    const data = await this.$axios.post("office_user_info", {
                        token: this.user.token
                    });
                    data.data.forEach(element => {
                        if(element.office_id===this.$route.params.id)
                            this.editable=true
                    });
                    console.log(this.editable)
                }
            }
         },
        computed: {
            user() {
                this.$store.dispatch('fetchUser')
                return this.$store.getters.getUser;
            }
        },
        created () {
            this.checkOwner();
        },

    }
</script>

<style lang="scss" scoped>
    .business{
        padding-top: 100px;
        padding-bottom: 50px;
        background: #fff;
    }
    @media only screen and (max-width: 960px){
        .business{
            padding-top: 0px;
        }
    }
    .divider{
        width: 100%;
        height: 30px;
        border-bottom: 3px dotted #404040;
    }

</style>