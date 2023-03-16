<template>
     <!-- <Book v-for=" bit in data" :data="bit"/> -->
     <div class="col-12 col-lg-4 text-center rtl line-under"  >  
                    <RouterLink 
                    :to="{
                        name: 'bookdetails',
                        params: {id:1}
                         }">
                        <div class="goo">
                            <img src="../assets/img/think.jpeg" class="shadow-sm p-3 bg-body"  alt="book"  >
                            <div class="bookmark"></div>
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p class="m-0">Think like a programer </p>
                            <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>    
                        </div>
                        <hr>
        </div>
     <div class="col-12 col-lg-4 text-center rtl line-under"  >  
                    <RouterLink 
                    :to="{
                        name: 'bookdetails',
                        params: {id:1}
                         }">
                        <div class="goo">
                            <img src="../assets/img/think2.jpeg" class="shadow-sm p-3 bg-body"  alt="book" >
                            <div class="bookmark"></div>
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p class="m-0 text-end">The hidden language of computer</p>
                            <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>    
                        </div>
                        <hr>
         </div>
     <div class="col-12 col-lg-4 text-center rtl line-under"  >  
                    <RouterLink 
                    :to="{
                        name: 'bookdetails',
                        params: {id:1}
                         }">
                        <div class="goo">
                            <img src="../assets/img/think(3).jpeg" class="shadow-sm p-3 bg-body"  alt="book"  >
                            <div class="bookmark"></div>
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p class="m-0">Algorithems design </p>
                            <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>    
                        </div>
                        <hr>
         </div>
     <div class="col-12 col-lg-4 text-center rtl line-under"  >  
                    <RouterLink 
                    :to="{
                        name: 'bookdetails',
                        params: {id:1}
                         }">
                        <div class="goo">
                            <img src="../assets/img/think(4).jpeg" class="shadow-sm p-3 bg-body"  alt="book"  >
                            <div class="bookmark"></div>
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p class="m-0">Introduction to algorithems </p>
                            <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>    
                        </div>
                        <hr>
         </div>
     <div class="col-12 col-lg-4 text-center rtl line-under"  >  
                    <RouterLink 
                    :to="{
                        name: 'bookdetails',
                        params: {id:1}
                         }">
                        <div class="goo">
                            <img src="../assets/img/think(5).jpeg" class="shadow-sm p-3 bg-body"  alt="book" >
                            <div class="bookmark"></div>
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p class="m-0">  The boring stuff with python </p>
                            <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>    
                        </div>
                        <hr>
         </div>
     <div class="col-12 col-lg-4 text-center rtl line-under"  >  
                    <RouterLink 
                    :to="{
                        name: 'bookdetails',
                        params: {id:1}
                         }">
                        <div class="goo">
                            <img src="../assets/img/download.jpg" class="shadow-sm p-3 bg-body"  alt="book" >
                            <div class="bookmark"></div>
                        </div>
                    </RouterLink>
                        <div class="under-card my-3">
                            <p class="m-0">Atomic habits </p>
                            <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">برمجة</button>    
                        </div>
                        <hr>
         </div>
</template>

<script setup>
import Book from '../components/Book.vue';
import { watchEffect, ref} from 'vue';
import { useGet } from '../composables/useGet';
  const emit = defineEmits(['paginationEmit'])
  const props = defineProps({
        searchValue:{
            type: String,
            default:''
        },
        filterValue:{
            type: String,
            default:''
        },
        currentPageToGet:{
            type: Number,
        }
    })
    const data = ref(null)
    const error = ref(null)

    watchEffect(async ()=>{
        const { awaitdata,awaiterror } = await useGet(props.searchValue,props.filterValue,props.currentPageToGet) 
        data.value = awaitdata
        error.value = awaiterror
        emit('paginationEmit',data.pages) // to take how many pages and giv it to pagination
    })
   
   
</script>

<style scoped>
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
    width: 15rem;
    height: 19rem;
}
@media (max-width: 991px){
    img{
    width: 70%;
    height: 100%;

}
}

img:hover~.bookmark{
    display: block;
transform: scaleY(100);
}   
</style>