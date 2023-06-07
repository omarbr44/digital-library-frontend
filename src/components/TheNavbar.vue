<script setup>
import { ref,watch,watchEffect } from 'vue';
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router';
import { useRouter,useRoute } from 'vue-router';
import geturl from "../composables/geturl";

const url = geturl()
  const router = useRouter()
  const route = useRoute()
  const userStore= useUserStore()
  const svg =ref(null)
  const logo =ref(null)
  const logo1 =ref(null)
  const smalllogo =ref(null)
  const smalllogo1 =ref(null)
  const container =ref(null)
  const icon =ref(null)
  const toggle =ref(false)
  const pagechanged =ref(false)
  const navtoggle = ()=>{
    svg.value.classList.toggle("hid")
    svg.value.classList.toggle("white")
    /* logo.value.classList.toggle("hid")
    logo1.value.classList.toggle("hid") */
    smalllogo.value.classList.toggle("hid")
    smalllogo1.value.classList.toggle("hid")
    container.value.classList.toggle("reverse")
    container.value.classList.toggle('show')
    icon.value.classList.toggle("backimg")
    toggle.value = true
  }
  watch([toggle, () => pagechanged.value], ([newtog,newpage]) => { 
    if(newtog == true && newpage == true){
      navtoggle()
      toggle.value = false
    }
    pagechanged.value = false
    console.log('l')
  })
  watchEffect(()=>{
    console.log(route.name)
    //toggle.value = false
    pagechanged.value = true
   
  })
  const loguot = ()=>{
    userStore.signOut()
    router.push({name:'Home'})
  }
