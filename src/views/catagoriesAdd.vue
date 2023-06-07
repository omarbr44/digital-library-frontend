<template>
    <div>
        <Deletee :url="'api/Category/destroy/'+id" :showDelete="showDelete" go="" @cancel="showDelete = false"/>
        <div class="container p-3" style="margin-top: 6rem;">
        <div class="row " >
            <h1 class="h1 rtl"> الفئات</h1>
            <div class="col-12 gy-3 rtl ">  
                <Loading v-if="!catagories" />
                <div v-else class="cataContainer">
                                <div v-for="item in catagories" :key="item.id" class="m-3">
                                    <div class="embed-responsive embed-responsive-1by1 flex">
                                     <h4>{{ item.name }}</h4>
                                     <div class="d-flex flex-column flex-md-row text-white">
                                        <a @click="deletee(item.id)"  class="btn mx-3 btn-danger " >حذف  </a>
                                     </div>  
                                    </div>
                                </div>
                       </div>
            </div>
        </div>
        <form @submit.prevent="submit" class="rtl mt-5" >
        <BaseInput 
            v-model="addCatagory.name"
            type="text"
            label="اضافة فئة"
            required
        />
        <button class="btn btnn mb-3 br-green " >
                                اضافة 
        </button>
        </form>
    </div>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import BaseInput from '../components/Form/BaseInput.vue';
import { useGet } from '../composables/useGet';
import { usePost } from '../composables/usePost';
import { useRouter,useRoute } from "vue-router";
import Deletee from "../components/BaseDelete.vue";
import Loading from "../components/BaseLoading.vue";


 const catagories = ref(null)
 const id = ref(null)
 const addCatagory = ref({
    name:''
 })
 const msgQuery = ref(null)
 const route = useRoute()
 const router = useRouter()
 const showDelete = ref(false)
onMounted(async()=>{
    const {awaitdata, awaiterror} = await useGet('api/Category/') 
    catagories.value = awaitdata.value
})
const submit = async ()=>{
    const {awaitdata, awaiterror} = await usePost('api/Category/store',addCatagory.value)
    if(awaitdata.value)
     router.go()
}
        const deletee = (ID)=>{
            id.value = ID
    showDelete.value = true
    window.scrollTo(0,220)
}
</script>

<style scoped>
.cataContainer{
    display: flex;
    height: 20rem;
    flex-direction: column;
    overflow-y:scroll;
}
.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>