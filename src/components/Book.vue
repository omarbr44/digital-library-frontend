<template>
    
        <div class="col-12 col-lg-4 text-center rtl line-under"  >  
            <!-- <p v-if="data">{{ data }}</p> -->
                    <RouterLink 
                    :to="{
                        name: 'bookdetails',
                        params: {id:id}
                         }">
                        <div class="goo">
                            <img src="../assets/img/download.jpg" class="shadow-sm p-3 bg-body"  alt="book"  style="width: 70%;">
                            <div class="bookmark"></div>
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p class="m-0">تعلم البرمجة مع عبدالله</p>
                            <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>    
                        </div>
                        <hr>
         </div>
   
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
    data: {
        type: Object,
        default:null
          }
})

const id =ref('1')
</script>
<style  scoped>
.under-card{
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}
hr{
    margin: 2rem 0;
    margin-left: auto;
    margin-right: auto;
    width: 30%;
    color: var(--bs-seccolor);

}

.bookmark{
    background: var(--bs-firstcolor);
    width: 2rem;
    height: 0.1px;
    position: absolute;
    top: 0;
    right: 90px;
    transition: transform ease-in-out 0.4s;
    transform-origin: top;
}
img{
    cursor: pointer;
}

img:hover~.bookmark{
    display: block;
transform: scaleY(100);
}   
</style>