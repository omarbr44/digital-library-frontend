<template>
    <div class="position-relative">
        <div v-if="error">
            <div class="alert alert-danger" role="alert">{{ error }}</div>
        </div>
        <label class="form-label">{{ label }}</label>
        <div :class="{redstar :req}">
        <input class="form-control rtl" :placeholder="label" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs" 
            @keyup="select">
            </div>
    </div>
    <div v-if="newlisst[0]" class="selectOptions" @click="select">
<!--       <p  @click="$emit('update:modelValue', key.name)" v-for="key in newlisst" :key="key.id">{{ key.name }}</p>
 -->      <p  @click.stop="textClick(key.name)" v-for="key in newlisst" :key="key.id">{{ key.name }}</p>
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
        type: [String,Array],
        default: null
    },
    modelValue: {
        type: [String, Number],
        default: ""
    },
    req: {
        type: [Number,String],
        default: 0
    },
    list: {
        type: Array,
        default: []
    }
})
const newlisst = ref([])
const emit = defineEmits((['update:modelValue']))

// to show names as you write
const select = () => {
    newlisst.value = props.list.filter((e) => {
        if (e.name.indexOf(props.modelValue) != -1 && props.modelValue != '') //if the letterd in the input matches the name
            return true
    })
}
const textClick = (name) => {
    emit('update:modelValue', name)
    newlisst.value = []
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