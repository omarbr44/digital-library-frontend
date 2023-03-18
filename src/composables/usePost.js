import { ref } from "vue";
import axios from "axios";
import geturl from "./geturl";

const awaitdata = ref(null)
const awaiterror = ref(null)
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
      }).catch((err)=>{
        awaiterror.value= err.data.data
      })
      return { awaitdata,awaiterror } 
      
                                 } 