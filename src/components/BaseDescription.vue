<template>
                         <span >وصف {{ props.what }}:
                            {{ BookDetailsShown }}
                            <p ref="p_element" class="collapse m-0" id="collapseExample">
                                {{ BookDetailshidden }}
                            </p> 

                            <p v-if="BookDetailshidden" @click="ChangeText" class=" green-text show-more" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            {{ BookDetailsButton }}
                            </p>

                         </span>
</template>

<script setup>
import { ref,watchEffect } from 'vue';
const props = defineProps({
    desc:{
        type:String,
        default:''
    },
    what:{
        type:String,
        default:''
    }
})
// splitting the Details for shown and hidden
const BookDetails = ref(null)
const BookDetailsShown = ref(null)
const BookDetailshidden = ref(null)
watchEffect(()=>{
    BookDetails.value = props.desc
    if(BookDetails.value){
        BookDetails.value = BookDetails.value.split(" ");
    BookDetailsShown.value = BookDetails.value.slice(0,7)
    BookDetailshidden.value = BookDetails.value.slice(7,BookDetails.value.length)
    BookDetailsShown.value = BookDetailsShown.value.join(" ")
    BookDetailshidden.value = BookDetailshidden.value.join(" ")
    }
})
   

// changing the content of the button and classing it 
const BookDetailsButton = ref('عرض اكثر v')
const p_element = ref(null)
const ChangeText = ()=>{
        if(BookDetailsButton.value == 'عرض اكثر v' ){
            BookDetailsButton.value = 'عرض اقل ^'
            p_element.value.classList.add("content")
                                                     }
            else{
                BookDetailsButton.value = 'عرض اكثر v'
                p_element.value.classList.remove("content")
                }
                       }

</script>

<style scoped>
.show-more{
    border-bottom: 1px solid var(--bs-seccolor);
    width: fit-content;
    padding: 5px 0;
}
.content{
    display: contents !important;
}
</style>