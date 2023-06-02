<template>
    
        <div class="col-12 col-lg-4 text-center rtl line-under"  > 

                    <RouterLink 
                    :to="{
                        name: Details,
                        params: {id:data.id || data.Project_number },
                        query:{msgg:msgg}
                         }">
                        <div class="goo">
                            <img v-if="data.image" :src="url+data.image" class="shadow-sm p-3 bg-body"  alt="book"  style="width: 70%;">
                            <h3 v-else class=" p-3 "  >{{ data.name }}</h3>
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p  style="text-align: right;
                                 width: 75%; " class="m-0">{{data.teacher_name || data.name || data.title }}</p>
                            <button v-if="useRoute().name != 'showads'"  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">{{ data.semester || data.category_name || data.Department_name || data.number }}</button> 
                        </div>
                        <p class="m-0" v-if="data.Number_of_Videos">{{ data.Number_of_Videos }} {{ data.Number_of_Videos == 1 ? 'مقطع' : 'مقاطع'}}</p>   
                        <hr>
         </div>
   
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink,useRoute } from 'vue-router';
import geturl from '../composables/geturl';
defineProps({
    data: {
        type: Object,
        default:null
          },
          Details: {
        type: String,
        default:''
          }
})
const url = geturl()
const msgg = ref('')

if(useRoute().query.msgg){
    msgg.value = 'accept'
}

</script>
<style  scoped>
.under-card{
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}
hr{
    margin: 2rem 0;
    margin-left: auto;
    margin-right: auto;
    width: 30%;
    color: var(--bs-seccolor);
}
img{
    cursor: pointer;
    transition: transform ease-in-out 0.4s;
    height: 18rem;
}
img:hover{
    transform: scale(1.1);
}
</style>