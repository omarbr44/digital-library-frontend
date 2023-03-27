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
                    <div class="col-6 rtl">
                        <SelectInput
                            v-model="filterValue"
                            label="الصنف"
                            :list="categories"
                            
                        />
                    </div>
                    <div v-if="router.currentRoute.value.name == 'showbooks'" class="col-6 rtl">
                        <SelectInput
                            v-model="authorValue"
                            label="الكاتب"
                            :list="authors"
                        />
                    </div>
                    <button class="btn bk-green text-white w-auto" @click="filterValue='';authorValue=''">الغاء</button>
                </div>
             </div>
         </div>
</template>

<script setup>
import { ref,onMounted,watchEffect } from 'vue';
import { useGet } from '../composables/useGet';
import { useRouter } from 'vue-router';
import SelectInput from './Form/SelectInput.vue';

    const emit = defineEmits(['filter'])
    const router = useRouter()
    const categories = ref(null)
    const authors = ref(null)
    const searchValue = ref('')
    const filterValue = ref('')
    const authorValue = ref('')
    const displayFilters = ref(false)
    onMounted(async()=>{
        const { awaitdata } = await useGet('api/Category') 
        categories.value = awaitdata.value
        if( router.currentRoute.value.name == 'showbooks'){
           const { awaitdata } = await useGet('api/Author') 
           authors.value = awaitdata.value
       }
    })
    watchEffect(()=>{
        if( router.currentRoute.value.name == 'showbooks'){
            emit('filter',filterValue.value,authorValue.value)
        }else
        emit('filter',filterValue.value)

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