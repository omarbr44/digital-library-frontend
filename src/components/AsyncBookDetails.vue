<template>
    <Loading v-if="!data" />
    <div v-else class="row my-5 justify-content-center" >
                    <div class="sec-order col-12 col-lg-7 rtl gy-5"  >  
                        <h2 class="my-3">{{ data[0].name }}</h2>
                        <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">{{ category[0].name }}</button>
                        <h5 v-for="key in author" class="my-3" :key="key.name">المؤلف: {{ key.name }}</h5>
                        <h5>الناشر: {{ publisher[0].name }}</h5>
                        <h6 v-if="data[0].size_Book">حجم الكتاب :{{ data[0].size_Book }}</h6>
                        <div class="my-3">
                            <Description :desc="data[0].description" />
                        </div>
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a :href="url+data[0].file_path" class="btn btn-lg btn-bd-primary mb-3  br-green " >تحميل الكتاب <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>
                            <a v-if="data[0].book_audio" :href="url+data[0].book_audio" class="btn btn-lg btn-bd-primary mb-3 mx-3 br-green " > تحميل الكتاب الصوتي <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>
                       </div>   
                       
                    </div>
                    <div class=" col-lg-1"  ></div>
                    <div class="col-10 col-lg-4 " >  
                        <p v-if="data[0].book_audio" class="text-center green-text fw-bold">هذا الكتاب يحتوي على كتاب صوتي</p>
                       <img :src="url+data[0].image" class="shadow-sm p-3 bg-body"   alt="book"  style="width: 100%;">
                    </div>
                </div>
</template>

<script setup>
import { watchEffect,ref } from "vue";
import Description from "../components/Description.vue";
import { useGet } from '../composables/useGet';
import Loading from "./Loading.vue";
import geturl from '../composables/geturl';

    const emit = defineEmits(['similarBooks'])
    const props = defineProps({
        id:{
            type:[String,Number]
        }
    })
    const url = geturl()
    const data = ref(null)
    const similarBooks = ref(null)
    const author = ref(null)
    const publisher = ref(null)
    const category = ref(null)
    const error = ref(null)

        watchEffect(async()=>{
            const { awaitdata,awaiterror } = await useGet('api/BooK/show/'+props.id) 
            data.value = awaitdata.value[0]
            author.value= awaitdata.value[2]
            category.value= awaitdata.value[3]
            publisher.value = awaitdata.value[4]
            similarBooks.value = awaitdata.value[1]
            window.scrollTo(0,0)
            console.log(awaitdata.value,similarBooks.value)
            error.value = awaiterror.value
            emit('similarBooks',similarBooks.value)
        })
        
    </script>

<style scoped>
@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
}
</style>