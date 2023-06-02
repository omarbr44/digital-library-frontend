<template>
    <Loading v-if="load" />
    <div v-else>
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">اضافة محاضرة</li>
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
                            v-model="lectureObj.name"
                            type="text"
                            label="عنوان المحاضرة"
                            :error="lectureErr.name"
                            required
                            req=1
                        />
                        <BaseInput 
                            v-model="lectureObj.number"
                            type="number"
                            label="رقم المحاضرة"
                            :error="lectureErr.number"
                            req=1
                        />
                        <SelectTyping
                            v-model="subject"
                           label="المادة"
                           :error="lectureErr.subject_id"
                           :list="lisstsubjects"
                           required
                           req=1
                        />
                                                                 
                        <div class="mb-3">
                            <div v-if="lectureErr.description">
                             <div class="alert alert-danger" role="alert">{{ lectureErr.description }}</div>
                            </div>
                            <label  class="form-label"> وصف المحاضرة</label>
                             <textarea maxlength="253" class="form-control rtl"  
                             placeholder="ادخل وصف المحاضرة" v-model="lectureObj.description"></textarea>
                        </div>
                        <FileInput 
                            @filevalue="filevalue"
                            label="ملف المحاضرة"
                            :error="lectureErr.file_path"
                            underDetailes="صيغة الملف zip"
                            required
                            req=1
                             />
                       
                        <div class="d-flex flex-column flex-md-row text-white my-3" >
                            <button  class="btn btn-lg btn-bd-primary mb-3  br-green " >
                                <Loading v-if="loadButton"/>
                                <span v-if="!loadButton">اضافة</span>
                                 <svg v-if="!loadButton" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            </button>
<!--                             <a href="#" class="btn btn-lg mb-3 bk-green text-white mx-4" >الغاء <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
 -->                       </div>
                    </form>
                    </div>
                    <div class="col-12 col-lg-4 flex-center px-0 rounded-2" > 
                       <AddSwiperSection namee="المحاضرة"/>
                    </div>

                </div>
            </div>

           
    
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import BaseInput from '../../components/Form/BaseInput.vue';
import Loading from '../../components/BaseLoading.vue';
import FileInput from '../../components/Form/BaseFileInput.vue';
/* import SelectInput from '../../components/Form/BaseSelectInput.vue';
 */import SelectTyping from '../../components/Form/SelectTyping.vue';
import AddSwiperSection from '../../components/Swiper/AddSwiperSection.vue';
import { usePostMultipart } from '../../composables/usePostMultipart';
import { useGet } from '../../composables/useGet';
import { useRouter,RouterLink } from "vue-router";
import { useUserStore } from '@/stores/user'

    const userStore= useUserStore()
    const router = useRouter()
    const load = ref(true)
    const loadButton = ref(false)
    const subject = ref('')
    const temsubject = ref(null)
    const lectureObj = ref({
        name: '',
        accepted: 0,
        subject_id: '',
        number: null,
        description: '',
        file_path: '',
        user_id:  userStore.userid      
                        })
    const lectureErr = ref({
        name: null,
        accepted: 0,
        subject_id: null,
        number: null,
        description: null,
        file_path: null,
                        })

    const filevalue = (file,label)=>{
        if(label == 'ملف المحاضرة'){
            lectureObj.value.file_path = file;
        }
                                    }        
        const lisstsubjects = ref([])
        onMounted(async()=>{
          const awaitdataSubject = await useGet("api/Subject")
          lisstsubjects.value = awaitdataSubject.awaitdata.value.data
          load.value = false
        })
      
        const submit = async ()=>{
            loadButton.value = true
            lectureErr.value = {
                name: null,
        accepted: 0,
        subject_id: null,
        number: null,
        description: null,
        file_path: null,
                        }
       temsubject.value = lisstsubjects.value.filter((key)=>{
                if(key.name == subject.value)
                 return true
            })
            lectureObj.value.subject_id = temsubject.value[0].id
            let formdata1 = new FormData();
            formdata1.append('name', lectureObj.value.name);
            formdata1.append('accepted', lectureObj.value.accepted);
            formdata1.append('subject_id', lectureObj.value.subject_id);
            formdata1.append('number', lectureObj.value.number);
            formdata1.append('description', lectureObj.value.description);
            formdata1.append('user_id', lectureObj.value.user_id);
            for(let i=0;i<[...lectureObj.value.file_path].length;i++){
            formdata1.append('file_path[]', [...lectureObj.value.file_path][i]);
            }
            const lecture = await usePostMultipart("api/Lecture/store",formdata1)
             if(!lecture.awaitdata.value){
                lectureErr.value = lecture.awaiterror.value
                loadButton.value = false
                Object.keys( lecture.awaiterror.value ).find((e)=>{
                    if(e == 'file_path.0'){
                        lectureErr.value.file_path = 'The file path field must be a file of type: mp4, mov, mkv, MP4.'
                    }
                })
             } else{
                 router.push({
                     name:'showlectures',
                     query:{msg:'تم رفع المحاضرة بنجاح'}
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