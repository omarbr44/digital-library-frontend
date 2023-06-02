<template>
    <div>
        <div class="container p-3 mt-5">
        <div class="row " >
            <div class="col-12 gy-3 rtl mt-5 ">  
                <div class="centercol">
                </div>
                <div class="centercol" v-for="s in sug" :key="s.id">
                    <p >{{ s.suggestion }}</p>
                    <a @click="deletee(s.id)" class="btn btn-lg  mb-3 mx-3 btn-danger " >حذف  </a>
                    <hr>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useGet } from "@/composables/useGet";
import { useDelete } from '@/composables/useDelete';
import { useRouter,useRoute,RouterLink } from "vue-router";
import { useUserStore } from '@/stores/user'
  const userStore= useUserStore()
const router = useRouter()
const sug = ref(null)
const route = useRoute()

onMounted(async()=>{
 
  const { awaitdata,awaiterror } = await useGet('api/Suggestion') 
    sug.value = awaitdata.value.data
    })
    const deletee = async (id)=>{
        const { awaitdata,awaiterror } = await useDelete('api/Suggestion/destroy/'+id)
                if(awaitdata.value)
                {
                    router.go()
                }
    }

</script>

<style scoped>

</style>