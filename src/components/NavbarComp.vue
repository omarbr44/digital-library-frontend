<script setup>
import { ref } from 'vue';

  const svg =ref(null)
  const logo =ref(null)
  const smalllogo =ref(null)
  const container =ref(null)
  const icon =ref(null)
  const navtoggle = ()=>{
    svg.value.classList.toggle("hid")
    svg.value.classList.toggle("white")
    logo.value.classList.toggle("hid")
    smalllogo.value.classList.toggle("hid")
    container.value.classList.toggle("reverse")
    icon.value.classList.toggle("backimg")
  }
</script>
<template>
   <header>
    <nav class="navbar navbar-expand-sm navbar-light ">
      <div class="container">
        <a ref="logo" class="navbar-brand" href="#"><img src="../assets/img/logo.png" alt="logo" width="60"></a>
        <a ref="smalllogo" class="navbar-brand hid smalllogo" href="#"><img src="../assets/img/whitelogo.png" alt="logo" width="60"></a>

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
            <a href="">
              الرئيسية  
            </a>
          </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            اضافة
          </a>
          <ul class="dropdown-menu dropdown-menuSmallNav" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item text-end text-white" href="#">اضافة كتاب</a></li>
            <li><a class="dropdown-item text-end text-white" href="#">اضافة دورة</a></li>
            <li><a class="dropdown-item text-end text-white" href="#">اضافة برنامج</a></li>
            <li><a class="dropdown-item text-end text-white" href="#">اضافة كتاب صوتي</a></li>
          </ul>
        </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            تصفح
          </a>
          <ul class="dropdown-menu dropdown-menuSmallNav" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item text-end text-white" href="#">تصفح الكتب</a></li>
            <li><a class="dropdown-item text-end text-white" href="#">تصفح الدورات</a></li>
            <li><a class="dropdown-item text-end text-white" href="#">تصفح البرامج</a></li>
            <li><a class="dropdown-item text-end text-white" href="#">تصفح الكتب الصوتية</a></li>
            <li><a class="dropdown-item text-end text-white" href="#">تصفح المشاريع</a></li>
            <li><a class="dropdown-item text-end text-white" href="#">تصفح المحاضرات</a></li>
          </ul>
        </li>
          
          <li>
              <a href="#" class="btn btn-lg bk-green text-white my-4" >انشاء حساب </a>          
          </li>
          <li>
              <a href="#" class="btn btn-lg mb-3 br-green text-white " > تسجيل الدخول </a>          
          </li>
       
        
        
       
        
      </ul>
      </div>
    </div>
    <div class="big-nav">
      <div>
        <ul class="navbar-nav mt-2 mt-lg-0 p-0 ">
          <li class="nav-item dropdown dropdown1">
          <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button">
            <span class="fw-bold">اضافة</span>
          </a>
          <ul class="dropdown-menu " >
            <li><a class="dropdown-item text-end" href="#">اضافة كتاب</a></li>
            <li><a class="dropdown-item text-end" href="#">اضافة دورة</a></li>
            <li><a class="dropdown-item text-end" href="#">اضافة برنامج</a></li>
            <li><a class="dropdown-item text-end" href="#">اضافة كتاب صوتي</a></li>
          </ul>
        </li>
          <li class="nav-item dropdown dropdown1">
          <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button">
            <span class="fw-bold">تصفح</span>
          </a>
          <ul class="dropdown-menu " >
            <li><a class="dropdown-item text-end" href="#">تصفح الكتب</a></li>
            <li><a class="dropdown-item text-end" href="#">تصفح الدورات</a></li>
            <li><a class="dropdown-item text-end" href="#">تصفح البرامج</a></li>
            <li><a class="dropdown-item text-end" href="#">تصفح الكتب الصوتية</a></li>
            <li><a class="dropdown-item text-end" href="#">تصفح المشاريع</a></li>
            <li><a class="dropdown-item text-end" href="#">تصفح المحاضرات</a></li>
          </ul>
        </li>
          <li  class="nav-item">
            <a class="nav-link" href="">
          <span class="fw-bold">الرئيسية</span>
              <div class="line-under"></div>               
            </a>
          </li>
         
         
          <!-- <li>
              <a href="#" class="btn btn-lg mb-3 bk-green text-white my-5" >الغاء <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
                       
          </li> -->
       
        
        
       
        
      </ul>
      </div>
    </div>
    <div class="big-nav" >
      <div>
      <ul class="navbar-nav mt-2 mt-lg-0 p-0" >
        <li  class="nav-item">
            <a class="nav-link rounded border bk-green text-white" href="">
          <span class="fw-bold">انشاء حساب</span>
             </a>
          </li>
          <li  class="nav-item">
            <a class="nav-link" href="">
          <span class="green-text fw-bold">تسجيل دخول </span>
            </a>
          </li>
      </ul>
    </div>
   </div>
 </div>
  </nav>

  <!-- <nav class="navbar navbar-expand-sm navbar-light ">
       <div class="container">
       <a class="navbar-brand" href="#">Navbar</a>
       <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
         aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
       </button>
       <div class="collapse navbar-collapse rtl" id="collapsibleNavId">
        
         <ul class="navbar-nav mt-2 mt-lg-0 p-0 ">
           <li class="nav-item">
             <a class="nav-link" href="#">تسجيل الدخول</a>
           </li>
           <li class="nav-item">
             <a class="nav-link active" href="#" aria-current="page">الرئيسية <span class="visually-hidden">(current)</span></a>
           </li>
           <li class="nav-item">
             <a class="nav-link" href="#">الرئيسية</a>
           </li>
           <li class="nav-item">
             <a class="nav-link" href="#">الرئيسية</a>
           </li>
           
          
         </ul>
       </div>
     </div>
   </nav> -->
   
   </header>
</template>

<style scoped>

li.dropdown1:hover .dropdown-menu {
    display: block;
}
.dropdown-menu{
  --bs-dropdown-link-active-bg: var(--bs-firstcolor);
}
.dropdown-menuSmallNav{
  --bs-dropdown-link-hover-bg: var(--bs-seccolor);
}
.smallScreen-ul{
    direction: rtl;
    font-size: 1.8rem;
    list-style: none;
    margin: 2rem;
    margin-top: 7rem;
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
    transition: all ease-in-out 0.3s;
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

@media (max-width: 575px) {
   .big-nav{
    display: none;
   }
   
  .white{
  color: white;
  stroke: white;
  z-index: 5;
  transition: all ease-in-out 0.3s;

}
}
@media (min-width: 577px) {
    .contain{
        display: none !important;
    }
 
}

</style>
