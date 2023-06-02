<template>
    <div class="filtering">
             <div class="container px-4 px-md-3" >
                <div class="row my-5" >
                    <div class="col-3 col-lg-1 "  >  
                    <button class="btn  bk-green text-white" @click="$emit('search',searchValue)">ابحث</button>
                    </div>
                    <div class="col-9 col-lg-3"  >  
                        <div class="mb-3 search">
                             <input type="text" class="form-control rtl"  placeholder="ابحث ..." v-model="searchValue">
                        </div>
                    </div>
                    <div class=" col-lg-2"  >  
                       
                    </div>
                    <div class="col-12 col-lg-6 rtl ">  
                            <img src="../assets/img/edit.png" alt="filter" @click="displayFilters=!displayFilters" class="mx-3" style="width:2rem"  role="button">
<!--                         <button v-if="filterValue" type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">{{filterValue}}</button>    
 -->                    </div>
                 </div>
                <div class="row my-5" :class="{hide:!displayFilters}" >
                    <!-- <div v-if="router.currentRoute.value.name == 'showbooks'" class="col-6 rtl">
                        <SelectInput
                            v-model="filterValue"
                            label="الصنف"
                            :list="categories"
                        />
                    </div> -->
                    <div v-if="cata" class="col-12 rtl">
                        <SelectInput
                            v-model="filterValue"
                            label="الصنف"
                            :list="categories"
                        />
                    </div>
                    <div v-if="router.currentRoute.value.name == 'showprojects'" class="col-6 rtl">
                        <SelectInput
                            v-model="filterValue"
                            label="القسم"
                            :list="categories"
                        />
                    </div>
                    <div v-if="router.currentRoute.value.name == 'showprojects'" class="col-6 rtl">
                        <SelectInput
                            v-model="authorValue"
                            label="السنة"
                            :list="yearValue"
                            
                        />
                    </div>
                    <div v-if="router.currentRoute.value.name == 'showbooks'" class="col-12 rtl">
                        <SelectInput
                            v-model="authorValue"
                            label="الكاتب"
                            :list="authors"
                        />
                    </div>
                    <div v-if="router.currentRoute.value.name == 'showlectures'" class="col-12 rtl">
                        <SelectInput
                            v-model="department_id"
                            label="القسم"
                            :list="categories"
                        />
                    </div>
                    <div v-if="router.currentRoute.value.name == 'showlectures'" class="col-12 rtl">
                        <SelectInput
                            v-model="semester"
                            label="الفصل"
                            :list="[{name:'المستوى الاول(الترم الاول)',id:1},{name:'المستوى الاول(الترم الترم الثاني)',id:2},
                                    {name:'المستوى الثاني(الترم الاول)',id:3},{name:'المستوى الثاني(الترم الثاني)',id:4},
                                    {name:'المستوى الثالث(الترم الاول)',id:5},{name:'المستوى الثالث(الترم الثاني)',id:6},
                                    {name:'المستوى الرابع(الترم الاول)',id:7},{name:'المستوى الرابع(الترم الثاني)',id:8},
                                    {name:'المستوى الخامس(الترم الاول)',id:9},{name:'المستوى الخامس(الترم الثاني)',id:10}]"
                        />
                    </div>
                    <div v-if="router.currentRoute.value.name == 'showlectures' && department_id && semester" class="col-12 rtl">
                        <SelectInput
                            v-model="filterValue"
                            label="المادة"
                            :list="subjects"
                        />
                    </div>
                    <!-- <div v-if="router.currentRoute.value.name == 'showlectures'" class="col-12 rtl">
                        <SelectInput
                            v-model="user_id"
                            label="الدكتور"
                            :list="userss"
                        />
                    </div> -->
                    <button class="btn bk-green text-white w-auto" @click="filterValue='';authorValue='';
                                                                           department_id='';user_id=''">الغاء</button>
                </div>
             </div>
         </div>
</template>

<script setup>
import { ref,onMounted,watch } from 'vue';
import { useGet } from '../composables/useGet';
import { useRouter } from 'vue-router';
import SelectInput from './Form/BaseSelectInput.vue';

    const emit = defineEmits(['filter','search'])
    const router = useRouter()
    const categories = ref(null)
    const semester = ref(null)
    const subjects = ref(null)
    const authors = ref(null)
    const userss = ref(null)
    const searchValue = ref('')
    const department_id = ref('')
    const user_id = ref('')
    const filterValue = ref('')
    const yearValue = ref(null)
    const authorValue = ref('')
    const displayFilters = ref(false)
    const cata = ref(false)
    onMounted(async()=>{
        if(router.currentRoute.value.name != 'showprojects' && router.currentRoute.value.name != 'showlectures'){
            cata.value = true
            const { awaitdata } = await useGet('api/Category') 
            categories.value = awaitdata.value
        }
        else{
            const { awaitdata } = await useGet('api/Department') 
            categories.value = awaitdata.value
            if(router.currentRoute.value.name == 'showprojects'){
                const years = await useGet('api/AcademicYear') 
                yearValue.value = years.awaitdata.value
            }
        }
        if( router.currentRoute.value.name == 'showbooks'){
           const { awaitdata } = await useGet('api/Author') 
           authors.value = awaitdata.value
       }
       
    })

     watch([filterValue, () => authorValue.value,() => user_id.value,() => department_id.value,() => semester.value],
        async ([newFilter, newAuthor, newUser, newDepartment]) => {
             if( router.currentRoute.value.name == 'showlectures' && department_id.value &&  semester.value){
                console.log(semester.value)
           const Subjectss = await useGet('api/Subject?like=subjects.name,'+''+
                                              '&department_id='+department_id.value+'&semester='+semester.value) 
           subjects.value = Subjectss.awaitdata.value.data
           /* const users = await useGet('api/Users') 
           userss.value = users.awaitdata.value */
       }
        if( router.currentRoute.value.name == 'showbooks' || router.currentRoute.value.name == 'showprojects'){
            emit('filter',newFilter,newAuthor)
        }else if(router.currentRoute.value.name == 'showlectures'){
            emit('filter',newFilter,newUser,newDepartment)
        }
        else
        emit('filter',newFilter)
    }) 

</script>

<style scoped>
.search{
    position: relative;
}
.search input{
    padding-right: 3rem;
}
.search::before{
    content: "";
    width: 2rem;
    height: 2rem;
    position: absolute;
    background-image: url(../assets/img/search.png);
    right: 4px;
    display: block;
    bottom: -1px;
    z-index: 2;
    background-size: 1.5rem;
    background-repeat: no-repeat;
}
.hide{
    display: none;
}
</style>