<template>
    <main>
      <div v-if="msgQuery" class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    {{ msgQuery }}
  </div>
</div>
     <!-- <div class="container px-4 px-md-3 mt-2" data-aos="fade-up">
       <div class="row align-items-lg-center">
         <div class="col-8 mx-auto col-md-4 order-md-1 col-lg-6" data-aos="fade-up" data-aos-delay="200">
           <img src="@/assets/img/LandingPageImagecopy.png" width="700" height="533" class="img-fluid mb-3 mb-md-0" role="img" viewBox="0 0 900 800">
         </div>
         <div class="col-md-8 order-md-2 col-lg-6 text-center text-md-end" data-aos="zoom-in" data-aos-delay="250">
           <h1 class="mb-3 display-1 fw-bold"> 
              المكتبة الرقمية لكل الطلاب
              </h1>
           <p class="lead mb-4">
             مشروع المكتبة الرقمية لتبادل جميع وسائل التعلم الالكترونية وتسهيل الوصول للمعلومة
                     </p>
   
           <div class="d-flex flex-column flex-md-row justify-content-end text-white">
             <RouterLink :to="{name:'login'}" class="btn btn-lg btn-bd-primary mb-3 me-md-3 br-green" >تسجيل الدخول </RouterLink>
             <RouterLink :to="{name:'showbooks'}" class="btn btn-lg mb-3 bk-green text-white" >تصفح</RouterLink>
           </div>
           
         </div>
       </div>
   
     </div> -->
     <div id="carouselExampleCaptions" class="carousel slide mb-3" data-bs-ride="carousel" style="margin-top: 5rem;">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item darken" :class="{active: index == 0}" v-for="(key,index) in dataads" :key="key.id">
      <img :src="url+key.image" class="d-block w-100 " height="500">
      <div class="carousel-caption d-md-block">
        <h5 style="overflow-wrap: break-word;">{{ key.title }}</h5>
        <p>{{ key.description }}</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    
   </main>
  
   <!-- <section class="services bk-dark py-5 mt-5">
     <div class="container px-4 px-md-3" data-aos="fade-up" >
      
       <div class="row align-items-lg-center">
         <div class="col-8 mx-auto col-md-4 order-md-1 text-center col-lg-5" data-aos="fade-left" data-aos-delay="200">
       
           <img src="@/assets/img/lecture.png" width="450" height="483" class="img-fluid mb-3 mb-md-0 " role="img" >
          
         </div>
         <div class="col-md-8 order-md-2 col-lg-7 text-center text-md-end text-white"  data-aos="fade-right" data-aos-delay="200">
           <h1 class="mb-3 display-3 fw-bold text-white">
            رفع المحاضرات
          </h1>
           <p class="lead mb-4">
           إمكانية رفع المحاضرات من قبل الدكاترة والمدرسين لتسهيل الوصول اليها من قبل الطلاب 
           </p>
   
           <div class="d-flex flex-column flex-md-row justify-content-end">
             <RouterLink :to="{name:'addbook'}" class="bk-green btn btn-lg  mb-3 text-white " >
               <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload mx-2 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              رفع المحاضرات
            </RouterLink>
           </div>
           
         </div>
       </div>
   
     </div>
   </section> -->
 
  <!--  <section class="services2  py-2 my-5">
     <div class="container px-4 px-md-3" data-aos="fade-up">
       <div class="row row_ser2 align-items-lg-center " data-aos="zoom-in" data-aos-delay="200">
         <div class="col-8 mx-auto col-md-4 order-md-2 col-lg-5 text-md-end bef">
           
           <img  src="@/assets/img/course.png" width="270" height="313" class="img-fluid mb-3 mb-md-0 rounded-circle" role="img" >
           
         
         </div>
         <div class="col-md-8 order-md-1 col-lg-7 text-center text-md-end " >
           <h1 class="mb-3 display-3 fw-bold ">تصفح الكتب</h1>
           <p class="lead mb-4">
           تصفح الكتب الموجودة مع خاصية البحث وايضا الفلترة بالفئات مع امكانية تحميل الكتاب
           </p>
   
           <div class="d-flex flex-column flex-md-row justify-content-end text-white">
             <RouterLink :to="{name:'showbooks'}" class="bk-green btn btn-lg text-white  mb-3 br-green" >تصفح </RouterLink>
           </div>
           
         </div>
       </div>
       <div class="row row_ser2 align-items-lg-center my-5" data-aos="zoom-in" data-aos-delay="200">
         <div class="col-8 mx-auto col-md-4 order-md-1 col-lg-5 text-center bef">
           <img  src="@/assets/img/video.png" width="370" height="313" class="img-fluid mb-3 mb-md-0 " role="img" >
          
         </div>
         <div class="col-md-8 order-md-2 col-lg-7 text-center text-md-end " >
           <h1 class="mb-3 display-3 fw-bold ">تصفح الدورات</h1>
           <p class="lead mb-4">
            تصفح الدورات الموجودةوالمقاطع الملحقة مع خاصية البحث وايضا الفلترة بالفئات مع امكانية تحميل الدورة
           </p>
   
           <div class="d-flex flex-column flex-md-row justify-content-end text-white">
             <RouterLink :to="{name:'showcourses'}" class="bk-green btn btn-lg text-white  mb-3 br-green" >تصفح </RouterLink>
           </div>
           
         </div>
       </div>
       <div class="row row_ser2 align-items-lg-center" data-aos="zoom-in" data-aos-delay="200">
         <div class="col-8 mx-auto col-md-4 order-md-2 col-lg-5 text-md-end bef">
           <img  src="@/assets/img/program.png" width="370" height="313" class="img-fluid mb-3 mb-md-0 " role="img" >
         
         </div>
         <div class="col-md-8 order-md-1 col-lg-7 text-center text-md-end " >
           <h1 class="mb-3 display-3 fw-bold ">تصفح البرامج</h1>
           <p class="lead mb-4">
            تصفح البرامج الموجودة  مع خاصية البحث وايضا الفلترة بالفئات مع امكانية تحميل البرنامج
           </p>
   
           <div class="d-flex flex-column flex-md-row justify-content-end text-white">
             <RouterLink :to="{name:'showprograms'}" class="bk-green btn btn-lg  mb-3 text-white br-green" >تصفح </RouterLink>
           </div>
           
         </div>
       </div>
 
 