</script>
<template>
   <header>
    <nav class="navbar navbar-expand-sm navbar-light fixed-top" style="background: white;box-shadow: 0px 0 10px 0 rgb(0 0 0 / 40%);">
      <div class="container">
        <div style="width: 16%;
    display: flex;
    align-items: center;">
        <a ref="logo1" class="navbar-brand m-0" href="/"><img src="../assets/img/hadramot.png" alt="logo" style="width: 6rem;cursor:default;"></a>
        <a ref="logo" class="navbar-brand m-0" href="/"><img src="../assets/img/logo.png" alt="logo" width="60"></a>
        <h5 class="my-0 dark-text" style="margin-left: 1rem;">المكتبة الرقمية</h5>
      </div>
      <div style="position: absolute;margin-top: 2rem;">
      <a ref="smalllogo" class="navbar-brand hid smalllogo m-0" href="/"><img src="../assets/img/whitelogo.png" alt="logo" width="60"></a>
      <a ref="smalllogo1" class="navbar-brand m-0 hid smalllogo" href="#"><img src="../assets/img/hadramot.png" alt="logo" style="width: 6rem;cursor:default;"></a>
    </div>
      <button @click="navtoggle" class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
      <span ref="icon" class="navbar-toggler-icon">
        <svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x hid"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </span>
    </button>
    <div ref="container" class="bk-dark contain collapse navbar-collapse" id="collapsibleNavId">
      <div class="coll">
        <ul class="navbar-nav smallScreen-ul">
         
          <li class="col">
            <RouterLink :to="{name:'Home'}">
              الرئيسية  
            </RouterLink>
          </li>
         
          <li v-if="userStore.userType == 1" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            النظام
          </a>
          <ul class="dropdown-menu dropdown-menuSmallNav" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'usersshow'}">الحسابات </RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'catagoriesadd'}">الفئات </RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'department'}">الاقسام </RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'years'}">السنة الاكاديمية </RouterLink></li>
           
          </ul>
        </li>
          <li v-if="userStore.userType == 1" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            قبول الطلبات
          </a>
          <ul class="dropdown-menu dropdown-menuSmallNav" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'showbooks',query:{msgg:'accept'}}">الكتب </RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'showcourses',query:{msgg:'accept'}}">الدورات </RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'showprograms',query:{msgg:'accept'}}">البرامج </RouterLink></li>
           
          </ul>
        </li>
          <li v-if="userStore.userType == 2" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            تعديل الحساب
          </a>
          <ul class="dropdown-menu dropdown-menuSmallNav" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'changepass'}">تغيير كلمة المرور </RouterLink></li>           
          </ul>
        </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            اضافة
          </a>
          <ul class="dropdown-menu dropdown-menuSmallNav" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'addbook'}">اضافة كتاب</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'addcourse'}">اضافة دورة</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'addprogram'}">اضافة برنامج</RouterLink></li>
            <li v-if="userStore.userType == 1"><RouterLink class="dropdown-item text-end text-white" :to="{name:'addproject'}">اضافة مشروع</RouterLink></li>
            <li v-if="userStore.userType == 1"><RouterLink class="dropdown-item text-end text-white" :to="{name:'addads'}">اضافة اعلان</RouterLink></li>
            <li v-if="userStore.userType == 2"><RouterLink class="dropdown-item text-end text-white" :to="{name:'addlecture'}">اضافة محاضرة</RouterLink></li>
            <li v-if="userStore.userType == 2"><RouterLink class="dropdown-item text-end text-white" :to="{name:'addsubject'}">اضافة مادة</RouterLink></li>
            <li ><RouterLink class="dropdown-item text-end text-white" :to="{name:'addsug'}">اضافة اقتراح</RouterLink></li>
          </ul>
        </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            تصفح
          </a>
          <ul class="dropdown-menu dropdown-menuSmallNav" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'showbooks'}">تصفح الكتب</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'showcourses'}">تصفح الدورات</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'showprograms'}">تصفح البرامج</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'showprojects'}">تصفح المشاريع</RouterLink></li>
            <li><RouterLink v-if="userStore.userType == 1" class="dropdown-item text-end text-white" :to="{name:'showads'}">تصفح الاعلانات</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end text-white" :to="{name:'showlectures'}">تصفح المحاضرات</RouterLink></li>
            <li><RouterLink v-if="userStore.userType == 1" class="dropdown-item text-end text-white" :to="{name:'showsug'}">تصفح الاقتراحات</RouterLink></li>
          </ul>
        </li>
        <li class="col">
            <RouterLink :to="{name:'Home'}">
              عن الموقع  
            </RouterLink>
          </li>
          <li v-if="!userStore.token">
            <RouterLink class="btn btn-lg bk-green text-white my-4" :to="{name:'signup'}">
          <span class="fw-bold">انشاء حساب</span>
          </RouterLink>
          </li>
          <li v-if="!userStore.token">
            <RouterLink class="btn btn-lg mb-3 br-green text-white" :to="{name:'login'}">
              <span class=" fw-bold">تسجيل دخول </span>
            </RouterLink>
          </li>
          
          <li v-if="userStore.token">
            <a class="btn btn-lg mb-1 mt-3 br-green text-white" @click="loguot">
              <span class=" fw-bold">تسجيل الخروج </span>
            </a>
          </li>
          
      </ul>
      </div>
    </div>
    <div class="big-nav">
      <div>
        <ul class="navbar-nav mt-2 mt-lg-0 p-0 ">
          <li  class="nav-item">
            <RouterLink class="nav-link" :to="{name:'Home'}">
          <span class="fw-bold">عن الموقع</span>
              <div class="line-under"></div>               
            </RouterLink>
          </li>
          <li class="nav-item dropdown dropdown1">
          <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button">
            <span class="fw-bold">اضافة</span>
          </a>
          <ul class="dropdown-menu " >
            <li><RouterLink class="dropdown-item text-end" :to="{name:'addbook'}">اضافة كتاب</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'addcourse'}">اضافة دورة</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'addprogram'}">اضافة برنامج</RouterLink></li>
            <li v-if="userStore.userType == 1"><RouterLink class="dropdown-item text-end" :to="{name:'addproject'}">اضافة مشروع</RouterLink></li>
            <li v-if="userStore.userType == 1"><RouterLink class="dropdown-item text-end" :to="{name:'addads'}">اضافة اعلان</RouterLink></li>
            <li v-if="userStore.userType == 2"><RouterLink class="dropdown-item text-end" :to="{name:'addlecture'}">اضافة محاضرة</RouterLink></li>
            <li v-if="userStore.userType == 2"><RouterLink class="dropdown-item text-end" :to="{name:'addsubject'}">اضافة مادة</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'addsug'}">اضافة اقتراح</RouterLink></li>
          </ul>
        </li>
          <li class="nav-item dropdown dropdown1">
          <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button">
            <span class="fw-bold">تصفح</span>
          </a>
          <ul class="dropdown-menu " >
            <li><RouterLink class="dropdown-item text-end" :to="{name:'showbooks'}">تصفح الكتب</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'showcourses'}">تصفح الدورات</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'showprograms'}">تصفح البرامج</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'showprojects'}">تصفح المشاريع</RouterLink></li>
            <li><RouterLink v-if="userStore.userType == 1" class="dropdown-item text-end" :to="{name:'showads'}">تصفح الاعلانات</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'showlectures'}">تصفح المحاضرات</RouterLink></li>
            <li><RouterLink v-if="userStore.userType == 1" class="dropdown-item text-end" :to="{name:'showsug'}">تصفح الاقتراحات</RouterLink></li>
          </ul>
        </li>
          <li v-if="userStore.userType == 1" class="nav-item dropdown dropdown1">
          <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button">
            <span class="fw-bold">النظام</span>
          </a>
          <ul class="dropdown-menu " >
            <li><RouterLink class="dropdown-item text-end" :to="{name:'usersshow'}">الحسابات</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'catagoriesadd'}">الفئات</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'department'}">الاقسام</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'years'}">السنة الاكاديمية</RouterLink></li>
          </ul>
        </li>
          <li v-if="userStore.userType == 1" class="nav-item dropdown dropdown1">
          <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button">
            <span class="fw-bold">قبول الطلبات</span>
          </a>
          <ul class="dropdown-menu " >
            <li><RouterLink class="dropdown-item text-end" :to="{name:'showbooks',query:{msgg:'accept'}}">الكتب</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'showcourses',query:{msgg:'accept'}}">الدورات</RouterLink></li>
            <li><RouterLink class="dropdown-item text-end" :to="{name:'showprograms',query:{msgg:'accept'}}">البرامج</RouterLink></li>
          </ul>
        </li>
          <li v-if="userStore.userType == 2" class="nav-item dropdown dropdown1">
          <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button">
            <span class="fw-bold">تعديل الحساب</span>
          </a>
          <ul class="dropdown-menu " >
            <li><RouterLink class="dropdown-item text-end" :to="{name:'changepass'}">تغيير كلمة المرور</RouterLink></li>
          </ul>
        </li>
        
          <li  class="nav-item">
            <RouterLink class="nav-link" :to="{name:'Home'}">
          <span class="fw-bold">الرئيسية</span>
              <div class="line-under"></div>               
            </RouterLink>
          </li>
      </ul>
      </div>
    </div>
    <div class="big-nav" >
      <div>
      <ul style="font-size: 0.9rem; align-content: center;" v-if="!userStore.token" class="navbar-nav mt-2 mt-lg-0 p-0" >
        <li  class="nav-item">
              <RouterLink class="nav-link rounded border bk-green text-white" :to="{name:'signup'}">
          <span class="fw-bold">انشاء حساب</span>
          </RouterLink>
          </li>
          <li  class="nav-item">
            <RouterLink class="nav-link" :to="{name:'login'}">
              <span class="green-text fw-bold">تسجيل دخول </span>
            </RouterLink>
           
          </li>
      </ul>
      <ul v-else class="navbar-nav mt-2 mt-lg-0 p-0" style="font-size: 0.9rem; align-content: center;">
        <li  class="nav-item" @click="loguot"  style="cursor: pointer;">
          <a class="nav-link rounded border bk-green text-white" >
            <span class="fw-bold">تسجيل الخروج </span>
          </a>
        </li>
        <li  class="nav-item">
          <a class="nav-link" >
        <span class="green-text fw-bold">اهلا {{ userStore.name }} </span>
          </a>
        </li>
      </ul>
    </div>
   </div>
 </div>
  </nav>

   </header>
