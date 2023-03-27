<template>
    <div>
        <nav aria-label="Page navigation example">
                 <ul  class="pagination justify-content-center">
                     <li v-if="!previous" class="page-item disabled">
                         <a class="page-link">Previous</a>
                     </li>
                     <li v-if="previous" @click="previousMethod" class="page-item ">
                         <a class="page-link" href="#">Previous</a>
                     </li>
                     <li  class="page-item" v-if="previous" @click="previousMethod"><a class="page-link" href="#">{{ previous }}</a></li>
                     <li  class="page-item shadow-sm" ><a class="page-link" href="#">{{ currentPage }}</a></li>
                     <li  class="page-item" v-if="next <= props.pages" @click="nextMethod"><a class="page-link" href="#">{{ next }}</a></li>
                     <li v-if="currentPage!=props.pages" @click="nextMethod" class="page-item">
                         <a  class="page-link" href="#">Next</a>
                     </li>
                     <li v-if="currentPage==props.pages" class="page-item disabled">
                         <a class="page-link">Next</a>
                     </li>
                 </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref,watchEffect } from 'vue';
    const emit = defineEmits((['currentPage']))
    const props = defineProps({
        pages:{
            type:Number
        },
        currentPage:{
            type:Number
        },
    })
    const currentPage = ref(0)
    const previous = ref(0)
    const next = ref(0)
    watchEffect(async ()=>{
        currentPage.value = props.currentPage
        previous.value = props.currentPage-1
        next.value = props.currentPage+1
    })
    const previousMethod = ()=>{
        emit('currentPage',previous.value)
        previous.value = previous.value-1
        currentPage.value = currentPage.value-1
        next.value = next.value-1
    }
    const nextMethod = ()=>{
        emit('currentPage',next.value)
        previous.value = previous.value+1
        currentPage.value = currentPage.value+1
        next.value = next.value+1
    }

    
</script>

<style  scoped>

</style>