</div>
</section> -->
<section class="slider slid_prog">
    <div  class="container">
    <h4 class="h4 text-end mb-4 display-4 dark-text">جديد الكتب</h4>
    <loading v-if="!data && !error"  />
      <swiper v-else
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :pagination="true"
    class="mySwiper mt-5"
  > 
    <swiper-slide v-for="key in data" :key="key.id">
      <RouterLink 
         :to="{
          name: 'bookdetails',
          params: {id:key.id}
              }">
              <img  style="box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
" :src="url+key.image" width="270" height="200" class="mt-3" />
      </RouterLink>
      <div class="text-center" >
        <h3 style="font-size: 1.3rem;" class=" mt-4 dark-text">{{ key.name }}</h3>
      </div>
      </swiper-slide>
  </swiper>
  <RouterLink :to="{name:'showbooks'}" class="bk-green btn btn-lg text-white  mb-3 br-green" >المزيد </RouterLink>

    </div>
   </section>
   <hr>
   <section class="slider slid_prog">
    <div  class="container">
    <h4 class="h4 text-end mb-4 display-4 dark-text">جديد البرامج</h4>
    <loading v-if="!dataProgram && !error"  />
      <swiper v-else
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :pagination="true"
    class="mySwiper mt-5"
  > 
    <swiper-slide v-for="key in dataProgram" :key="key.id">
      <RouterLink 
         :to="{
          name: 'programdetails',
          params: {id:key.id}
              }">
              <img  style="box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
" :src="url+key.image" width="270" height="200" class="mt-3" />
      </RouterLink>
      <div class="text-center" >
        <h3 style="font-size: 1.3rem;" class="mt-4 dark-text">{{ key.name }}</h3>
      </div>
      </swiper-slide>
  </swiper>
  <RouterLink :to="{name:'showprograms'}" class="bk-green btn btn-lg text-white  mb-3 br-green" >المزيد </RouterLink>

    </div>
   </section>
   <hr>
   
   <section class="slider slid_prog">
    <div  class="container">
    <h4 class="h4 text-end mb-4 display-4 dark-text">جديد الدورات</h4>
    <loading v-if="!dataCourses && !error"  />
      <swiper v-else
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :pagination="true"
    class="mySwiper mt-5"
  > 
    <swiper-slide v-for="key in dataCourses" :key="key.id">
      <RouterLink 
         :to="{
          name: 'coursedetails',
          params: {id:key.id}
              }">
              <img  style="box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
