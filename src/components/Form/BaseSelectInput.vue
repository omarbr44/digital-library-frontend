<template>
    <div >
    <div v-if="error">
        <div class="alert alert-danger" role="alert">{{ error }}</div>
    </div>
    <label class="form-label">{{ label }}</label>
    <div :class="{redstar :req}">
    <select class="form-select mb-3" aria-label="Default select example"  :value="modelValue"  
        @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs">
        <option  disabled>{{ label }}</option>
        <option v-for="key in list" :value="key.id" :key="key.id">{{ key.name || key.Name || key.year   }}</option>
    </select>
</div>
</div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    error: {
        type: String,
        default: ""
    },
    modelValue: {
        type: [String, Number],
        default: ""
    },
    req: {
        type: [Number,String],
        default: 0
    },
    list:{
        type: [Array,Object],
        default: []
    }
})



</script>

<style  scoped></style>