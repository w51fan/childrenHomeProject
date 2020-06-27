<template>
    <div>
        123
    </div>
</template>

<script>
import { getActivityDetail } from "@/api/home";
export default {
    name:'activityDetail',
    data(){
        return{}
    },
    mounted(){
        getActivityDetail(this.$route.query.Id).then(res=>{
            console.log(res)
        })
    },
    methods:{
        
    }
}
</script>

<style>

</style>