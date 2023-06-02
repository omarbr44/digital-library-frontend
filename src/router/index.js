import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition){
    return {top:0}
  },
  routes: [

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
      path: '/updatebook/:id',
      name: 'updatebook',
      props: true,
      component: () => import('../views/Books/UpdateBook.vue')
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
    {
      path: '/updateprogram/:id',
      name: 'updateprogram',
      props: true,
      component: () => import('../views/Programs/UpdateProgram.vue')
    } ,
    // Courses paths
    {
      path: '/showcourses',
      name: 'showcourses',
      component: () => import('../views/Courses/ShowCourses.vue')
    } ,
    {
      path: '/addcourse',
      name: 'addcourse',
      component: () => import('../views/Courses/AddCourse.vue')
    } ,
    {
      path: '/coursedetails/:id',
      name: 'coursedetails',
      props: true,
      component: () => import('../views/Courses/CourseDetails.vue')
    } ,
    {
      path: '/showprojects',
      name: 'showprojects',
      component: () => import('../views/Projects/ShowProjects.vue')
    } ,
    {
      path: '/addproject',
      name: 'addproject',
      component: () => import('../views/Projects/AddProject.vue'),
      meta: {admin: true}
    } , 
    {
      path: '/projectdetails/:id',
      name: 'projectdetails',
      props: true,
      component: () => import('../views/Projects/ProjectDetails.vue')
    } ,
    {
      path: '/showlectures',
      name: 'showlectures',
      component: () => import('../views/Lectures/showLectures.vue')
    } ,
    {
      path: '/addlecture',
      name: 'addlecture',
      component: () => import('../views/Lectures/AddLecture.vue'),
      meta: {requiresAuth: true}
    } , 
    {
      path: '/addsubject',
      name: 'addsubject',
      component: () => import('../views/AddSubject.vue'),
      meta: {requiresAuth: true}
    } , 
    {
      path: '/addads',
      name: 'addads',
      component: () => import('../views/Ads/addAds.vue'),
      meta: {admin: true}

    } , 
    {
      path: '/showads',
      name: 'showads',
      component: () => import('../views/Ads/showAds.vue'),
      meta: {admin: true}
    } , 
    {
      path: '/adsdetailes/:id',
      name: 'adsdetailes',
      component: () => import('../views/Ads/adsDetailes.vue'),
      meta: {admin: true}
    } , 
    {
      path: '/lecturedetails/:id',
      name: 'lecturedetails',
      props: true,
      component: () => import('../views/Lectures/LectureDetails.vue')
    } ,
    {
      path: '/SubjecDetails',
      name: 'SubjecDetails',
      props: true,
      component: () => import('../views/Lectures/SubjecDetails.vue')
    } ,
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signupForm.vue')
    } ,
    {
      path: '/login',
      name: 'login',
      props: true,
      component: () => import('../views/loginForm.vue')
    } ,
    {
      path: '/usersshow',
      name: 'usersshow',
      component: () => import('../views/usersShow.vue'),
      meta: {admin: true}
    } ,
    {
      path: '/catagoriesadd',
      name: 'catagoriesadd',
      component: () => import('../views/catagoriesAdd.vue'),
      meta: {admin: true}
    } ,
    {
      path: '/changepass/:id',
      name: 'changepass1',
      component: () => import('../views/ChangePass.vue'),
      props: true,
      meta: {admin: true},
      meta: {superadmin: true},
    } ,
    {
      path: '/changepass',
      name: 'changepass',
      component: () => import('../views/ChangePass.vue'),
      meta: {requiresAuth: true}
      
    } ,
    {
      path: '/superadmin',
      name: 'superadmin',
      component: () => import('../views/superAdmin.vue'),
    } ,
    {
      path: '/addsug',
      name: 'addsug',
      component: () => import('../views/Suggesion/Add.vue'),
    } ,
    {
      path: '/showsug',
      name: 'showsug',
      component: () => import('../views/Suggesion/show.vue'),
    } ,
    {
      path: '/department',
      name: 'department',
      component: () => import('../views/department.vue'),
      meta: {admin: true}
    } ,
    {
      path: '/years',
      name: 'years',
      component: () => import('../views/years.vue'),
      meta: {admin: true}
    } ,
    {
      path: '/:catchAll(.*)', 
      name: '_404',
      component: () => import('../views/_404.vue'),

    },
  ] 
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()
  if(to.matched.some((record)=> record.meta.requiresAuth)){
    if(user.token){
      next()
      return
    }
    next("login")
  } else if(to.matched.some((record)=> record.meta.admin)){
    if(user.token && user.userType == 1){
      next()
      return
    }
    next("login")
  }
   else if(to.matched.some((record)=> record.meta.superadmin)){
    if(user.token && user.userType == 3){
      next()
      return
    }
    next("login")
  }
  else{
    next()
  }
})

export default router
