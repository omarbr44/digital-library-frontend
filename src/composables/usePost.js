import { ref } from "vue";
import axios from "axios";
import geturl from "./geturl";

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
        } 
      }).then((res)=>{
        awaitdata.value= res.data.data
        load.value = false
      }).catch((err)=>{
        awaiterror.value= err.response.data.data
        load.value = false
      })
      return { awaitdata,awaiterror,load } 
      
                                 } 