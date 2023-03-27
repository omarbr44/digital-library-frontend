<template>
          <Loading v-if="!data" />
      <Book v-for=" bit in data" :data="bit"/> 
</template>

<script setup>
import Book from './mediaCom.vue';
import { watchEffect, ref} from 'vue';
import { useGet } from '../composables/useGet';
import Loading from './Loading.vue';
  const emit = defineEmits(['paginationEmit'])
  const props = defineProps({
        searchValue:{
            type: String,
            default:''
        },
        filterValue:{
            type: [Number,String],
            default:''
        },
        authorValue:{
            type: [Number,String],
            default:''
        },
        currentPageToGet:{
            type: Number,
        }
    })
    const data = ref(null)
    const error = ref(null)
  
    watchEffect(async ()=>{
        const { awaitdata,awaiterror } = await useGet('api/BooK?Search='+props.searchValue+
                                                    '&page='+props.currentPageToGet+'&category='+
                                                    props.filterValue+'&Author='+props.authorValue) 
        console.log(awaitdata.value)
        if(props.authorValue && !props.filterValue)
        data.value = awaitdata.value.data[0].books
        else
        data.value = awaitdata.value.data
        error.value = awaiterror.value
        emit('paginationEmit',awaitdata.value.last_page) // to take how many pages and giv it to pagination
    })
   
   
</script>

<style scoped>
.under-card{
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}
hr{
    margin: 2rem 0;
    margin-left: auto;
    margin-right: auto;
    width: 30%;
    color: var(--bs-seccolor);

}
img{
    cursor: pointer;
    width: 15rem;
    height: 19rem;
}
@media (max-width: 991px){
    img{
    width: 70%;
    height: 100%;
}
}


</style>