<template>
    <div class="mb-3"  >      
                            <div v-if="error">
                            <div class="alert alert-danger" role="alert">{{ error }}</div>
                            </div>
                            <label  class="form-label">{{ label }}</label>
                            <div v-if="!multi" :class="{redstar :req}">
                             <input  type="file" class="form-control rtl" ref="file" multiple
                             @change="$emit('filevalue',$event.target.files[0],label)"
                             v-bind="$attrs"></div>
                             <div v-else :class="{redstar :req}">
                             <input  type="file" class="form-control rtl" ref="file" multiple
                             @change="$emit('filevalue',$event.target.files,label)"
                             v-bind="$attrs"></div>
                             <p class="grey-text ">{{ underDetailes }}</p>
     </div>
   
</template>

<script setup>
import { ref,onMounted } from 'vue';

const props = defineProps({
    label: {
    type: String,
    default: ""
    },
    error: {
    type: [String,Array],
    default: ""
    },
    req: {
        type: [Number,String],
        default: 0
    },
    underDetailes: {
    type: String,
    default: ""
    }
})
const multi = ref(false)
onMounted(()=>{
    if(props.label == 'ملف الكورس' || props.label == 'ملف المحاضرة'){
        multi.value = true
    }

})


</script>
