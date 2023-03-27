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
<swiper-slide v-for="key in props.similar[0]" :key="key.id"
>

                        <img  @click="bookSimilar(key.id)"
                        :src="url+key.image" class="shadow-sm p-3 bg-body" > 
  <div class="under-img under-img" >
  <p class="dark-text">{{ key.name }}</p>
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
import { useRouter } from "vue-router"; 
import geturl from "../../composables/geturl";

const url = geturl()
const router = useRouter()
const emit = defineEmits(['bookSimilar'])
const props = defineProps({
       similar:{
            type:Array
        }
    })
const bookSimilar = (id)=>{
  emit('bookSimilar',id)
  router.push('/bookdetails/'+id)
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
  height: clamp(10rem,1rem + 25vw,30rem);
  cursor: pointer;
}

</style>