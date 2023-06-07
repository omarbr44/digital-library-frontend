<template>
              <div class="p-3 pb-0 " style="background: #f7f7f7;">
   <swiper
:navigation="true" class="mySwiper"   :slidesPerView="2"
:spaceBetween="10"
:breakpoints="{
      '@0.00': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@0.75': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      '@1.50': {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    }"
>
<swiper-slide v-for="key in props.similar" :key="key.id"
>

                        <img v-if="route.name != 'lecturedetails'" @click="similar(key.id|| key.number)"
                        :src="url+key.image" class="shadow-sm p-3 bg-body" > 
                        <h3 style=" cursor: pointer;" v-else class=" p-3 "  @click="similar(key.id|| key.number)">{{ key.name }}</h3>
  <div class="under-img under-img" >
  <p v-if="route.name != 'lecturedetails'" class="dark-text">{{ key.name || key.Name || key.title }}</p>
  <p v-else class="dark-text">{{ key.number}}</p>
  </div>
</swiper-slide
>
</swiper>
</div>

</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { useRoute } from "vue-router"; 
import geturl from "../../composables/geturl";
import { onBeforeMount } from "vue";

const url = geturl()
const route = useRoute()
const emit = defineEmits(['similar'])
const props = defineProps({
       similar:{
            type:Array
        },

    })
const similar = (id)=>{
  emit('similar',id)
}
onBeforeMount(()=>{
   window.addEventListener('popstate',backBut)       // to trigger page when clicking arrows
 })
const backBut = ()=>{
   emit('similar',route.params.id)
}

</script>

<style  scoped>
.under-img{
    margin: 4px;

}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
}
 

.swiper-slide img {
  display: block;
  width: 100%;
  /*  height: clamp(10rem,1rem + 25vw,30rem);*/
  height: 18rem;
  cursor: pointer;
  
}

</style>