<template>
    <Loading v-if="!data" />
    <div v-else class="row my-5 justify-content-center" >
                    <div class="sec-order col-12 col-lg-7 rtl gy-5"  >  
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a @click="$emit('delete')" v-if="userStore.userType == '1'" class="btn btn-lg  mb-3 mx-3 btn-danger " >حذف المشروع </a>
                        </div>  
                        <h2 class="my-3">{{ data.title }}</h2>
                        <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">{{ category[0].name }}</button>
                        <h6 v-if="data.size_Program">حجم المشروع :{{ data.size_Program }}</h6>
                        <h6 >مشرف المشروع :{{ data.supervisor }}</h6>
                        <h5 class="my-3">اعضاء الفريق:</h5>
                        <h5 v-for="key in team" class="my-1" :key="key.id"> {{ key.name }}</h5>
                        <div v-if="data.description" class="my-3">
                            <Description what="المشروع" :desc="data.description" />
                        </div>
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a :href="url+data.file_path" class="btn btn-lg btn-bd-primary mb-3  br-green " >تحميل المشروع <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>
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
/* import { useUpdate } from '../../composables/useUpdate';*/
import Loading from "../BaseLoading.vue";
import geturl from '../../composables/geturl';
import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router";

const router = useRouter()
const userStore= useUserStore()
    const emit = defineEmits(['similarProgects'])
    const props = defineProps({
        id:{
            type:[String,Number]
        }
    })
    const url = geturl()
    const data = ref(null)
    const similarProgects = ref(null)
    const category = ref(null)
    const team = ref(null)
    const error = ref(null)

        watchEffect(async()=>{
            data.value = null
            const { awaitdata,awaiterror } = await useGet('api/Project/show/'+props.id) 
            data.value = awaitdata.value[0]
            category.value= awaitdata.value[2]
            team.value= awaitdata.value[3]
            similarProgects.value = awaitdata.value[1].data
            window.scrollTo(0,0)
            error.value = awaiterror.value
            emit('similarProgects',similarProgects.value)
        })

    </script>

<style scoped>
@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
}
</style>