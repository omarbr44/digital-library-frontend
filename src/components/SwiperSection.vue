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
<swiper-slide 
>
<img
src="../assets/img/think.jpeg" class="shadow-sm p-3 bg-body" > 
<div class="under-img under-img" >
<p class="dark-text">Think like a programer </p>
</div>
</swiper-slide
><swiper-slide
><img
src="../assets/img/think2.jpeg" class="shadow-sm p-3 bg-body" />
<div class="under-img">
    <p class="dark-text ">  The hidden language of computer</p>
</div>
</swiper-slide
><swiper-slide
><img
src="../assets/img/think(3).jpeg" class="shadow-sm p-3 bg-body"  />
<div class="under-img">
    <p class="dark-text "> Algorithems design</p>
</div></swiper-slide
><swiper-slide
><img
src="../assets/img/think(4).jpeg" class="shadow-sm p-3 bg-body" />
<div class="under-img">
    <p class="dark-text "> Introduction to algorithems</p>
</div></swiper-slide
><swiper-slide
><img
src="../assets/img/think(5).jpeg" class="shadow-sm p-3 bg-body" />
<div class="under-img">
    <p class="dark-text ">The boring stuff with python </p>
</div></swiper-slide
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
}

</style>