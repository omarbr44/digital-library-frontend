<template>
    <div>
        <Deletee :url="'api/Course/destroy/'+id" :showDelete="showDelete" go="showcourses" @cancel="showDelete = false"/>
    <nav  style="--bs-breadcrumb-divider: '<';
        background-color: #f7f7f7; margin-top: 7rem;" aria-label="breadcrumb">
         <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
            <li class="breadcrumb-item active">تفاصيل الدورة</li>
            <li class="breadcrumb-item "><RouterLink :to="{name:'showcourses'}">تصفح الدورات</RouterLink> </li>
            <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
         </ol>
    </nav>
        <div class="container px-4 px-md-3" >
                <AsyncCourseDetails :id="id" @similarCourses="similarCourses" @delete="deletee" />
        </div>
        <h1 v-if="similarExist" class="h1 text-end m-4  mx-5 display-4 "> دورات مشابهة</h1>
            <SwiperSection  :similar="similar" @Similar="courseSimilarChose" />
    </div>
</template>

<script setup>
import SwiperSection from "../../components/Swiper/SwiperSection.vue";
import { useRoute,RouterLink,useRouter } from "vue-router";
import AsyncCourseDetails from "../../components/Async/AsyncCourseDetails.vue";
import { ref,watch } from "vue";
import Deletee from "../../components/BaseDelete.vue";

 const route = useRoute()
 const router = useRouter()

 const id = ref(route.params.id) 
 const similar = ref(null)
 const similarExist = ref(false)
 const showDelete = ref(false)

 const similarCourses = (similarCourse)=>{
    similar.value = similarCourse
    similarExist.value = similar.value.length > 0 ? true : false
 }
 const courseSimilarChose = (Similarid)=>{
    id.value = Similarid
 }
 watch([id, () => id.value], ([idd]) => { 
   router.push('/CourseDetails/'+idd)
    }) 
    const deletee = ()=>{
    showDelete.value = true
    window.scrollTo(0,420)
}

</script>

