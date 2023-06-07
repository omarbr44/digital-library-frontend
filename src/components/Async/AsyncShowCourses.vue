<template>
    <Loading v-if="!data" />
<Course v-for=" bit in data" :data="bit" Details="coursedetails"/> 
</template>

<script setup>
import Course from '../mediaCom.vue';
import { watchEffect, ref, onMounted} from 'vue';
import { useGet } from '../../composables/useGet';
import Loading from '../BaseLoading.vue';
import { useRoute } from 'vue-router';
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
  currentPageToGet:{
      type: Number,
  },
  refreshPaginat:{
            type: Boolean,
        }
})
const data = ref(null)
const error = ref(null)
const pagetoget = ref(1)
const msgg = ref(null)
onMounted(()=>{
    if(useRoute().query.msgg){
            msgg.value = useRoute().query.msgg
    }
})
watchEffect(async ()=>{
    data.value = null
    if(props.refreshPaginat === false ){
         pagetoget.value = props.currentPageToGet
     }
    else{
        pagetoget.value = 1 
    }
    if(msgg.value){
        const { awaitdata,awaiterror } = await useGet('api/Course?like=courses.name,'+props.searchValue+
                                                    '&page='+pagetoget.value+'&category_id='+
                                                    props.filterValue+'&accepted='+0) 
                                                    data.value = awaitdata.value.data
                                                    error.value = awaiterror.value
                                                    emit('paginationEmit',awaitdata.value.last_page) // to take how many pages and giv it to pagination
                             }
    else{
        const { awaitdata,awaiterror } = await useGet('api/Course?like=courses.name,'+props.searchValue+
                                                    '&page='+pagetoget.value+'&category_id='+
                                                    props.filterValue) 
                                                    data.value = awaitdata.value.data
                                                    error.value = awaiterror.value
                                                    emit('paginationEmit',awaitdata.value.last_page)
    }
})

</script>

