<template>
    <section class="hero" >
            <div class="container px-4 px-md-3" >
                <div class="row  my-5" >
                    <div class="col flex-center"  >
                        <h1 class="mb-3 display-1 fw-bold text-center text-white"> 
                          {{ props.obj.el1 }}
                        </h1>
                        <p class="lead mb-4 grey-text text-center w-75">
                          {{ props.obj.el2 }}
                        </p>
                         <RouterLink v-if="userStore.userType == 1 && props.obj.el3 == 'addproject'" :to="{name:props.obj.el3}"  class="btn btn-lg fs-2 rounded-pill bk-green text-white clamp-padding" >
                          <svg  xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload mx-2 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          {{ props.obj.el4 }}
                           </RouterLink>
                         <RouterLink v-else-if="userStore.userType == 2 && props.obj.el3 == 'addlectures'" :to="{name:props.obj.el3}"  class="btn btn-lg fs-2 rounded-pill bk-green text-white clamp-padding" >
                          <svg  xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload mx-2 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          {{ props.obj.el4 }}
                           </RouterLink>
                         <RouterLink v-else :to="{name:props.obj.el3}"  class="btn btn-lg fs-2 rounded-pill bk-green text-white clamp-padding" >
                          <svg  xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload mx-2 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          {{ props.obj.el4 }}
                           </RouterLink>
                    </div>
                </div>
            </div>
     </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user'
  const userStore= useUserStore()
  const props = defineProps({
  obj:{
    type: Object
  }
})
/* onMounted(()=>{
    if(props.obj.el3 == 'addproject' && userStore.userType == 1){
      con.value = true
    }

}) */
</script>

<style scoped>
.hero{
  padding: 80px 0;
    background: url(@/assets/img/showbook.jpg) no-repeat;
    background-position: center center;
    background-size: cover;
    position: relative;
}
.hero::before{
  content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
}
</style>