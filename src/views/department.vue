<template>
    <div>
        <div v-if="msgQuery" class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    {{ msgQuery }}
  </div>
</div>
        <Deletee :url="'api/Department/destroy/'+id" :showDelete="showDelete" go="" @cancel="showDelete = false"/>
        <div class="container p-3 " style="margin-top: 6rem;">
        <div class="row mt-4" >
            <h1 class="h1 rtl"> الاقسام</h1>
            <div class="col-12 gy-3 rtl ">  
                <Loading v-if="!depart" />
                <div v-else class="cataContainer">
                                <div v-for="item in depart" :key="item.id" class="m-3">
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
            v-model="adddepart.name"
            type="text"
            label=" إضافة قسم"
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
import { useDelete } from '../composables/useDelete';
import Deletee from "../components/BaseDelete.vue";
import Loading from "../components/BaseLoading.vue";

const id = ref(null)
 const depart = ref(null)
 const adddepart = ref({
    name:''
 })
 const msgQuery = ref(null)
 const showDelete = ref(false)
 const route = useRoute()
 const router = useRouter()
onMounted(async()=>{
    if(route.query.msg){
            msgQuery.value = route.query.msg
            setTimeout(()=>{
                msgQuery.value = null
                history.replaceState({},'',location.href.split('?')[0])
            },5000)
        }
    const {awaitdata, awaiterror} = await useGet('api/Department/') 
    depart.value = awaitdata.value
})
const submit = async ()=>{
    const {awaitdata, awaiterror} = await usePost('api/Department/store',adddepart.value)
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