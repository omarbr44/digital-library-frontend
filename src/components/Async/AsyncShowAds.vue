<template>
    <Loading v-if="!data" />
<Ads v-for=" bit in data" :data="bit" Details="adsdetailes"/> 
</template>

<script setup>
import Ads from '../mediaCom.vue';
import { watchEffect, ref} from 'vue';
import { useGet } from '../../composables/useGet';
import Loading from '../BaseLoading.vue';
const emit = defineEmits(['paginationEmit'])
const data = ref(null)
const error = ref(null)

watchEffect(async ()=>{                
      const { awaitdata,awaiterror } = await useGet('api/Advertisement')
  data.value = awaitdata.value
  error.value = awaiterror.value
})


</script>
