<template>
     <div class="mesa-con" v-show="showDelete">
        
        <div class="squa">
           <div style=" background: white;
           padding: 6rem;
           border-radius: 15px;
           box-shadow: 1px 1px 10px 2px #888888;">
           <h3 class="h3-t text-danger">تنبيه</h3>
           <p>?هل انت متأكد من حذف هذا الحقل</p>
           <div class="d-flex flex-column flex-md-row text-white my-3">
                       <a @click="$emit('cancel')"   class="btn btn-lg btn-bd-primary mb-3 br-green mx-3" > الغاء </a>
                       <a @click="deleteee"  class="btn btn-lg  mb-3 mx-3 btn-danger " >
                        
                        <Loading v-if="loadButton"/>
                        <span v-if="!loadButton" >حذف</span>
                    </a>
                   </div>
           </div>
         </div>
       </div>
</template>

<script setup>
import { ref,watchEffect } from 'vue';
import { useDelete } from '../composables/useDelete';
import { useRouter } from 'vue-router';
import Loading from '../components/BaseLoading.vue'
const router = useRouter()
const props = defineProps({
    url:{
        type:String,
        default:''
    },
    go:{
        type:String,
        default:''
    },
    showDelete:{
        type:Boolean,
        default:''
    }
})
const showDelete = ref(false)
const loadButton = ref(false)
watchEffect(()=>{
    showDelete.value = props.showDelete
})
const deleteee = async ()=>{
                loadButton.value = true
                const { awaitdata,awaiterror } = await useDelete(props.url)
                if(awaitdata.value)
                {
                    if(props.go)
                    router.push({name:props.go,query:{msg:'تم الحذف بنجاح'}})
                    else
                    router.go()
                }
        }
</script>

<style scoped>
.squa::before{
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f5fff4e3
}
.squa{
    height: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 10px 2px #888888;
}
.mesa-con{
    height: 100%;
    width: 100%;
    position: absolute;
    text-align: center;
}
</style>