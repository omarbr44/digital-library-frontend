<template>
    <div>
      <Deletee :url="'api/Project/destroy/'+id" :showDelete="showDelete" go="showprojects" @cancel="showDelete = false"/>
    <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7; margin-top: 7rem;" aria-label="breadcrumb">
         <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
            <li class="breadcrumb-item active">تفاصيل المشروع</li>
            <li class="breadcrumb-item "><RouterLink :to="{name:'showprojects'}">تصفح المشاريع</RouterLink> </li>
            <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
         </ol>
    </nav>
        <div class="container px-4 px-md-3" >
                <AsyncProgectDetails :id="id" @similarProgects="similarProjects" @delete="deletee"/>
        </div>
        <h1 v-if="similarExist" class="h1 text-end m-4  mx-5 display-4 "> مشاريع مشابهة</h1>
            <SwiperSection  :similar="similar" @Similar="projectSimilarChose" />
    </div>
</template>

<script setup>
import SwiperSection from "../../components/Swiper/SwiperSection.vue";
import { useRoute,RouterLink,useRouter } from "vue-router";
import AsyncProgectDetails from "../../components/Async/AsyncProgectDetails.vue";
import Deletee from "../../components/BaseDelete.vue";
import { ref,watch } from "vue";

 const route = useRoute() 
 const router = useRouter()

 const id = ref(route.params.id) 
 const similar = ref(null)
 const similarExist = ref(false)
 const showDelete = ref(false)

 const similarProjects = (similarProject)=>{
    similar.value = similarProject
    similarExist.value = similar.value.length > 0 ? true : false
 }
 const projectSimilarChose = (Similarid)=>{
    id.value = Similarid
 }
 watch([id, () => id.value], ([idd]) => { 
   router.push('/ProjectDetails/'+idd)
    }) 
    const deletee = ()=>{
    showDelete.value = true
    window.scrollTo(0,420)
}
</script>

