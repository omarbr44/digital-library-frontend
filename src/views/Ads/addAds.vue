<template>
    <div >
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">اضافة اعلان</li>
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
                            v-model="adsObj.title"
                            type="text"
                            label="عنوان الاعلان "
                            :error="adsErr.title"
                            required
                            req=1
                        />

                        <div class="mb-3">
                            <div v-if="adsErr.description">
                             <div class="alert alert-danger" role="alert">{{ adsErr.description }}</div>
                            </div>
                            <label  class="form-label"> وصف الاعلان</label>
                             <textarea maxlength="253" class="form-control rtl"  
                             placeholder="ادخل وصف الاعلان" v-model="adsObj.description"></textarea>
                        </div>
                        <FileInput 
                            @filevalue="filevalue"
                            label="صورة الاعلان"
                            :error="adsErr.image"
                            underDetailes="صيغة الصورة JPG,PNG"
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
                       <AddSwiperSection namee="اعلان"/>
                    </div>

                </div>
            </div>

           
    
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '@/components/Form/BaseInput.vue';
import Loading from '@/components/BaseLoading.vue';
import FileInput from '@/components/Form/BaseFileInput.vue';
import AddSwiperSection from '@/components/Swiper/AddSwiperSection.vue';
import { usePostMultipart } from '@/composables/usePostMultipart';
import { useRouter,RouterLink } from "vue-router";

    const router = useRouter()
    const loadButton = ref(false)
    const adsObj = ref({
        title: '',
        image: '',
        description	: '',
                        })
    const adsErr = ref({
        title: null,
        image: null,
        description	: null,
                        })
        const filevalue = (file,label)=>{
            adsObj.value.image = file;
                                    } 
        const submit = async ()=>{
            loadButton.value = true
            adsErr.value = {
                title: null,
                 image: null,
                 description: null,
                        }
            let formdata1 = new FormData();
            formdata1.append('title', adsObj.value.title);
            formdata1.append('image', adsObj.value.image);
            formdata1.append('description', adsObj.value.description);
            
            const Advertisement = await usePostMultipart("api/Advertisement/store",formdata1)
            if(!Advertisement.awaitdata.value){
                adsErr.value = Advertisement.awaiterror.value
                loadButton.value = false
            } else{
                       loadButton.value = false
                        router.push({
                       name:'showads',
                       query:{msg:'تم اضافة الاعلان بنجاح'}
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