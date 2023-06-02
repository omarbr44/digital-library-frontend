import { ref } from "vue";
import axios from "axios";
import geturl from "./geturl";

const awaitdata = ref(null)
const awaiterror = ref(null)
const load = ref(true)
const url = geturl()
import { useUserStore } from '@/stores/user'

const userStore= useUserStore()


   export async function usePostMultipart(api,body){
   await axios({
        url:url+api,
        method: 'post',
        data: body,
        headers:{
          'content-type': 'multipart/form-data',
          "Authorization": "Bearer "+userStore.token
        } 
      }).then((res)=>{
        awaitdata.value= res.data
        awaiterror.value= null
        load.value = false
      }).catch((err)=>{
        awaiterror.value= err.response.data
        awaitdata.value= null
        load.value = false
      })
      return { awaitdata,awaiterror,load } 
      
                                 } 