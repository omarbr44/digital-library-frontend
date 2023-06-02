<template>
    <div class="backgroundDiv">
    <div class="container hi100 p-3">
        <div class="row hi100" >
            <div class="col-12 col-lg-3 centercol align-items-center">  
              <a href="/"> <img src="@/assets/img/whitelogo.png" alt="logo" width="100"> </a>
               <h2 class="white-text mt-2" style="color: white;"> المكتبة الرقمية</h2>
            </div>
            <div class="col-12 col-lg-3 centercol"> 
            </div>
            <div class="col-12 col-lg-6 gy-3 rtl text-white centercol">  
                <h1 class="h1">تسجيل الدخول</h1>
                <form @submit.prevent="submit" >
                        <BaseInput 
                            v-model="user.username"
                            type="text"
                            label="اسم المستخدم"
                            :error="userErr.username"
                            required
                        />
                        <BasePassword
                            v-model="user.password"
                            label="كلمة المرور"
                            :error="userErr.password"
                            required
                        />
                        
                        <button  class="btn btn-lg btn-bd-primary mb-3  br-green " >
                                <Loading v-if="loadButton"/>
                                <span class="text-white" v-else>دخول</span>
                        </button>
                </form>
                <RouterLink class="text-white" :to="{name:'signup'}">ليس لديك حساب؟</RouterLink>
                <RouterLink class="text-white mt-2" :to="{name:'Home'}">الصفحة الرئيسية</RouterLink>
                <p class="grey-text ">رقم الدعم الفني : 772772772</p>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '../components/Form/BaseInput.vue';
import Loading from '../components/BaseLoading.vue';
import { usePost } from '../composables/usePost';
import { useRouter,RouterLink } from "vue-router";
import BasePassword from '../components/Form/BasePassword.vue';
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore= useUserStore()
const user = ref({
    username:'',
    password:''
})
const userErr = ref({
    username:'',
    password:''
})
const loadButton = ref(false)
const token = ref(null)
const submit = async ()=>{
     userErr.value = {
    username:'',
    password:''
}
    const {awaitdata,awaiterror} = await usePost("api/login/",user.value)
     if(awaiterror.value == 'البيانات المدخلة غير صحيحه او ان الحساب غير مفعل من قبل الادمن')
    userErr.value.username = awaiterror.value
   else if(awaiterror.value)
    userErr.value = awaiterror.value
    else{
        token.value = awaitdata.value.access_token
        userStore.addToken(awaitdata.value.access_token,awaitdata.value.user.name,
                           awaitdata.value.user.user_type_id,awaitdata.value.user.id)
        if(userStore.userType == 3)
        router.push({name:'superadmin'})
        else
        router.push({name:'Home'})

    }
}

</script>

<style scoped>
.backgroundDiv{
    background: url(@/assets/img/showbook.jpg) no-repeat;
    background-position: center center;
    background-size: cover;
    position: relative;
    height: 100vh;
}
.backgroundDiv::before{
  content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
}
.hi100{
height: 100%;
}
.centercol{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

</style>