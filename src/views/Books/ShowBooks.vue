<template>
    <div>
        <div v-if="route.query.msg" class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    {{ route.query.msg }}
  </div>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
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
                   <AsyncShowBooks @paginationEmit="pagination" :filterValue="filterValue" :authorValue="authorValue"
                                    :searchValue="searchValue" 
                                    :currentPageToGet="currentPageToGet" />
                </div>
                <Pagination v-if="pages" :pages="pages" :currentPage="currentPage" @currentPage="currentPageMeth"  />
             </div>
         </section>

    </div>
  
</template>

<script setup>
import { ref } from 'vue';
import AsyncShowBooks from '../../components/AsyncShowBooks.vue';
import Hero from '../../components/Hero.vue';
import Pagination from '../../components/pagination.vue';
import Search_filter from '../../components/Search_filter.vue';
import { useRoute } from 'vue-router';

    const route = useRoute()
    const searchValue = ref('')
    const filterValue = ref('')
    const authorValue = ref('')
    const pages = ref(0)
    const currentPage = ref(1)
    const currentPageToGet = ref(1)
    const searchValueMethod = (n)=>{
        searchValue.value = n
    }
    const filterValueMethod = (category,author)=>{
        filterValue.value = category
        authorValue.value = author
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