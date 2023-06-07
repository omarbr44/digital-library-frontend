<template>
    <div>
        <div v-if="msgQuery" class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    {{ msgQuery }}
  </div>
</div>
        <Hero :obj="{
            el1 : 'تصفح المشاريع ',
            el2 : 'تصفح المشاريع مع خاصية البحث وتحديد القسم والسنة مع امكانية تحميل المشروع',
            el3 : 'addproject',
            el4 : 'اضافة مشروع'
        }" />
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">تصفح المشاريع</li>
                <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
             </ol>
        </nav> 
         <Search_filter @search="searchValueMethod" @filter="filterValueMethod"/>
         <section class="cards">
            <div class="container px-4 px-md-3" >
                <div class="row my-5" >
                   <AsyncShowProjects @paginationEmit="pagination" :filterValue="filterValue" 
                                    :searchValue="searchValue" :year="yearValue"
                                    :currentPageToGet="currentPageToGet" :refreshPaginat="refreshPaginat"  />
                </div>
                <Pagination v-if="pages" :pages="pages" :currentPage="currentPage" @currentPage="currentPageMeth"  />
             </div>
         </section>

    </div>
  
</template>

<script setup>
import { ref,onMounted } from 'vue';
import AsyncShowProjects from '../../components/Async/AsyncShowProjects.vue';
import Hero from '../../components/Hero.vue';
import Pagination from '../../components/pagination.vue';
import Search_filter from '../../components/Search_filter.vue';
import { useRoute,RouterLink } from 'vue-router';

    const route = useRoute()
    const msgQuery = ref(null)
    const searchValue = ref('')
    const filterValue = ref('')
    const yearValue = ref('')
    const pages = ref(0)
    const currentPage = ref(1)
    const currentPageToGet = ref(1)
    const refreshPaginat = ref(true)
    onMounted(()=>{
        if(route.query.msg){
            msgQuery.value = route.query.msg
            setTimeout(()=>{
                msgQuery.value = null
                history.replaceState({},'',location.href.split('?')[0])
            },5000)
        }
    })
    const searchValueMethod = (n)=>{
        searchValue.value = n
        refreshPaginat.value = true
    }
    const filterValueMethod = (category,author)=>{
        filterValue.value = category
        yearValue.value = author
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
