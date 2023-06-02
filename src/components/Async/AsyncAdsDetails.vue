<template>
    <Loading v-if="!data" />
    <div v-else class="row my-5 justify-content-center" >
                    <div class="sec-order col-12 col-lg-7 rtl gy-5"> 
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a @click="deletee" class="btn btn-lg  mb-3 mx-3 btn-danger " >حذف الاعلان </a>
                        </div>  
                        <h2 class="my-3">{{ data.name || data.title }}</h2>
                        <div class="my-3">
                            <Description what="الاعلان" :desc="data.description" />
                        </div>   
                    </div>
                    <div class=" col-lg-1"  ></div>
                    <div class="col-10 col-lg-4 " >  
                       <img :src="url+data.image" class="shadow-sm p-3 bg-body" alt="ads"  style="width: 100%;">
                    </div>
                </div>
</template>

<script setup>
import { watchEffect,ref } from "vue";
import Description from "../BaseDescription.vue";
import { useGet } from '../../composables/useGet';
import { useDelete } from '../../composables/useDelete';
import Loading from "../BaseLoading.vue";
import geturl from '../../composables/geturl';
import { useRouter } from "vue-router";

const router = useRouter()
    const props = defineProps({
        id:{
            type:[String,Number]
        }
    })
    const url = geturl()
    const data = ref(null)
    const error = ref(null)

        watchEffect(async()=>{
            const { awaitdata,awaiterror } = await useGet('api/Advertisement/show/'+props.id) 
            data.value = awaitdata.value[0]
            window.scrollTo(0,0)
            error.value = awaiterror.value
        })

        const deletee = async ()=>{
                const { awaitdata,awaiterror } = await useDelete('api/Advertisement/destroy/'+data.value.id)
                if(awaitdata.value)
                {
                    router.push({name:'showads'})
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