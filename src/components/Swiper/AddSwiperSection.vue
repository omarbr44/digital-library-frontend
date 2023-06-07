<template>
    <swiper
                           
                           :centeredSlides="true"
                           :autoplay="{
                           delay: 2500,
                           disableOnInteraction: false,
                           }"
                           :pagination="{
                           clickable: true,
                           }"
                           
                           class="mySwiper my-3"
                       >
                           <swiper-slide class="swipee">
                               <img src="../../assets/img/library.jpg" class=""  alt="book" style="position: absolute;">
                               <div class="under-swipe ">
                               <h2 class="my-1 text-white">إضافة {{ namee }}</h2>
                               <p class="my-3 text-white text-center"> أكمل تعبئة التفاصيل لإضافة {{ namee }} الى الموقع   </p>
                               <p class="mt-2 grey-text  text-center"> ".إن القراءة هي رياضة العقل، فبالقراءة تحافظ على قوة وصحة العقل"</p>
                               </div>
                           </swiper-slide>
                           <swiper-slide class="swipee">
                               <img src="../../assets/img/booksver.jpg" class=""  alt="book" style="position: absolute;">
                               <div class="under-swipe ">
                               <h2 class="my-1 text-white">إضافة {{ namee }}</h2>
                               <p class="my-3 text-white text-center"> أكمل تعبئة التفاصيل لإضافة {{namee}} الى الموقع  </p>
                               <p class="mt-2 grey-text  text-center"> ".تعتبر القراءة من النشاطات المسلية التي يستطيع أي فرد ممارستها، فهي من أفضل وسائل الترفيه"</p>
                               </div>
                           </swiper-slide>
                           <swiper-slide class="swipee">
                               <img src="../../assets/img/program.jpg" class=""  alt="book" style="position: absolute;">
                               <div class="under-swipe ">
                               <h2 class="my-1 text-white">إضافة {{ namee }}</h2>
                               <p class="my-3 text-white text-center"> أكمل تعبئة التفاصيل لإضافة {{namee}} الى الموقع </p>
                               <p class="mt-2 grey-text  text-center"> ".تمنح قراءة الكتب فرصة تعليم وثقافة مجانية، وذلك بالاطلاع على العديد من الموضوعات التي يرغب الفرد بالتعرف عليها"</p>
                               
                           </div>
                           </swiper-slide>
                           </swiper> 
</template>

<script setup>
defineProps({
    namee:{
        type: String
    }
})
import { Swiper, SwiperSlide } from 'swiper/vue';
 // Import Swiper styles
 import 'swiper/css';

import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';
</script>

<style  scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swipee::before{
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
}
.under-swipe{
    z-index: 2;
    padding: 2.5rem;
    font-size: clamp(0.8rem,0.2rem + 1vw,2rem);
}
</style>