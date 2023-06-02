<template>
    <div>
        <div v-if="msgQuery" class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    {{ msgQuery }}
  </div>
</div>
                <div class="flex mt-4" style="justify-content: space-evenly; padding: 1rem;margin-top: 6rem !important;">
                    <div class="flex" style="width: 85%; align-items: center;">
                    <button class="btn  bk-green text-white" @click="searchUsers">ابحث</button>
                    <div class="col-9 col-lg-3"  >  
                        <div class=" search">
                             <input type="text" class="form-control rtl"  placeholder="ابحث ..." v-model="searchValue">
                        </div>
                    </div>
                </div>
                        <h1 class="h1"> حسابات</h1>
                </div>
        <div class="container p-3">
        <div class="row " >
            <div class="col-12 gy-3 rtl ">  
                <div class="centercol">
                    <p >الاسم</p>
                    <p>اسم المستخدم</p>
                   <!--  <p>نوع المستخدم</p> -->
                    <p>تفعيل</p> 
                    <p></p> 
                    <p></p> 
                </div>
                <div class="centercol" v-for="user in users" :key="user.id">
                    <p >{{ user.name }}</p>
                    <p>{{ user.username }}</p>
                   <!--  <p>{{ user.type }}</p> -->
                    <p>{{ activeor(user.active) }}</p> 
                    <button @click="activate(user.id,user)" style="text-align: center;padding-left: 0;padding-right: 0;" class="btn btnn mb-3  br-green " >
                               <span v-if="!user.active">تفعيل</span> 
                               <span v-else>الغاء التفعيل</span> 
                    </button>
                    <button @click="changePass(user.id)" class="btn btnn mb-3  br-green " >
                                تغيير كلمة المرور 
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useGet } from "../composables/useGet";
import { useUpdate } from "../composables/useUpdate";
import { useRouter,useRoute } from "vue-router";

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
    const activate = async (id,user)=>{
        user.active = Number(!user.active)
        user.user_type_id = 2
        const {awaitdata,awaiterror} = await useUpdate("api/Users/active_user/"+id,user)
         router.go()
    }
    const changePass = async (id)=>{
         router.push({name:'changepass1',params:{id:id}})
    }
    const activeor = (active)=>{
        return active == 1 ? 'مفعل' : 'غير مفعل'
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