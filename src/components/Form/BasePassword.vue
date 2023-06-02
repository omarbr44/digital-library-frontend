<template>
    <div class="mb-3" >
        <div v-if="error">
         <div class="alert alert-danger" role="alert">{{ error }}</div>
        </div>
        <label style="width: 100%;" class="form-label rtl">{{ label }}</label>
        <img @click="showOrhide"  class="passwordIcon" :src="eye" alt="">
         <input 
            class="form-control rtl"
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
            :type="password"
         >
    </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
label: {
type: String,
default: ""
},
error: {
type: [String,Array],
default: ""
},
modelValue: {
type: [String,Number],
default: ""
},
})
const password = ref('password')
const eye = ref('src/assets/img/hide.png')
const showOrhide = ()=>{
    password.value = password.value == 'password' ? 'text' : 'password'
    eye.value = eye.value == 'src/assets/img/hide.png' ? 'src/assets/img/show.png' : 'src/assets/img/hide.png'
}

</script>
<style scoped>
.passwordIcon{
width: 1.7rem;
position: absolute;
left: 10px;
bottom: 5px;
z-index: 2;
cursor: pointer;
}
</style>