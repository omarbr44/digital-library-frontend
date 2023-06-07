<template>
    <div class="backgroundDiv">
    <div class="container hi100 p-3">
        <div class="row hi100" >
            <div class="col-12 col-lg-3 centercol align-items-center">  
                <img src="@/assets/img/whitelogo.png" alt="logo" width="100">
               <h2 class="white-text mt-2" style="color: white;"> المكتبة الرقمية</h2>
            </div>
            <div class="col-12 col-lg-3 centercol"> 
            </div>
            <div class="col-12 col-lg-6 gy-3 rtl text-white centercol">  
                <h1 v-if="userStore.userType == 3" class="h1"> انشاء حساب لإدارة الموقع</h1>
                <h1 v-else class="h1"> انشاء حساب للكادر التعليمي</h1>
                <form @submit.prevent="submit" >
                        <BaseInput 
                            v-model="user.name"
                            type="text"
                            label="الاسم الكامل"
                            required
                            :error="userErr.name"
                        />
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
                            required
                            :error="userErr.password"
                        />
                        <BasePassword 
                             v-model="user.password_confirmation"
                            label="تأكيد كلمة المرور"
                            required
                            :error="userErr.password_confirmation"
                        />
                        <button  class="btn btn-lg btn-bd-primary mb-3  br-green " >
                                <Loading v-if="loadButton"/>
                                <span class="text-white" v-else>تسجيل</span>
                        </button>
                </form>
                <RouterLink  v-if="!userStore.userType == 3" class="text-white" :to="{name:'login'}">هل لديك حساب بالفعل؟</RouterLink>
                <RouterLink v-if="userStore.userType == 3" class="text-white" :to="{name:'superadmin'}">الصفحة الرئيسية</RouterLink>
                <RouterLink v-else class="text-white" :to="{name:'Home'}">الصفحة الرئيسية</RouterLink>
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

const router = useRouter()
import { useUserStore } from '@/stores/user'
  const userStore= useUserStore()
const user = ref({
    name:'',
    username:'',
    user_type_id:'2',
    password:'',
    password_confirmation:''
})
const userErr = ref({
    name:'',
    username:'',
    user_type_id:'',
    password:'',
    password_confirmation:''
})
const loadButton = ref(false)

const submit = async ()=>{
    const {awaitdata,awaiterror} = await usePost("api/register/",user.value)
    if(awaiterror.value)
    userErr.value = awaiterror.value
    else{
        if(userStore.userType == 3){
            router.push({name:'superadmin',
                     query:{msg:' تم انشاء الحساب بنجاح'}
})
        }
        else{
            router.push({name:'Home',
                         query:{msg:' تم انشاء الحساب بنجاح،الرجاء التواصل مع إدارة الموقع لتفعيل الحساب من خلال الرقم : 777777777'}
                        })
        }
    }
}


</script>

<style scoped>
.backgroundDiv{
    background: url(@/assets/img/showbook.jpg) no-repeat;
    background-position: center center;
    background-size: cover;
    position: relative;
    height: 140%;
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