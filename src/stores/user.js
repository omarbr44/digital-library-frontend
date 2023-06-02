import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const name = ref(null)  
  const userType = ref(null)  
  const userid = ref(null)  
  //const doubleCount = computed(() => count.value * 2)
  function addToken(tok,user_name,user_type,id) {
    token.value = tok
    name.value = user_name
    userType.value = user_type
    userid.value = id
  }
  function signOut() {
    token.value = null;
    name.value = null
    userType.value = null
    userid.value = null
  }
  return { token,name,userType,userid,addToken,signOut }
},
{
  persist: true
})
