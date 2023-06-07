<template>
    <Loading v-if="load" />
    <div v-else>
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">اضافة دورة</li>
                <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{course_name:'Home'}">الرئيسية</RouterLink></li>
             </ol>
        </nav> 
        <div class=" px-4 px-md-3" >
                <div class="row mt-3" style="justify-content: space-between;">
                    <div class="col-lg-1"  >  
                    </div>
                    <div class="sec-order col-12 col-lg-6 rtl gy-3 "  >  
                        <form @submit.prevent="submit" >
                        <BaseInput 
                            v-model="courseObj.course_name"
                            type="text"
                            label="عنوان الدورة"
                            :error="courseErr.course_name"
                            required
                            req=1
                        />
                      
                        <SelectInput 
                            v-model="courseObj.category_id"
                            label="قسم الدورة"
                            :error="courseErr.category_id"
                            :list="lisstCategory"
                            required
                            req=1
                        />                      
                        <div class="mb-3">
                            <div v-if="courseErr.course_description">
                             <div class="alert alert-danger" role="alert">{{ courseErr.course_description }}</div>
                            </div>
                            <label  class="form-label"> وصف الدورة</label>
                             <textarea maxlength="253" class="form-control rtl"  
                             placeholder="ادخل وصف الدورة" v-model="courseObj.course_description"></textarea>
                        </div>
                        <FileInput 
                            @filevalue="filevalue"
                            label="صورة للدورة"
                            :error="courseErr.image"
                            underDetailes="صيغة الصورة JPG,PNG"
                            required
                            req=1
                             />
                        <FileInput 
                            @filevalue="filevalue"
                            label="ملف الدورة"
                            :error="courseErr.file_path"
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
                       <AddSwiperSection namee="الدورة"/>
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
import SelectInput from '../../components/Form/BaseSelectInput.vue';
import AddSwiperSection from '../../components/Swiper/AddSwiperSection.vue';
import { usePostMultipart } from '../../composables/usePostMultipart';
import { useGet } from '../../composables/useGet';
import { useRouter,RouterLink } from "vue-router";

    const router = useRouter()
    const load = ref(true)
    const loadButton = ref(false)
    const courseObj = ref({
        course_name: '',
        accepted: 0,
        category_id: '',
        course_description: '',
        file_path: '',
        image:''
                        })
    const courseErr = ref({
        course_name: null,
        accepted: 0,
        category_id: null,
        course_description: null,
        file_path: null,
        image:null
                        })


    const filevalue = (file,label)=>{
        if(label == 'ملف الدورة'){
            courseObj.value.file_path = file;
        }
       else if(label == 'صورة للدورة'){
            courseObj.value.image = file;
        }
                                    }        
        const lisstCategory = ref([])
        onMounted(async()=>{
          const awaitdataCategory = await useGet("api/Category")
          lisstCategory.value = awaitdataCategory.awaitdata.value
          load.value = false
        })
      
        const submit = async ()=>{
            loadButton.value = true
            courseErr.value = {
                course_name: null,
        accepted: 0,
        category_id: null,
        course_description: null,
        file_path: null,
        image: null,
                        }
            
            let formdata1 = new FormData();
            formdata1.append('course_name', courseObj.value.course_name);
            formdata1.append('accepted', courseObj.value.accepted);
            formdata1.append('category_id', courseObj.value.category_id);
            formdata1.append('course_description', courseObj.value.course_description);
            formdata1.append('image', courseObj.value.image);
            for(let i=0;i<[...courseObj.value.file_path].length;i++){
            formdata1.append('file_path[]', [...courseObj.value.file_path][i]);
            }
            const course = await usePostMultipart("api/Course/store",formdata1)
             if(!course.awaitdata.value){
                courseErr.value = course.awaiterror.value
                loadButton.value = false
                Object.keys( course.awaiterror.value ).find((e)=>{
                    if(e == 'file_path.0'){
                        courseErr.value.file_path = 'The file path field must be a file of type: mp4, mov, mkv, MP4.'
                    }
                })
             } 
             else{
                loadButton.value = false
                router.push({
                    name:'showcourses',
                    query:{msg:' تم ارسال الدورة بنجاح، بإنتظار موافقة إدارة الموقع'}
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