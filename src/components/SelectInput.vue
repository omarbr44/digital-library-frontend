<template>
    <div v-if="error">
        <div class="alert alert-danger" role="alert">{{ error }}</div>
    </div>
    <label class="form-label">{{ label }}</label>
    <select class="form-select mb-3" aria-label="Default select example" required :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs">
        <option selected disabled>{{ label }}</option>
        <option v-for="key in list" :value="key.id" :key="key.id">{{ key.name }}</option>
    </select>
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
    list:{
        type: Array,
        default: []
    }
})


</script>

<style  scoped></style>