</template>

<style scoped>
.dropdown-menu{
  --bs-dropdown-link-active-bg: var(--bs-seccolor)
}
li.dropdown1:hover .dropdown-menu {
    display: block;
}
.dropdown-menuSmallNav{
  --bs-dropdown-link-hover-bg: var(--bs-seccolor);
}
.smallScreen-ul{
    direction: rtl;
    font-size: 1.8rem;
    list-style: none;
    margin: 2rem;
    margin-top: 5rem;
    display: block;
}
.dropdown-menuSmallNav{
  background: none;
  border: none;
}
li.col{
  margin-top: 1rem;
  font-weight: bold;
}
.hid{
  display: none ;
}
.contain{
    width: 100%;
    transform: translateY(0);
    height: 100rem;
    position: absolute;
    z-index: 3;
    top: 0;
    right: 0;
    transition: all ease-in-out 0.1s;
    transform: translateX(2000px);

}

.reverse{
  transform: translateX(0);
  transform: translateY(-10px);
}
.show{
  display: block !important;
}
.navbar-toggler{
    z-index: 4;
    border: 0;
}
.smalllogo{
  z-index: 10;
}
.backimg{
  background-image:none
}
.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}
.collapsing{
  height: 100% !important;
}
li.col a{
    color: white;
    font-weight: bold;
}
li.col a:hover{
    color: var(--bs-seccolor);
}
span{
  position: relative;
}
.contain::before{
  content: "";
    position: absolute;
    left: -116px;
    right: -125px;
    top: 0;
    bottom: 0;
    background: rgb(34 36 58)
}
.line-under{
    width: 1px;
    height: 1px;
    background: black;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: scalex(0);
    margin-right: 5px;
    transition: transform ease-in-out 0.4s;
    transform-origin: right;
}
span:hover~.line-under{
    display: block;
    transform: scalex(60);
}
.dropdown-menu li a:hover{
  background-color: var(--bs-seccolor);
  color: white;
}
@media (max-width: 1200px) {
   .navbar-expand-sm .navbar-toggler{
    display: block !important;
  }
  .big-nav{
    display: none;
   }
   .navbar-expand-sm .navbar-nav .dropdown-menu{
      position: inherit !important;
    }
   
  .white{
  color: white;
  stroke: white;
  z-index: 5;
  transition: all ease-in-out 0.3s;

}
}

@media (min-width: 1200px) {
    .contain{
        display: none !important;
    }
    .smalllogo{
      display: none !important;
    }
 
}

</style>
