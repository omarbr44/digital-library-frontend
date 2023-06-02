<template>
    <Loading v-if="load" />
    <div v-else>
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">اضافة برنامج</li>
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
                            v-model="subjectObj.name"
                            type="text"
                            label="اسم المادة"
                            :error="subjectErr.name"
                            required
                            req=1
                        />
                      
                        <SelectInput 
                            v-model="department"
                            label="القسم "
                            :error="subjectErr.category_id"
                            :list="lisstDepart"
                            required
                            req=1
                        /> 
                        <SelectInput
                            v-model="subjectObj.semester"
                            label="الفصل"
                            :list="[{name:'المستوى الاول(الترم الاول)',id:1},{name:'المستوى الاول(الترم الترم الثاني)',id:2},
                                    {name:'المستوى الثاني(الترم الاول)',id:3},{name:'المستوى الثاني(الترم الثاني)',id:4},
                                    {name:'المستوى الثالث(الترم الاول)',id:5},{name:'المستوى الثالث(الترم الثاني)',id:6},
                                    {name:'المستوى الرابع(الترم الاول)',id:7},{name:'المستوى الرابع(الترم الثاني)',id:8},
                                    {name:'المستوى الخامس(الترم الاول)',id:9},{name:'المستوى الخامس(الترم الثاني)',id:10}]"
                            required
                            req=1
                            :error="subjectErr.semester"
                        />                     
                        <SelectInput
                            v-model="year"
                            label="السنة"
                            :list="years"
                            required
                            req=1
                            :error="subjectErr.category_id"
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
                       <AddSwiperSection namee="المادة"/>
                    </div>

                </div>
            </div>

           
    
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import BaseInput from '../components/Form/BaseInput.vue';
import Loading from '../components/BaseLoading.vue';
import SelectInput from '../components/Form/BaseSelectInput.vue';
import AddSwiperSection from '../components/Swiper/AddSwiperSection.vue';
import { useGet } from '../composables/useGet';
import { usePost } from '../composables/usePost';
import { useRouter,RouterLink } from "vue-router";

    const router = useRouter()
    const load = ref(true)
    const loadButton = ref(false)
    const subjectObj = ref({
        name: '',
        semester: '',
                        })
    const subjectErr = ref({
        name: null,
        semester: null,
                        })
      
        const lisstDepart = ref([])
        const department = ref(null)
        const years = ref([])
        const year = ref(null)
        onMounted(async()=>{
          const awaitdataCategory = await useGet("api/Department")
          lisstDepart.value = awaitdataCategory.awaitdata.value
          const { awaitdata, awaiterror } = await useGet("api/AcademicYear")
          years.value = awaitdata.value
          load.value = false
        })
      
        const submit = async ()=>{
            loadButton.value = true
            subjectErr.value = {
                name: null,
        semester: null,
                        }
            let formdata1 = new FormData();
            formdata1.append('name', subjectObj.value.name);
            formdata1.append('semester', subjectObj.value.semester);
            
            const subject = await usePost("api/Subject/store",formdata1)
            if(!subject.awaitdata.value){
                subjectErr.value = subject.awaiterror.value
                loadButton.value = false
            } else{
                 const SubjectDepartment = await usePost("api/SubjectDepartment/store",{subject_id: subject.awaitdata.value,
                                                                                         department_id: department.value })
                        
                 const AcademicyearSubject = await usePost("api/AcademicyearSubject/store",{subject_id: SubjectDepartment.awaitdata.value.subject_id,
                                                                                        academic_year_id: year.value })
                    
                    if(AcademicyearSubject.awaitdata.value){
                        loadButton.value = false
                        router.push({
                       name:'showlectures',
                       query:{msg:'تم اضافة المادة بنجاح، بإمكانك الان اضافة محاضرات للمادة'}
                   }) 
                    }
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