<template>
    <div>
        <div v-if="msgQuery" class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    {{ msgQuery }}
  </div>
</div>          
<div class="flex mt-4" style="justify-content: space-evenly; padding: 1rem;">
    <a class="btn btn-lg mb-3 bk-green text-white" @click="loguot">
              <span class=" fw-bold">تسجيل الخروج </span>
    </a>
    <RouterLink class="btn btn-lg mb-3 bk-green text-white" :to="{name:'signup'}">
      <span class=" fw-bold"> انشاء حساب </span>
    </RouterLink>
</div>
                <div class="flex mt-4" style="justify-content: space-evenly; padding: 1rem;">
                    <div class="flex" style="width: 85%; align-items: center;">
                    <button class="btn  bk-green text-white" @click="searchUsers">ابحث</button>
                    <div class="col-9 col-lg-3"  >  
                        <div class=" search">
                             <input type="text" class="form-control rtl"  placeholder="ابحث ..." v-model="searchValue">
                        </div>
                    </div>
                </div>
                        <h1 class="h1"> الحسابات</h1>
                </div>
        <div class="container p-3">
        <div class="row " >
            <div class="col-12 gy-3 rtl ">  
                <div class="centercol">
                    <p >الاسم</p>
                    <p>اسم المستخدم</p>
                    <p></p>  
                    <p></p>  
                </div>
                <div class="centercol" v-for="user in users" :key="user.id">
                    <p >{{ user.name }}</p>
                    <p>{{ user.username }}</p>
                    <button @click="changePass(user.id)" class="btn btnn mb-3 br-green" >
                                تغيير كلمة المرور 
                    </button>
                    <a @click="deletee(user.id)" class="btn btn-lg  mb-3 mx-3 btn-danger " style="text-align: center;    padding-right: 0;padding-left: 0;">حذف الحساب </a>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useGet } from "../composables/useGet";
import { useDelete } from '@/composables/useDelete';
import { useRouter,useRoute,RouterLink } from "vue-router";
import { useUserStore } from '@/stores/user'
  const userStore= useUserStore()
const router = useRouter()
const users = ref(null)
const msgQuery = ref(null)
const route = useRoute()
const searchValue = ref('')

onMounted(async()=>{
    if(route.query.msg){
            msgQuery.value = route.query.msg
            setTimeout(()=>{
                msgQuery.value = null
                history.replaceState({},'',location.href.split('?')[0])
            },5000)
        }
  const { awaitdata,awaiterror } = await useGet('api/Users') 
    users.value = awaitdata.value.data
    })
    const searchUsers = async () => {
        const {awaitdata,awaiterror} = await useGet("api/Users/?like=users.name,"+searchValue.value)
        users.value = awaitdata.value.data
    }

    const changePass = async (id)=>{
        console.log(id)
         router.push({name:'changepass1',params:{id:id}})
    }
    const deletee = async (id)=>{
        const { awaitdata,awaiterror } = await useDelete('api/SuperAdmin/deleteAdmin/'+id)
                if(awaitdata.value)
                {
                    router.go()
                }
    }
    const loguot = ()=>{
    userStore.signOut()
    router.push({name:'Home'})
  }
</script>

<style scoped>
.centercol{
    display: flex;
    justify-content:space-evenly
}
.centercol > *{
    width: 15%;
    text-align: center;
    font-size: clamp(0.8rem,0.2rem + 1vw,2rem);
}
.flex{
    display: flex;
}
</style>