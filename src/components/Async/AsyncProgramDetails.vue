<template>
    <Loading v-if="!data" />
    <div v-else class="row my-5 justify-content-center" >
                    <div class="sec-order col-12 col-lg-7 rtl gy-5"> 
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a @click="accept" v-if="userStore.userType == '1' && !edit"  class="btn btn-lg btn-bd-primary mb-3 br-green mx-3" >قبول البرنامج </a>
                            <RouterLink v-if="userStore.userType == '1'" class="btn btn-lg btn-bd-primary mb-3 br-green " :to="{name:'updateprogram',params:{id:data.id}}">تعديل البرنامج</RouterLink>
                            <a @click="$emit('delete')" v-if="userStore.userType == '1'" class="btn btn-lg  mb-3 mx-3 btn-danger " >حذف البرنامج </a>
                        </div>  
                        <h2 class="my-3">{{ data.Name }}</h2>
                        <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">{{ category[0].name }}</button>
                        <h6 v-if="data.Version">اصدار البرنامج :{{ data.Version }}</h6>
                        <h6 v-if="data.size_Program">حجم البرنامج :{{ data.size_Program }}</h6>
                        <div v-if="data.Description" class="my-3">
                            <Description what="البرنامج" :desc="data.Description" />
                        </div>
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a :href="url+data.File_path" class="btn btn-lg btn-bd-primary mb-3  br-green " >تحميل البرنامج <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>
                       </div>   
                    </div>
                    <div class=" col-lg-1"  ></div>
                    <div class="col-10 col-lg-4 " >  
                       <img :src="url+data.image" class="shadow-sm p-3 bg-body"   alt="book"  style="width: 100%;">
                    </div>
                </div>
</template>

<script setup>
import { watchEffect,ref } from "vue";
import Description from "../BaseDescription.vue";
import { useGet } from '../../composables/useGet';
import { useUpdate } from '../../composables/useUpdate';
import Loading from "../BaseLoading.vue";
import geturl from '../../composables/geturl';
import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router";

const router = useRouter()
const userStore= useUserStore()
    const emit = defineEmits(['similarPrograms'])
    const props = defineProps({
        id:{
            type:[String,Number]
        }
    })
    const url = geturl()
    const data = ref(null)
    const similarPrograms = ref(null)
    const category = ref(null)
    const error = ref(null)
    const edit = ref(true)

        watchEffect(async()=>{
            data.value = null
            const { awaitdata,awaiterror } = await useGet('api/Program/show/'+props.id) 
            data.value = awaitdata.value[0]
            if(data.value.Accepted == 0)
            edit.value = false
            category.value= awaitdata.value[2]
            similarPrograms.value = awaitdata.value[1]
            window.scrollTo(0,0)
            error.value = awaiterror.value
            emit('similarPrograms',similarPrograms.value)
        })

        const accept = async ()=>{
                data.value.Accepted = 1
             const { awaitdata,awaiterror } = await useUpdate('api/Program/update/'+props.id,data.value)
              if(awaitdata.value)
                {
                    router.go()
                } 
            }
        
    </script>

<style scoped>
@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
}
</style>