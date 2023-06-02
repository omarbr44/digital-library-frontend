import { ref } from "vue";
import axios from "axios";
import geturl from "./geturl";
import { useUserStore } from '@/stores/user'

const userStore= useUserStore()
const awaitdata = ref(null)
const awaiterror = ref(null)
const url = geturl()

   export async function useDelete(api){
   await axios({
        url:url+api,
        method: 'delete',
        headers:{
          //'content-type': 'multipart/form-data'
          'content-type': 'application/json',
          "Authorization": "Bearer "+userStore.token
        }
      }).then((res)=>{
        awaitdata.value= res.data
      }).catch((err)=>{
        awaiterror.value= err.data
      })
      return { awaitdata,awaiterror } 
      
                                 } 