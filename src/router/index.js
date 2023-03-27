import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition){
    return {top:0}
  },
  routes: [
   /* {
      path: '/',
      name: 'home',
      component: HomeView
    },*/
    {
      path: '/',
      name: 'Home',
     
      component: () => import('../views/Home.vue')
    } ,
    // books paths
    {
      path: '/showbooks',
      name: 'showbooks',
      
      component: () => import('../views/Books/ShowBooks.vue')
    } ,
    {
      path: '/bookdetails/:id',
      name: 'bookdetails',
      props: true,
      component: () => import('../views/Books/BookDetails.vue')
    } ,
    {
      path: '/addbook',
      name: 'addbook',
      component: () => import('../views/Books/AddBook.vue')
    } ,
    // programs paths
    {
      path: '/showprograms',
      name: 'showprograms',
      component: () => import('../views/Programs/ShowPrograms.vue')
    } ,
    {
      path: '/addprogram',
      name: 'addprogram',
      component: () => import('../views/Programs/AddProgram.vue')
    } ,
    {
      path: '/programdetails/:id',
      name: 'programdetails',
      props: true,
      component: () => import('../views/Programs/ProgramDetails.vue')
    } ,
  ]
  
})

export default router
