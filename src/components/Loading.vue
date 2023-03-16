<template>
    <div  style="width: 100%;
    align-items: center;" class="d-flex justify-content-center">
  <div class="spinner-border" :class="{white: iswhite}" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
</template>
<script setup>
  const props = defineProps({
    iswhite:{
      type:Boolean,
      default:false
    }
  })
  
</script>
<style scoped>
.white{
  color: white;
}
</style>