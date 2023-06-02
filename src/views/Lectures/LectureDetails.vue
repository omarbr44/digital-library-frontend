<template>
    <div>
    <nav  style="--bs-breadcrumb-divider: '<';
        background-color: #f7f7f7;" aria-label="breadcrumb">
         <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
            <li class="breadcrumb-item active">تفاصيل المحاضرة</li>
            <li class="breadcrumb-item "><RouterLink :to="{name:'showlectures'}">تصفح المحاضرات</RouterLink> </li>
            <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
         </ol>
    </nav>
        <div class="container px-4 px-md-3" >
            <AsyncLectureDetails :id="id" @lectures="lectures"/>
        </div>
        <h1 v-if="similarExist" class="h1 text-end m-4  mx-5 display-4 "> محاضرات المادة</h1>
            <SwiperSection  :similar="similar" @Similar="lectureSimilarChose" />
    </div>
</template>

<script setup>
import SwiperSection from "../../components/Swiper/SwiperSection.vue";
import { useRoute,RouterLink,useRouter } from "vue-router";
import { ref,watch } from "vue";
import AsyncLectureDetails from "../../components/Async/AsyncLectureDetails.vue";

 const route = useRoute()
 const router = useRouter()

 const id = ref(route.params.id) 
 const similar = ref(null)
 const similarExist = ref(false)

 const lectures = (lectures)=>{
    similar.value = lectures
    similarExist.value = similar.value.length > 0 ? true : false
 }
 const lectureSimilarChose = (Similarid)=>{
    id.value = Similarid
 }
 watch([id, () => id.value], ([idd]) => { 
   router.push('/lectureDetails/'+idd)
    }) 

</script>

