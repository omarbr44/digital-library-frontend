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
                    <div class="col-12 col-lg-6 rtl">  
                    <div class="dropdown dropend">
                            <img src="../assets/img/edit.png" alt="filter" class="mx-3 dropdown-toggle" style="width:2rem" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                            
                            <li><a class="dropdown-item text-end" @click="{$emit('filter',1);filterValue='الكتب'}">تصفح الكتب</a></li>
                            <li><a class="dropdown-item text-end">تصفح الدورات</a></li>
                            <li><a class="dropdown-item text-end">تصفح البرامج</a></li>
                            <li><a class="dropdown-item text-end">تصفح الكتب الصوتية</a></li>
                            <li><a class="dropdown-item text-end">تصفح المشاريع</a></li>
                            <li><a class="dropdown-item text-end">تصفح المحاضرات</a></li>
                        </ul>
                    </div>

                        <button v-if="filterValue" type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">{{filterValue}}</button>    
                    </div>
                 </div>
             </div>
         </div>
</template>

<script setup>
import { ref } from 'vue';

    const searchValue = ref('')
    const filterValue = ref('')
    
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


.dropdown-toggle::after{
    display: none;
}
</style>