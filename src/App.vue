<script setup>
  import {  RouterView,useRoute } from 'vue-router'
  import { onMounted,ref,watchEffect } from 'vue'
  import  NavbarComp  from './components/TheNavbar.vue'
  import  FooterComp  from './components/FooterComp.vue'
  import 'aos/dist/aos.css'
  import AOS from 'aos'
  import { useUserStore } from '@/stores/user'
  const userStore= useUserStore()
  const route = useRoute()
 onMounted (()=>{
  AOS.init()
}
 )
 const NavUse = ref(true)

 watchEffect(()=>{
  if(route.name == 'signup' || route.name == 'login' || userStore.userType == 3){
    NavUse.value= false
  }
  else{
    NavUse.value= true
  }
 })
</script>

<template>
<NavbarComp v-if="NavUse" />
   <RouterView />
<FooterComp v-if="NavUse" />   
</template>

<style>
.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-left{
  background-image: none !important;
}
.swiper-pagination-bullet-active{
  background: var(--bs-seccolor) !important;
}
html, body{
  height: 100%;
}
#app{
  height: 100%;
}
@font-face {
  font-family: 'din-next-arabic';
  src: url(assets/fonts/din-next-arabic-bold.ttf);
}
@font-face {
  font-family: 'din-next-arabicmd';
  src: url(assets/fonts/DINNextLTArabic-Medium-4.ttf);
}
 .nav-link,h1,h2,h3{
    color: var(--bs-firstcolor);
  }
  .alert-dismissible{
    z-index: 1500;
  }
a{
  text-decoration: none;
  color: var(--bs-seccolor);
}
.clamp-padding{
padding: 0.4rem clamp(4rem,10vmax,8rem) ;
}
.clamp-padding1{
padding: 0.4rem clamp(4rem,10vmax,4rem) ;
}
.rtl{
  direction: rtl;
}
.bk-dark{
  background-color: var(--bs-firstcolor) !important;
}
.bk-green{
  background-color: var(--bs-seccolor);
}
.br-green{
 border-color: var(--bs-seccolor);
}
.green-text{
 color: var(--bs-seccolor);
}
.dark-text{
 color: var(--bs-firstcolor);
}
.grey-text{
  color: #a7a7a7;
}
.btn:hover{
  background-color: var(--bs-seccolor);
}
.btnn:hover{
  background-color: var(--bs-seccolor);
  color: white;
}

.flex-center{
  justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.passwordIcon{
    position: relative;
}
.passwordIcon::before{
    content: "";
    width: 2rem;
    height: 2rem;
    position: absolute;
    background-image: url(@/assets/img/search.png);
    left: 14px;
    display: block;
    bottom: -1px;
    z-index: 2;
    background-size: 1.5rem;
    background-repeat: no-repeat;
}
.redstar::after{
        content: '*';
    color: red;
    position: absolute;
    top: 7px;
    left: 15px;
    font-size: large;
    }
    .btn-danger:hover{
      background-color: var(--bs-btn-hover-bg);
    }

</style>



