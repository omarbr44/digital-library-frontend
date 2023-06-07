<template>
    <div>
        <Deletee :url="'api/Advertisement/destroy/'+id" :showDelete="showDelete" go="showads" @cancel="showDelete = false"/>
    <nav  style="--bs-breadcrumb-divider: '<'; 
        background-color: #f7f7f7;margin-top: 7rem;" aria-label="breadcrumb">
         <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
            <li class="breadcrumb-item active">تفاصيل الاعلان</li>
            <li class="breadcrumb-item "><RouterLink :to="{name:'showads'}">تصفح الاعلانات</RouterLink> </li>
            <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
         </ol>
    </nav>
        <div class="container px-4 px-md-3" >
                <AsyncAdsDetails :id="id"  @delete="deletee"/>
        </div>
    </div>
</template>

<script setup>
import { useRoute,RouterLink,useRouter,} from "vue-router";
import AsyncAdsDetails from "../../components/Async/AsyncAdsDetails.vue";
import Deletee from "../../components/BaseDelete.vue";
import { ref,watch } from "vue";

 const route = useRoute()
 const router = useRouter()
 const showDelete = ref(false)

 const id = ref(route.params.id) 

    watch([id, () => id.value], ([idd]) => { 
   router.push('/bookDetails/'+idd)
    }) 
    const deletee = ()=>{
    showDelete.value = true
    window.scrollTo(0,200)
}
</script>

