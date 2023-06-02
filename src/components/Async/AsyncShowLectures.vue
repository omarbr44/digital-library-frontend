<template>
<Lecture v-for=" bit in data" :data="bit" Details="lecturedetails"/> 
</template>

<script setup>
import Lecture from '../mediaCom.vue';
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
  user_id:{
      type: [Number,String],
      default:''
  },
  department_id:{
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

watchEffect(async ()=>{                      // so if we select an author while we are at the 2 page
                                          // the page to get will refresh 
  if(props.refreshPaginat === false ){
   pagetoget.value = props.currentPageToGet
}
else{
  pagetoget.value = 1 
}
  const { awaitdata,awaiterror } = await useGet('api/Lecture?like=lectures.name,'+props.searchValue+
                                              '&page='+pagetoget.value+'&subject_id='+
                                              props.filterValue+'&department_id='+props.department_id+'&user_id='+props.user_id) 
  console.log(awaitdata.value)
  if(props.filterValue){
    data.value = awaitdata.value.data
  }
  error.value = awaiterror.value
  emit('paginationEmit',awaitdata.value.last_page) // to take how many pages and giv it to pagination
})

</script>
