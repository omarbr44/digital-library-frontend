import { ref } from "vue";
import axios from "axios";

const awaitdata = ref(null)
const awaiterror = ref(null)


   export async function usePost(body){
   await axios({
        url:"https://api.api-ninjas.com/v1/animals?name=fox",
        method: 'post',
        data: body,
        headers:{
          //'content-type': 'multipart/form-data'
          'content-type': 'application/json',
        }
      }).then((res)=>{
        awaitdata.value= res
      }).catch((err)=>{
        awaiterror.value= err
      })
      return { awaitdata,awaiterror } 
      
                                 } 