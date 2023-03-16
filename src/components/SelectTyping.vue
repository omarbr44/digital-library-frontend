<template>
    <div class="mb-3">
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{ error }}</div>
        </div>
        <label class="form-label">اسم الكاتب</label>
        <input class="form-control rtl" placeholder=" اسم الكاتب" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs" 
            @keyup="select">
    </div>
    <div>
        <p  @click="select,$emit('update:modelValue', key)" v-for="key in newlisst" :key="key">{{ key }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
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
    list: {
        type: Array
    }
})
const newlisst = ref([])

const select = () => {
    newlisst.value = props.list.filter((e) => {
        if (e.indexOf(props.modelValue) !== -1 && props.modelValue != '')
            return true
    })
    console.log(newlisst.value)
}


</script>

<style scoped></style>