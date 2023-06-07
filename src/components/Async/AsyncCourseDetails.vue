<template>
    <Loading v-if="!data" />
    <div v-else class="row my-5 justify-content-center" >
        
                    <div class="sec-order col-12 col-lg-7 rtl gy-5"  > 
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a @click="accept" v-if="userStore.userType == '1'  && !edit"  class="btn btn-lg btn-bd-primary mb-3 br-green " >قبول الدورة </a>
                            <a @click="$emit('delete')" v-if="userStore.userType == '1'" class="btn btn-lg  mb-3 mx-3 btn-danger " >حذف الدورة </a>
                        </div> 
                        <h2 class="my-3">{{ data.name }}</h2>
                        <button  type="button" class="btn bk-dark text-white " disabled style="opacity: 1;font-size: 0.8rem;">{{ category[0].name }}</button>
                        <h6 >عدد المقاطع :{{ videosCount }}</h6>
                        <h6 v-if="data.size_course">حجمالدورة :{{ data.size_course }}</h6>
                        <div v-if="data.description" class="my-3">
                            <Description what="الدورة" :desc="data.description" />
                        </div>
                        <div class="d-flex flex-column flex-md-row text-white my-3">
                            <a :href="url+zip" class="btn btn-lg btn-bd-primary mb-3  br-green " >تحميل الدورة <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>
                       </div>   
                    </div>
                    <div class=" col-lg-1"  ></div>
                    <div class="col-10 col-lg-4 " >  
                       <img :src="url+data.image" class="shadow-sm p-3 bg-body" alt="book"  style="width: 100%;">
                    </div>
                </div>
                    <div v-if="data"  class="row my-5 justify-content-center" >
                    <div class="videosContainer">
                                <div v-for="video in videos" :key="video.id" class="video col-lg-11 col-12 mb-4">
                                    <div class="embed-responsive embed-responsive-1by1">
<!--                                      <iframe class="embed-responsive-item" allowfullscreen sandbox :src="url+video.file_path"></iframe>
 -->                                    <!-- <object>
                                            <param name="movie" :value="url+video.file_path" allowfullscreen sandbox>
                                            <embed class="embed-responsive-item" :src="url+video.file_path" allowfullscreen="1" autostart="0" sandbox>
                                        </object> -->
                                     <video style="width: 100%;height: 10rem;" controls class="embed-responsive-item" allowfullscreen sandbox :src="url+video.file_path"></video>

                                    <p class="col-lg-5 col-11 mx-4">{{ video.name }}</p>
                                     <div class="d-flex justify-content-center col-lg-4 col-11">
                                     <a @click="deleteeVid(video.id)" v-if="userStore.userType == '1'" class="btn  mb-3 btn-danger mx-3" >حذف الفيديو </a>
                                     <button @click="downloadVid(url+video.file_path,video.name)" class="btn btn-bd-primary mb-3 bk-green text-white" > تحميل الفيديو </button>
                                    </div>
                                    </div>
                                </div>
                       </div>
                       <div v-if="userStore.userType == '1'" class="rtl mt-5">
                       <FileInput 
                            @filevalue="filevalue"
                            label="اضافة مقاطع"
                            underDetailes="صيغة الملف zip,mp4"
                            required
                             />
                             <div class="text-white">
                             <a @click="submit"  class="btn btn-lg btn-bd-primary mb-3 br-green " > اضافة </a>
                            </div>
                            </div>
                    </div>   
</template>

<script setup>
import { watchEffect,ref } from "vue";
import Description from "../BaseDescription.vue";
import { useGet } from '../../composables/useGet';
import { useUpdate } from '../../composables/useUpdate';
import { useDelete } from '../../composables/useDelete';
import Loading from "../BaseLoading.vue";
import geturl from '../../composables/geturl';
import { onBeforeRouteLeave } from "vue-router";
import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router";
import FileInput from '../../components/Form/BaseFileInput.vue';
import { usePostMultipart } from '../../composables/usePostMultipart';

const router = useRouter()
const userStore= useUserStore()
    const emit = defineEmits(['similarCourses'])
    const props = defineProps({
        id:{
            type:[String,Number]
        }
    })
    const url = geturl()
    const data = ref(null)
    const videos = ref(null)
    const videosCount = ref(null)
    const similarCourses = ref(null)
    const category = ref(null)
    const zip = ref(null)
    const error = ref(null)
    const edit = ref(true)

    const filevalue = (file)=>{
        courseObj.value.file_path = file;
                                            }   
                                            const courseObj = ref({
      
        description: '',
        file_path: '',
                        })
        watchEffect(async()=>{
            data.value = null
            const { awaitdata,awaiterror } = await useGet('api/Course/show/'+props.id) 
            data.value = awaitdata.value[0]
            if(data.value.accepted == 0)
            edit.value = false
            videos.value = awaitdata.value[1]
            videosCount.value = videos.value.length
            category.value= awaitdata.value[3]
            zip.value= awaitdata.value[4]
            similarCourses.value = awaitdata.value[2].data
            window.scrollTo(0,0)
            error.value = awaiterror.value
            emit('similarCourses',similarCourses.value)
        })

        onBeforeRouteLeave(async(to,from, next)=>{
                const { awaitdata,awaiterror } = await useGet('api/Course/DeleteZip/'+zip.value) 
                next()
        })
        const downloadVid = (url,name)=>{
            var blob = new Blob([url], {type: "video/mp4"})
            console.log(blob.size)
            var link = document.createElement('a')
            document.body.appendChild(link)
            link.style = "display: none"
            link.href = URL.createObjectURL(blob)
            link.download = name
            console.log(link)
            link.click()
            window.URL.revokeObjectURL(link.href)
            document.body.removeChild(link)
        }
        const accept = async ()=>{
                data.value.accepted = 1
             const { awaitdata,awaiterror } = await useUpdate('api/Course/update/'+props.id,data.value)
             if(awaitdata.value)
                {
                    router.go()
                }
            }
        const deleteeVid = async (id)=>{
                const { awaitdata,awaiterror } = await useDelete('api/Video/destroy/'+id)
                if(awaitdata.value)
                {
                    router.go()
                }
        }
        
        const submit = async ()=>{
          
            let formdata1 = new FormData();
           
            formdata1.append('description', courseObj.value.description);
            for(let i=0;i<[...courseObj.value.file_path].length;i++){
            formdata1.append('file_path[]', [...courseObj.value.file_path][i]);
            }
            const course = await usePostMultipart("api/Video/store/"+data.value.id,formdata1)
             if(!course.awaitdata.value){
                courseErr.value = course.awaiterror.value
                loadButton.value = false
                 Object.keys( course.awaiterror.value ).find((e)=>{
                    if(e == 'file_path.0'){
                        courseErr.value.file_path = 'The file path field must be a file of type: mp4, mov, mkv, MP4.'
                    }
                }) 
             } 
              else{
                loadButton.value = false
                router.go()
             } 
            } 
        
    </script>

<style scoped>
.embed-responsive{
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: space-evenly;
}
.videosContainer{
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    height: 20rem;
    justify-content: space-evenly;
    align-items: center;
    overflow-y: scroll;
}
@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
    .embed-responsive{
     flex-direction: column; 
    align-items: center;
    justify-content: space-evenly;
                     }
    .embed-responsive p{
        text-align: center;
    }

}
</style>