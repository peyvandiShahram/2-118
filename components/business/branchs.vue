<template>
    <div>
        <v-row>
            <div class="branch-title">
                دیگر شعبه های {{title}}
            </div>
        </v-row>
        <v-row v-if="branchs.length>0">
            <v-expansion-panels>
                <v-expansion-panel
                    v-for="(branch,index) in branchs" :key="index"
                >
                <v-expansion-panel-header class="header-title">
                    {{branch.branch_name}}
                </v-expansion-panel-header>
                <v-expansion-panel-content class="panel-context">
                    {{branch.address}}
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
        <v-row v-else>
            <div class="header-title">شعبه دیگری وجود ندارد</div>
        </v-row>
    </div>
</template>

<script>
    export default {
        name:'Branchs',
        props: {
            title:{
                type:String,
                require:true
            },
            branchs: {
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
    }
</script>

<style lang="scss" scoped>
    .branch-title{
        font-weight: 700;
        font-size: 15px;
        margin: 50px 25px 40px 0;
    }
    .header-title{
        font-weight: 500;
        padding: 10px 24px;
    }
    .panel-context{
        color: #92939f;
        font-size: 13px;
        padding-right: 50px;
    }
</style>