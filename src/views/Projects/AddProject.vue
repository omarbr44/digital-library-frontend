<template>
    <Loading v-if="load" />
    <div v-else>
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7; margin-top: 7rem;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">اضافة مشروع</li>
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
                            v-model="projectObj.title"
                            type="text"
                            label="عنوان المشروع"
                            :error="projectErr.title"
                            required
                            req=1
                        />
                        <BaseInput 
                            v-model="projectObj.number"
                            type="number"
                            label="رقم المشروع"
                            :error="projectErr.number"
                            required
                            req=1
                        />
                        <BaseInput 
                            v-model="projectObj.supervisor"
                            type="text"
                            label="مشرف المشروع"
                            :error="projectErr.supervisor"
                            required
                            req=1
                        />
                       <div v-for=" key in counter">
                           <SelectTyping 
                           v-model="uploadTeam[key-1]"
                           label="اسم العضو"
                           error=""
                           :list="lisstTeam"
                           required
                           req=1
                           />
                           <span class="SelectXicon" v-if="key>1" @click="cancel(key-1)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                        </div>
                        <div class="mb-2"><a style="cursor: pointer;" @click="newTeam">إضافة عضو آخر؟</a></div>

                        <SelectInput 
                            v-model="projectObj.academic_year_id"
                            label="سنة المشروع"
                            :error="projectErr.academic_year_id"
                            :list="lisstacademic_year_id"
                            required
                            req=1
                        />                      
                        <SelectInput 
                            v-model="projectObj.department_id"
                            label="قسم المشروع"
                            :error="projectErr.department_id"
                            :list="lisstdepartment_id"
                            required
                            req=1
                        />          
                        <SelectInput 
                            v-model="projectObj.level"
                            label=" المستوى"
                            :error="projectErr.level"
                            :list="[
                                {id:'4' ,name:'4'},
                                {id:'5' ,name:'5'},
                                ]"
                            required
                            req=1
                        />          

                        <div class="mb-3">
                            <div v-if="projectErr.description">
                             <div class="alert alert-danger" role="alert">{{ projectErr.description }}</div>
                            </div>
                            <label  class="form-label"> وصف المشروع</label>
                             <textarea maxlength="253" class="form-control rtl"  
                             placeholder="ادخل وصف المشروع" v-model="projectObj.description"></textarea>
                        </div>
                        <FileInput 
                            @filevalue="filevalue"
                            label="صورة للمشروع"
                            :error="projectErr.image"
                            underDetailes="صيغة الصورة JPG,PNG"
                             />
                        <FileInput 
                            @filevalue="filevalue"
                            label="ملف المشروع"
                            :error="projectErr.file_path"
                            underDetailes="صيغة الملف pdf"
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
                       <AddSwiperSection namee="المشاريع"/>
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
import SelectTyping from '../../components/Form/SelectTyping.vue';
import { usePost } from '../../composables/usePost';
import { usePostMultipart } from '../../composables/usePostMultipart';
import { useGet } from '../../composables/useGet';
import { useRouter,RouterLink } from "vue-router";

    const router = useRouter()
    const load = ref(true)
    const loadButton = ref(false)
    const projectObj = ref({
        title: '',
        supervisor: '',
        level: '',
        department_id: 0,
        academic_year_id: '',
        number: null,
        description: '',
        file_path: '',
        image: null,
                        })
    const projectErr = ref({
        title: null,
        supervisor: null,
        level: null,
        department_id: null,
        academic_year_id: null,
        number: null,
        description: null,
        file_path: null,
        image: null,
                        })
  
    const filevalue = (file,label)=>{
        if(label == 'ملف المشروع'){
            projectObj.value.file_path = file;
        }
       else if(label == 'صورة للمشروع'){
            projectObj.value.image = file;
        }
       
                                    }        
        const lisstacademic_year_id = ref([])
        const lisstTeam = ref([]) 
        const lisstdepartment_id = ref([]) 
        onMounted(async()=>{
          const awaitdataAcademicYear = await useGet("api/AcademicYear")
          lisstacademic_year_id.value = awaitdataAcademicYear.awaitdata.value
          const awaitdatadepartment_id = await useGet("api/Department")
          lisstdepartment_id.value = awaitdatadepartment_id.awaitdata.value
          const awaitdataTeam = await useGet("api/Team")
          lisstTeam.value = awaitdataTeam.awaitdata.value
          load.value = false
        })
        const uploadTeam = ref(['']) // team to upload to team database table
        const Teamids = ref([])         // returned Teamids from Authors database table
        const projectid = ref(null)         // returned projectid from book database table after submit
        const counter = ref(1)
        const newTeam = ()=>{
            counter.value++
            uploadTeam.value.push('')
        }
        const cancel = (key)=>{
            uploadTeam.value.splice(key,1)
            counter.value--
        }

        const submit = async ()=>{
            loadButton.value = true
            projectErr.value = {
                title: null,
                supervisor: null,
                level: null,
        department_id: null,
        academic_year_id: null,
        number: null,
        description: null,
        file_path: null,
        image: null,
                        }
      
            for(let i=0;i<uploadTeam.value.length;++i){
                const teamid = await usePost("api/Team/store",{name:uploadTeam.value[i]})
                Teamids.value[i] =  teamid.awaitdata.value
                loadButton.value =  teamid.load.value
            } 
            let formdata1 = new FormData();
            formdata1.append('title', projectObj.value.title);
            formdata1.append('level', projectObj.value.level);
            formdata1.append('supervisor', projectObj.value.supervisor);
            formdata1.append('department_id', projectObj.value.department_id);
            formdata1.append('academic_year_id', projectObj.value.academic_year_id);
            formdata1.append('number', projectObj.value.number);
            formdata1.append('description', projectObj.value.description);
            formdata1.append('file_path', projectObj.value.file_path);
            formdata1.append('image', projectObj.value.image);
            //  add project to project table
            const project = await usePostMultipart("api/Project/store",formdata1)
            if(project.awaitdata.value)
            projectid.value = project.awaitdata.value.number
            else
            projectErr.value = project.awaiterror.value
            loadButton.value = project.load.value

            // finally add team_project
           const team_projectState = ref(null)
           const team_projectStateerr = ref(null)
            for(let i=0;i<uploadTeam.value.length;++i){
                console.log(Teamids.value[i],projectid.value)
                const messge = await usePost("api/TeamProject/store",{team_id:Teamids.value[i],
                    project_number:projectid.value})
                team_projectState.value = messge.awaitdata.value
                team_projectStateerr.value = messge.awaiterror.value
                loadButton.value = messge.load.value
            }
             if(team_projectState.value.id != null ){
                loadButton.value = false
                router.push({
                    name:'showprojects',
                    query:{msg:' تم اضافة المشروع بنجاح'}
                }) 
            } 
        }
 </script>


<style  scoped>
.SelectXicon{
    position: absolute;
    top: 37px;
    left: 8px;
    cursor: pointer;
}
@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
}
</style>