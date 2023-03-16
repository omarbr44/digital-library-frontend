<script setup>
  import {  RouterView } from 'vue-router'
  import { onMounted } from 'vue'
  import  NavbarComp  from './components/NavbarComp.vue'
  import  FooterComp  from './components/FooterComp.vue'
  import 'aos/dist/aos.css'
  import AOS from 'aos'
 
 onMounted (()=>{
  AOS.init()
}
 )
</script>

<template>
<NavbarComp />
   <RouterView />
<FooterComp />   
</template>

<style>
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
a{
  text-decoration: none;
  color: var(--bs-seccolor);
}
.clamp-padding{
padding: 0.4rem clamp(4rem,10vmax,8rem) ;
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

.flex-center{
  justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
