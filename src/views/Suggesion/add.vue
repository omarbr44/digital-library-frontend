<template>
    <div >
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">اضافة اقتراح</li>
                <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
             </ol>
        </nav> 
        <div class=" px-4 px-md-3" >
                <div class="row mt-3" style="justify-content: space-between;">
                    <div class="col-lg-1"  >  
                    </div>
                    <div class="sec-order col-12 col-lg-6 rtl gy-3 "  >  
                        <form @submit.prevent="submit" >
                        <BaseInput 
                            v-model="sugObj.suggestion"
                            type="text"
                            label=" الاقتراح "
                            :error="sugErr.suggestion"
                            required
                            req=1
                        />

                       
                        <div class="d-flex flex-column flex-md-row text-white my-3" >
                            <button  class="btn btn-lg btn-bd-primary mb-3  br-green " >
                                <Loading v-if="loadButton"/>
                                <span v-if="!loadButton">اضافة</span>
                                 <svg v-if="!loadButton" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            </button>
                        </div>
                    </form>
                    </div>
                    <div class="col-12 col-lg-4 flex-center px-0 rounded-2" > 
                       <AddSwiperSection namee="اقتراح"/>
                    </div>

                </div>
            </div>

           
    
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '@/components/Form/BaseInput.vue';
import Loading from '@/components/BaseLoading.vue';
import AddSwiperSection from '@/components/Swiper/AddSwiperSection.vue';
import { usePostMultipart } from '@/composables/usePostMultipart';
import { useRouter,RouterLink } from "vue-router";

    const router = useRouter()
    const loadButton = ref(false)
    const sugObj = ref({
        suggestion: '',
                        })
    const sugErr = ref({
        suggestion: null,
                        })
        const submit = async ()=>{
            loadButton.value = true
            sugErr.value = {
                suggestion: null,
                        }
            let formdata1 = new FormData();
            formdata1.append('suggestion', sugObj.value.suggestion);
            
            const Sug = await usePostMultipart("api/Suggestion/store",formdata1)
            if(!Sug.awaitdata.value){
                sugErr.value = Sug.awaiterror.value
                loadButton.value = false
            } else{
                       loadButton.value = false
                        router.push({
                       name:'Home',
                       query:{msg:'تم اضافة الاقتراح بنجاح'}
                   })  
             } 
            } 
        
 </script>


<style  scoped>
@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
}
</style>


<style scoped>

</style>