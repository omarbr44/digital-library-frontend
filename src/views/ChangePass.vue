<template>
    <div class="container mt-5">
        <form @submit.prevent="submit" >
            <BasePassword 
                            v-if="userStore.userType == 1 || userStore.userType == 3"
                            v-model="user.password"
                            label="كلمة المرور"
                            required
                            :error="userErr.password"
                        />
            <BasePassword 
                             v-if="userStore.userType == 1 || userStore.userType == 3"
                             v-model="user.password_confirmation"
                            label="تأكيد كلمة المرور"
                            required
                            :error="userErr.password_confirmation"
                        />
            <BasePassword 
                             v-if="userStore.userType == 2"
                            v-model="user.old_password"
                            label=" كلمة المرور الحالية"
                            required
                            :error="userErr.old_password"
                        />
            <BasePassword 
                             v-if="userStore.userType == 2"
                            v-model="user.password"
                            label="كلمة المرور الجديدة"
                            required
                            :error="userErr.password"
                        />
            <BasePassword 
                             v-if="userStore.userType == 2"
                             v-model="user.password_confirmation"
                            label="تأكيد كلمة المرور الجديدة"
                            required
                            :error="userErr.password_confirmation"
                        />
  
                        <button  class="btn btn-lg mb-3 bk-green text-white" >
                                <Loading v-if="loadButton"/>
                                <span v-else>تغيير</span>
                        </button>
        </form>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import Loading from '../components/BaseLoading.vue';
import { usePost } from '../composables/usePost';
import { useRouter,useRoute } from "vue-router";
import BasePassword from '../components/Form/BasePassword.vue';
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore= useUserStore()

 const id = ref(route.params.id) 
const user = ref({
    password:'',
    password_confirmation:'',
    old_password:'',
})
const userErr = ref({
    password:'',
    password_confirmation:'',
    old_password:'',
})
const loadButton = ref(false)
const submit = async ()=>{
     userErr.value = {
     password:'',
    password_confirmation:'',
    old_password:'',
}
    if(userStore.userType == 1 || userStore.userType == 3) {
        const {awaitdata,awaiterror} = await usePost("api/Users/change_Password/"+id.value,user.value)
        if(!awaitdata.value)
        userErr.value = awaiterror.value     
       else if(userStore.userType == 1){
           router.push({name:'usersshow',
           query:{msg:' تم تغيير كلمة السر بنجاح'}})
       }
       else{
        router.push({name:'superadmin',
           query:{msg:' تم تغيير كلمة السر بنجاح'}})
       }
    }
    else{
        const {awaitdata,awaiterror} = await usePost("api/Users/changePassword",user.value)
        if(!awaitdata.value)
        userErr.value = awaiterror.value     
       else
       router.push({name:'login'})
       console.log(awaitdata.value,awaiterror.value)
    }

}
</script>

<style scoped>

</style>