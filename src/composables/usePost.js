import { ref } from "vue";
import axios from "axios";
import geturl from "./geturl";
import { useUserStore } from '@/stores/user'

const userStore= useUserStore()

const awaitdata = ref(null)
const awaiterror = ref(null)
const load = ref(true)
const url = geturl()

   export async function usePost(api,body){
   await axios({
        url:url+api,
        method: 'post',
        data: body,
        headers:{
          'content-type': 'multipart/form-data',
          'content-type': 'application/json',
          "Authorization": "Bearer "+userStore.token
        } 
      }).then((res)=>{
        awaitdata.value= res.data
        awaiterror.value= null
        load.value = true
      }).catch((err)=>{
        awaiterror.value= err.response.data
        awaitdata.value= null
        load.value = false
      })
      return { awaitdata,awaiterror,load } 
      
                                 } 