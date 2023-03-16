<template>
    <div class="mb-3">      
                            <div v-if="error">
                            <div class="alert alert-danger" role="alert">{{ error }}</div>
                            </div>
                            <label  class="form-label">{{ label }}</label>
                             <input type="file" class="form-control rtl" ref="file" 
                             @change="$emit('filevalue',$event.target.files[0],label)"
                             v-bind="$attrs">
                             <p @click="aa" class="grey-text ">{{ underDetailes }}</p>
     </div>
   
</template>

<script setup>
defineProps({
    label: {
    type: String,
    default: ""
    },
    error: {
    type: String,
    default: ""
    },
    underDetailes: {
    type: String,
    default: ""
    }
})

</script>
