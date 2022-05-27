<template>
    <div>
        <v-row class="edit" v-if="edit">
            <div  @click="editTime()">ویرایش ساعت کاری</div>
            <v-icon size="25" color="#152d72">
                mdi-square-edit-outline
            </v-icon>
        </v-row>  
        <v-row>
            <div class="work-time">
                <v-row >
                    <v-row class="work-time-title-container">
                        <v-icon color="#51badd">
                            mdi-clock
                        </v-icon>
                        <div class="work-time-title">
                            ساعت کاری
                        </div>
                    </v-row>
                    <v-col v-for="(day,index) in worktime" :key="index" cols="12" sm="6" md="12">
                        <v-row>
                            <v-col cols="3" class="work-time-context" style="color:#454744;font-weight: 700">
                                {{days[index]}}
                            </v-col>
                            <v-col cols="4" class="work-time-context">
                                شروع: {{day.time1}}
                            </v-col>
                            <v-col cols="5" class="work-time-context">
                                پایان: {{day.time2}}
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-row>
    </div>
</template>

<script>
    export default {
        name:'TimeWork',
        data() {
            return {
                days:['شنبه','یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پنجشنبه','جمعه']
            }
        },
        props: {
            worktime: {
                type: Array,
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
        },
        methods: {
            editTime() {
                this.$router.push({ path: `/job/edit/${this.id}`, query: { step: 4 }})
            }
        },
    }
</script>

<style lang="scss" scoped>
    .work-time-title-container{
        width: 100%;
        padding: 20px;
    }
    .work-time{
        border: 1px solid black;
        border-radius: 15px;
        margin: 20px 0;
        padding: 20px 20px 30px 20px;
        -webkit-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
        box-shadow: -3px 3px 22px 0px rgba(0,0,0,0.75);
    }
    .work-time-title{
        font-size: 17px;
        font-weight: 700;
        margin-right: 10px;
    }
    .work-time-context{
        font-size: 12px;
        font-weight: 500;
        color: #92939f;
        padding: 10px 20px 10px 0;
    }
    @media only screen and (max-width: 600px){
        .work-time-context{
            font-size: 10px;
            padding: 10px 10px 10px 0;
        }
    }
    .edit{
        font-weight: 700;
        font-size: 17px;
        color: #152d72; 
        cursor: pointer;
        margin: 20px 0;
    }
</style>