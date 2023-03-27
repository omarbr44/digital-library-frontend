<template>
    <div>
    <nav  style="--bs-breadcrumb-divider: '<';
        background-color: #f7f7f7;" aria-label="breadcrumb">
         <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
            <li class="breadcrumb-item active">تفاصيل الكتاب</li>
            <li class="breadcrumb-item active"><a href="#">تصفح الكتب</a> </li>
            <li class="breadcrumb-item " aria-current="page"><a href="#">الرئيسية</a></li>
         </ol>
    </nav>
        <div class="container px-4 px-md-3" >
                <AsyncBookDetails :id="id" @similarBooks="similarBooks" />
        </div>
        <h1 class="h1 text-end m-4  mx-5 display-4 "> كتب مشابهة</h1>
            <SwiperSection v-if="similar" :similar="similar" @bookSimilar="bookSimilarChose" />
    </div>
</template>

<script setup>
import SwiperSection from "../../components/Swiper/SwiperSection.vue";
import { useRoute } from "vue-router";
import AsyncBookDetails from "../../components/AsyncBookDetails.vue";
import { ref } from "vue";

 const route = useRoute()
 const id = ref(route.params.id) 
 const similar = ref(null)
 const similarBooks = (similarbook)=>{
    similar.value = similarbook
 }
 const bookSimilarChose = (Similarid)=>{
    id.value = Similarid
 }

</script>

