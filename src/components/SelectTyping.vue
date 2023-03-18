<template>
    <div class="position-relative">
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{ error }}</div>
        </div>
        <label class="form-label">{{ label }}</label>
        <input class="form-control rtl" :placeholder="label" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs" 
            @keyup="select">
    </div>
    <div v-if="newlisst[0]" class="selectOptions" @click="select">
        <p  @click="$emit('update:modelValue', key.Name)" v-for="key in newlisst" :key="key.id">{{ key.Name }}</p>
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
        type: Array,
        default: []
    }
})
const newlisst = ref([])

// to show names as you write
const select = () => {
    newlisst.value = props.list.filter((e) => {
        if (e.Name.indexOf(props.modelValue) !== -1 && props.modelValue != '') //if the letterd in the input matches the name
            return true
    })
}


</script>

<style scoped>
.selectOptions{
    overflow: scroll;
    height: 5rem;
    overflow-x: hidden;
    scroll-behavior: smooth;
    padding: 5px;
    border: 1px solid #e9e9e9;
    border-left: 0;
    border-top: 0;
    border-radius: 5px;

}
.selectOptions p{
    cursor: pointer;
}
</style>