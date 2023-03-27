<template>
                        <div class="mb-3">
                            <div v-if="error">
                             <div class="alert alert-danger" role="alert">{{ error }}</div>
                            </div>
                            <label  class="form-label">{{ label }}</label>
                             <input 
                                class="form-control rtl"
                                :placeholder="label"
                                :value="modelValue"
                                @input="$emit('update:modelValue', $event.target.value)"
                                v-bind="$attrs"
                                
                             >
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
    modelValue: {
        type: [String,Number],
        default: ""
    },
})
</script>

<style  scoped>

</style>