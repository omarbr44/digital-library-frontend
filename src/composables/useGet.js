import { ref } from "vue";
import axios from "axios";

const awaitdata = ref(null)
const awaiterror = ref(null)


   export async function useGet(){
   await axios({
        url:"https://api.api-ninjas.com/v1/animals?name=fox",
        method: 'get',
        headers:{
          //'content-type': 'multipart/form-data'
          'content-type': 'application/json',
          'X-Api-Key': 'zbPvmgHkTv7t7roYr+4P/w==9Xxm6QAAmkRVKYCc'
        }
      }).then((res)=>{
        awaitdata.value= res
      }).catch((err)=>{
        awaiterror.value= err
      })
      return { awaitdata,awaiterror } 
      
                                 } 