" :src="url+key.image" width="270" height="200" class="mt-3" />
      </RouterLink>
      <div class="text-center" >
        <h3 style="font-size: 1.3rem;" class="mt-4 dark-text">{{ key.name }}</h3>
      </div>
      </swiper-slide>
  </swiper>
  <RouterLink :to="{name:'showcourses'}" class="bk-green btn btn-lg text-white  mb-3 br-green" >المزيد </RouterLink>

  <div class="row align-items-lg-center my-3 p-3 " >
    <div class="d-flex flex-column flex-md-row  my-3 justify-content-center" >
                          <RouterLink :to="{name:'showlectures'}" class="btn btn-lg clamp-padding1 btn-bd-primary mb-3 mx-5 bk-green text-white rounded-pill" >
                              <span >تصفح المحاضرات</span>
                          </RouterLink>
                          <RouterLink :to="{name:'showprojects'}" class="btn btn-lg clamp-padding1 btn-bd-primary mb-3 mx-5 bk-green text-white rounded-pill" >
                              <span >تصفح المشاريع</span>
                          </RouterLink>
                          <RouterLink :to="{name:'showads'}" class="btn btn-lg clamp-padding1 btn-bd-primary mb-3 mx-5 bk-green text-white rounded-pill" >
                              <span >تصفح الاعلانات</span>
                          </RouterLink>
                   </div>
    </div>
    </div>
   </section>
   <hr>
   <div class="row align-items-lg-center my-3 p-3" >
  <div class="col " data-aos="fade-up" data-aos-delay="150">
    <h1 class="mb-3 display-3 fw-bold text-center clamp-font p-3">" انشر علما، ليبقى اثرا "</h1>
    <p class="lead mb-4 text-center">
امكانية رفع اي وسائط تعليمية سواء كانت كتب , دورات ، برامج </p>
    <div class=" text-white text-center my-5">
      <!-- <RouterLink :to="{name:k}"  class="bk-green btn btn-lg fs-2 text-white rounded-pill br-green clamp-padding" > 
        <svg  xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload mx-2 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        رفع للمكتبة
     </RouterLink> -->
    </div>
  </div>
 
</div>
</template>

<script setup>
import { useGet } from "../composables/useGet";
import { RouterLink } from 'vue-router';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Loading from "../components/BaseLoading.vue";
import { ref,watchEffect,onMounted } from "vue";
import geturl from "../composables/geturl";
import { useRoute } from "vue-router";

const url = geturl()
const data = ref(null)
const dataCourses = ref(null)
const dataProgram = ref(null)
const dataads = ref(null)
const error = ref(null)
const msgQuery = ref(null)
const route = useRoute()
/* const k = ref(null)
 */const klist = ref(['addcourse','addbook','addprogram'])
onMounted(async()=>{
        if(route.query.msg){
            msgQuery.value = route.query.msg
            setTimeout(()=>{
                msgQuery.value = null
                history.replaceState({},'',location.href.split('?')[0])
            },5000)
        }
      /*  k.value = Math.random() * klist.value.length
       k.value = klist.value[Math.floor( k.value )] */
    })
watchEffect(async ()=>{
      
        const ads = await useGet('api/Advertisement') 
        dataads.value = ads.awaitdata.value
        const { awaitdata,awaiterror } = await useGet('api/BooK') 
        data.value = awaitdata.value.data
        error.value = awaiterror
        const courses = await useGet('api/Course') 
        dataCourses.value = courses.awaitdata.value.data
        const programs = await useGet('api/Program') 
        dataProgram.value = programs.awaitdata.value.data

    })

</script>

<style  scoped>
.bef::before{
    content: '';
    width: 18rem;
    height: 17rem;
    background: var(--bs-firstcolor);
    transform: translate(5px, 1px);
    position: absolute;
    z-index: -1;
    border-radius: 100%;
    display: none;
}
.row_ser2{
  transition: all ease-in-out 0.3s;
}
.row_ser2:hover{
  box-shadow: 0px 0 25px 0 rgb(0 0 0 / 10%);
    transform: translateY(-10px);
}
.swiper {
  width: 100%;
}
.darken::after{
  content: '';
    position: absolute;
    width: 100%;
    z-index: 100;
    color: white;
    left: 0;
    top: 0;
    text-align: center;
    font-size: 6rem;
    line-height: 8rem;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height:301px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  cursor: pointer;
  }
/* .slid_book{
  background: url(@/assets/img/booksnew.jpg) no-repeat;
}
.slid_prog{
  background: url(@/assets/img/programsnew.jpg) no-repeat;
}
.slid_course{
  background: url(@/assets/img/course.jpg) no-repeat;
} */
.slider{
  padding: 10px 0;
    background-position: center center;
    background-size: cover;
    position: relative;
}
.carousel-caption{
  z-index: 3;
}
hr{
  margin: 2rem 0;
    margin-left: auto;
    margin-right: auto;
    width: 30%;
    color: var(--bs-seccolor);
}
.slide::after{
  content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
}
.clamp-font{
  font-size: clamp(1rem,0.8rem + 3vw,4rem);
}

@media(width <=  992px) and (width >= 770px){
  .bef::before{
 
    width: 14rem;
    height: 13rem;
}
}
@media(width <=  460px) {
  .bef::before{
 
  display: none;
}
}
</style>