<template>
    <Loading v-if="!data" />
    <div v-else class="row my-5 justify-content-center" >
                    <div class="sec-order col-12 col-lg-7 rtl gy-5"  > 
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a @click="accept" v-if="userStore.userType == '2'"  class="btn btn-lg btn-bd-primary mb-3 br-green " >تعديل المحاضرة </a>
                            <a @click="deletee" v-if="userStore.userType == '2'" class="btn btn-lg  mb-3 mx-3 btn-danger " >حذف المحاضرة </a>
                        </div>  
                        <h2 class="my-3">{{ data.name }}</h2>
                        <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">{{ subject[0].name }}</button>
                        <h6 >الدكتور  :{{ doctor[0].name }}</h6>
                        <div v-if="data.description" class="my-3">
                            <Description what="المحاضرات" :desc="data.description" />
                        </div>
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a v-for="key in lectureDetailes" :key="key.id" :href="url+key.file_path" class="btn btn-lg btn-bd-primary mb-3  br-green " >تحميل المحاضرة <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>
                       </div>   
                    </div>
                    <div class=" col-lg-1"  ></div>
      
                </div>
</template>

<script setup>
import { watchEffect,ref } from "vue";
import Description from "../BaseDescription.vue";
import { useGet } from '../../composables/useGet';
import { useUpdate } from '../../composables/useUpdate';
import { useDelete } from '../../composables/useDelete';
import Loading from "../BaseLoading.vue";
import geturl from '../../composables/geturl';
import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router";

const router = useRouter()
const userStore= useUserStore()
    const emit = defineEmits(['lectures'])
    const props = defineProps({
        id:{
            type:[String,Number]
        }
    })
    const url = geturl()
    const data = ref(null)
    const lectures = ref(null)
    const doctor = ref(null)
    const subject = ref(null)
    const lectureDetailes = ref(null)
    const error = ref(null)

        watchEffect(async()=>{
            const { awaitdata,awaiterror } = await useGet('api/Lecture/show/'+props.id) 
            console.log(awaitdata.value)
            data.value = awaitdata.value[0]
            lectures.value = awaitdata.value[1].data
            doctor.value= awaitdata.value[2]
            subject.value= awaitdata.value[3]
            lectureDetailes.value= awaitdata.value[4]
            window.scrollTo(0,0)
            error.value = awaiterror.value
            emit('lectures',lectures.value)
        })

        const accept = async ()=>{
                data.value[0].accepted = 1
             const { awaitdata,awaiterror } = await useUpdate('api/Lecture/update/'+props.id,data.value[0])
               console.log(awaitdata.value)
        }
        const deletee = async ()=>{
                const { awaitdata,awaiterror } = await useDelete('api/Lecture/destroy/'+data.value.id)
                if(awaitdata.value)
                {
                    router.push({name:'showlectures'})
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