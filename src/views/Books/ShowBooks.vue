<template>
    <div>
        <Hero />
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">تصفح الكتب</li>
                <li class="breadcrumb-item " aria-current="page"><a href="#">الرئيسية</a></li>
             </ol>
        </nav> 
         <Search_filter @search="searchValueMethod" @filter="filterValueMethod"/>
         <section class="cards">
            <div class="container px-4 px-md-3" >
                <div class="row my-5" >
                <Suspense>
                   <AsyncShowBooks @paginationEmit="pagination" :filterValue="filterValue" :searchValue="searchValue" 
                                    :currentPageToGet="currentPageToGet" />
                   <template #fallback>
                        <Loading />
                   </template>
                </Suspense>
                </div>
                <Pagination :pages="pages" :currentPage="currentPage" @currentPage="currentPageMeth"  />
             </div>
         </section>

    </div>
  
</template>

<script setup>
import { ref } from 'vue';
import AsyncShowBooks from '../../components/AsyncShowBooks.vue';
import Hero from '../../components/Hero.vue';
import Loading from '../../components/Loading.vue';
import Pagination from '../../components/pagination.vue';
import Search_filter from '../../components/Search_filter.vue';

    const searchValue = ref('')
    const filterValue = ref('')
    const pages = ref(0)
    const currentPage = ref(1)
    const currentPageToGet = ref(1)
    const searchValueMethod = (n)=>{
        searchValue.value = n
    }
    const filterValueMethod = (n)=>{
        filterValue.value = n
    }
    const pagination = (page)=>{
        pages.value = page
        currentPage.value = currentPageToGet.value
    }
    const currentPageMeth = (currentPages)=>{
        currentPageToGet.value = currentPages
    }


</script>

<style scoped>

</style>