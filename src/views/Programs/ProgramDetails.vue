<template>
    <div>
    <nav  style="--bs-breadcrumb-divider: '<';
        background-color: #f7f7f7;" aria-label="breadcrumb">
         <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
            <li class="breadcrumb-item active">تفاصيل البرنامج</li>
            <li class="breadcrumb-item "><RouterLink :to="{name:'showprograms'}">تصفح البرامج</RouterLink> </li>
            <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
         </ol>
    </nav>
        <div class="container px-4 px-md-3" >
                <AsyncProgramDetails :id="id" @similarPrograms="similarPrograms" />
        </div>
        <h1 v-if="similarExist" class="h1 text-end m-4  mx-5 display-4 "> برامج مشابهة</h1>
            <SwiperSection  :similar="similar" @Similar="prograSimilarChose" />
    </div>
</template>

<script setup>
import SwiperSection from "../../components/Swiper/SwiperSection.vue";
import { useRoute,RouterLink,useRouter } from "vue-router";
import AsyncProgramDetails from "../../components/Async/AsyncProgramDetails.vue";
import { ref,watch } from "vue";

 const route = useRoute()
 const router = useRouter()

 const id = ref(route.params.id) 
 const similar = ref(null)
 const similarExist = ref(false)

 const similarPrograms = (similarProgram)=>{
    similar.value = similarProgram
    similarExist.value = similar.value.length > 0 ? true : false
 }
 const prograSimilarChose = (Similarid)=>{
    id.value = Similarid
 }
 watch([id, () => id.value], ([idd]) => { 
   router.push('/ProgramDetails/'+idd)
    }) 

</script>

