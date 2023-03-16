<template>
    <Loading v-if="!data" />
    <div v-else class="row my-5 justify-content-center" >
                    <div class="sec-order col-12 col-lg-7 rtl gy-5"  >  
                        <h2 class="my-3">تعلم البرمجة خطوة بخطوة</h2>
                        <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>
                        <h5 class="my-3">المؤلف: محمد عبدالله احمد</h5>
                        <h5>الناشر: محمد عبدالله احمد</h5>
                        <h6>حجم الكتاب :300ميقابايت</h6>
                        <div class="my-3">
                            <Description />
                        </div>
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a href="#" class="btn btn-lg btn-bd-primary mb-3  br-green " >تحميل الكتاب <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>
                            <a href="#" class="btn btn-lg btn-bd-primary mb-3 mx-3 br-green " > تحميل الكتاب الصوتي <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>
                            <!-- <a href="#" class="btn btn-lg mb-3 bk-green text-white mx-4" >استعارة <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></a> -->
                       </div>   
                       
                    </div>
                    <div class=" col-lg-1"  ></div>
                    <div class="col-10 col-lg-4 " >  
                        <p class="text-center green-text fw-bold">هذا الكتاب يحتوي على كتاب صوتي</p>
                       <img src="../assets/img/download.jpg" class="shadow-sm p-3 bg-body"   alt="book"  style="width: 100%;">
                    </div>
                </div>
</template>

<script setup>
import { watchEffect,ref } from "vue";
import Description from "../components/Description.vue";
import { useGetDetailes } from '../composables/useGetDetailes';
import Loading from "./Loading.vue";
    const props = defineProps({
        id:{
            type:String
        }
    })
    const data = ref(null)
    const error = ref(null)

        watchEffect(async()=>{
            const { awaitdata,awaiterror } = await useGetDetailes(props.id) 
            data.value = awaitdata.value
            error.value = awaiterror.value
        })
        
    </script>

<style scoped>
@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
}
</style>