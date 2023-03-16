<template>
    <div v-if="error">
        <div class="alert alert-danger" role="alert">{{ error }}</div>
    </div>
    <label class="form-label">{{ label }}</label>
    <select class="form-select mb-3" aria-label="Default select example" required :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs">
        <option selected disabled>{{ label }}</option>
        <option value="1">برمجة</option>
        <option value="2">شبكات</option>
        <option value="3">صيانة</option>
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
})


</script>

<style  scoped></style>