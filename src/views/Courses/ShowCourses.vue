<template>
    <div>
        <div v-if="msgQuery" class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    {{ route.query.msg }}
  </div>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
        <Hero :obj="{
            el1 : 'تصفح الدورات ',
            el2 : 'تصفح الدورات مع خاصية البحث بالإسم وتحديد الفئة مع امكانية تحميل الدورة',
            el3 : 'addcourse',
            el4 : 'اضافة دورة'
        }" />
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">تصفح الدورات</li>
                <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
             </ol>
        </nav> 
         <Search_filter @search="searchValueMethod" @filter="filterValueMethod"/>
         <section class="cards">
            <div class="container px-4 px-md-3" >
                <div class="row my-5" >
                   <AsyncShowCourses @paginationEmit="pagination" :filterValue="filterValue" 
                                    :searchValue="searchValue" 
                                    :currentPageToGet="currentPageToGet" :refreshPaginat="refreshPaginat" />
                </div>
                <Pagination v-if="pages" :pages="pages" :currentPage="currentPage" @currentPage="currentPageMeth"  />
             </div>
         </section>

    </div>
  
</template>

<script setup>
import { ref,onMounted } from 'vue';
import AsyncShowCourses from '../../components/Async/AsyncShowCourses.vue';
import Hero from '../../components/Hero.vue';
import Pagination from '../../components/pagination.vue';
import Search_filter from '../../components/Search_filter.vue';
import { useRoute,RouterLink } from 'vue-router';

onMounted(()=>{
        if(route.query.msg){
            msgQuery.value = route.query.msg
            setTimeout(()=>{
                msgQuery.value = null
                history.replaceState({},'',location.href.split('?')[0])
            },5000)
        }
    })

    const route = useRoute()
    const searchValue = ref('')
    const filterValue = ref('')
    const pages = ref(0)
    const currentPage = ref(1)
    const currentPageToGet = ref(1)
    const refreshPaginat = ref(true)
    const msgQuery = ref(null)

    const searchValueMethod = (n)=>{
        searchValue.value = n
        refreshPaginat.value = true
    }
    const filterValueMethod = (category)=>{
        filterValue.value = category
        refreshPaginat.value = true
    }
    const pagination = (page)=>{
        pages.value = page
        currentPage.value = currentPageToGet.value
    }
    const currentPageMeth = (currentPages)=>{
        currentPageToGet.value = currentPages
        refreshPaginat.value = false
    }

</script>
