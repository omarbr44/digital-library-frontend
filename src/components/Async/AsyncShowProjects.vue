<template>
    <Loading v-if="!data" />
<Project v-for=" bit in data" :data="bit" Details="projectdetails"/> 
</template>

<script setup>
import Project from '../mediaCom.vue';
import { watchEffect, ref} from 'vue';
import { useGet } from '../../composables/useGet';
import Loading from '../BaseLoading.vue';
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
        },
  year:{
            type: [Number,String],
            default:''
        }
})
const data = ref(null)
const error = ref(null)
const pagetoget = ref(1)

watchEffect(async ()=>{
    data.value = null
    if(props.refreshPaginat === false ){
         pagetoget.value = props.currentPageToGet
     }
    else{
        pagetoget.value = 1 
    }
  const { awaitdata,awaiterror } = await useGet('api/Project/?like=projects.title,'+props.searchValue+
                                              '&page='+pagetoget.value+'&department_id='+
                                              props.filterValue+'&academic_year_id='+props.year) 
  data.value = awaitdata.value.data
  error.value = awaiterror.value
  emit('paginationEmit',awaitdata.value.last_page) // to take how many pages and giv it to pagination
})

</script>

