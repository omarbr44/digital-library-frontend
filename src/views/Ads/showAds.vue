<template>
    <div>
        <div v-if="msgQuery" class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    {{ msgQuery }}
  </div>
</div>
        <Hero :obj="{
            el1 : 'تصفح الاعلانات ',
            el2 : 'تصفح الاعلانات الموجودة للجامعة ',
            el3 : 'addads',
            el4 : 'اضافة اعلان'
        }" />
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">تصفح الاعلانات</li>
                <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
             </ol>
        </nav> 
         <section class="cards">
            <div class="container px-4 px-md-3" >
                <div class="row my-5" >
                   <AsyncShowAds />
                </div>
             </div>
         </section>

    </div>
  
</template>

<script setup>
import { ref,onMounted } from 'vue';
import AsyncShowAds from '../../components/Async/AsyncShowAds.vue';
import Hero from '../../components/Hero.vue';
import { useRoute,RouterLink } from 'vue-router';

    const route = useRoute()
    const msgQuery = ref(null)
    onMounted(()=>{
        if(route.query.msg){
            msgQuery.value = route.query.msg
            setTimeout(()=>{
                msgQuery.value = null
                history.replaceState({},'',location.href.split('?')[0])
            },5000)
        }
    })
</script>

<style scoped>

</style>