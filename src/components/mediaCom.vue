<template>
    
        <div class="col-12 col-lg-4 text-center rtl line-under"  >  
                    <RouterLink 
                    :to="{
                        name: 'bookdetails',
                        params: {id:data.id}
                         }">
                        <div class="goo">
                            <img :src="url+data.image" class="shadow-sm p-3 bg-body"  alt="book"  style="width: 70%;">
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p class="m-0">{{ data.name }}</p>
                            <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>    
                        </div>
                        <hr>
         </div>
   
</template>

<script setup>
//import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import geturl from '../composables/geturl';

defineProps({
    data: {
        type: Object,
        default:null
          }
})

const url = geturl()
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
    height: 19rem;
}
img:hover{
    transform: scale(1.2);
}
</style>