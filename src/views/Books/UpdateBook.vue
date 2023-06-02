<template>
    <Loading v-if="load" />
    <div v-else>
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">تعديل كتاب</li>
                <li class="breadcrumb-item " aria-current="page"><RouterLink :to="{name:'Home'}">الرئيسية</RouterLink></li>
             </ol>
        </nav> 
        <div class=" px-4 px-md-3" >
                <div class="row mt-3" style="justify-content: space-between;">
                    <div class="col-lg-1"  >  
                    </div>
                    <div class="sec-order col-12 col-lg-8 rtl gy-3 "  >  
                        <form @submit.prevent="submit" >
                        <BaseInput 
                            v-model="bookObj.name"
                            type="text"
                            label="عنوان الكتاب"
                            :error="bookErr.name"
                            required
                            req=1
                        />
                        <BaseInput 
                            v-model="bookObj.edition"
                            type="text"
                            label="اصدار الكتاب"
                            :error="bookErr.edition"
                        />
                       <div v-for=" key in counter">
                           <SelectTyping 
                           v-model="uploadAuthors[key-1]"
                           label="اسم الكاتب"
                           error=""
                           :list="lisstAuthors"
                           required
                           req=1
                           />
                           <span class="SelectXicon" v-if="key>1" @click="cancel(key-1)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                        </div>
                        <div class="mb-2"><a style="cursor: pointer;" @click="newAuthor">إضافة كاتب آخر؟</a></div>
                        <SelectTyping 
                           v-model="uploadPublisher"
                           label="اسم الناشر"
                           :error="publisherErr.Name"
                           :list="lisstPublishers"
                           />
                        <SelectInput 
                            v-model="bookObj.category_id"
                            label="قسم الكتاب"
                            :error="bookErr.category_id"
                            :list="lisstCategory"
                            required
                            req=1
                        />                      
                        <div class="mb-3">
                            <div v-if="bookErr.description">
                             <div class="alert alert-danger" role="alert">{{ bookErr.description }}</div>
                            </div>
                            <label  class="form-label"> وصف الكتاب</label>
                             <textarea maxlength="253" class="form-control rtl"  
                             placeholder="ادخل وصف الكتاب" v-model="bookObj.description"></textarea>
                        </div>
                        <FileInput 
                            @filevalue="filevalue"
                            label="صورة للكتاب"
                            :error="bookErr.image"
                            underDetailes="صيغة الصورة JPG,PNG"
                            
                            req=1
                             />
                             <img v-if="typeof(bookObj.image) == 'string'" style="width: 12rem;" :src="url+bookObj.image" alt="">
                        <FileInput 
                            @filevalue="filevalue"
                            label="ملف الكتاب"
                            :error="bookErr.file_path"
                            underDetailes="صيغة الملف pdf"
                            
                            req=1
                             />
                             <embed v-if="typeof(bookObj.file_path) == 'string'" :src="url+bookObj.file_path" type="">
                        <FileInput 
                            @filevalue="filevalue"
                            label="ملف الكتاب الصوتي"
                            :error="bookErr.book_audio"
                            underDetailes="صيغة الملف MP3"
                             />
                        <embed v-if="typeof(bookObj.book_audio) == 'string'" :src="url+bookObj.book_audio">
                        <div class="d-flex flex-column flex-md-row text-white my-3" >
                            <button  class="btn btn-lg btn-bd-primary mb-3  br-green " >
                                <Loading v-if="loadButton"/>
                                <span v-if="!loadButton">تعديل</span>
                                 <svg v-if="!loadButton" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            </button>
                        </div>
                    </form>
                    </div>
                    <div class="col-12 col-lg-2 flex-center px-0 rounded-2" > 
                     
                    </div>

                </div>
            </div>

           
    
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import BaseInput from '../../components/Form/BaseInput.vue';
import Loading from '../../components/BaseLoading.vue';
import FileInput from '../../components/Form/BaseFileInput.vue';
import SelectInput from '../../components/Form/BaseSelectInput.vue';
import SelectTyping from '../../components/Form/SelectTyping.vue';
import { usePost } from '../../composables/usePost';
import { usePostMultipart } from '../../composables/usePostMultipart';
import { useGet } from '../../composables/useGet';
import { useRouter,RouterLink,useRoute } from "vue-router";
import geturl from '../../composables/geturl';


    const router = useRouter()
    const route = useRoute()
    const url = geturl()
    const load = ref(true)
    const loadButton = ref(false)
    const bookObj = ref({
        id:'',
        name: '',
        Publisher_id: 0,
        accepted: 0,
        category_id: '',
        edition: null,
        description: '',
        file_path: '',
        image: '',
        book_audio: '',
                        })
    const bookErr = ref({
        name: null,
        Publisher_id: null,
        accepted: 0,
        category_id: null,
        edition: null,
        description: null,
        file_path: null,
        image: null,
        book_audio: null,
                        })
    const publisherErr = ref({
        Name: null
    })

    const filevalue = (file,label)=>{
        if(label == 'ملف الكتاب'){
            bookObj.value.file_path = file;
        }
       else if(label == 'صورة للكتاب'){
            bookObj.value.image = file;
        }
        else if(label == 'ملف الكتاب الصوتي'){
            bookObj.value.book_audio = file;
        }
       
                                    }        
        const lisstCategory = ref([])
        const lisstAuthors = ref([]) 
        const lisstPublishers = ref([]) 
        onMounted(async()=>{
          const awaitdataCategory = await useGet("api/Category")
          lisstCategory.value = awaitdataCategory.awaitdata.value
          const awaitdataPublishers = await useGet("api/Publisher")
          lisstPublishers.value = awaitdataPublishers.awaitdata.value
          const awaitdataAuthor = await useGet("api/Author")
          lisstAuthors.value = awaitdataAuthor.awaitdata.value
          load.value = false
          const {awaitdata} = await useGet('api/BooK/show/'+route.params.id)
          bookObj.value = awaitdata.value[0][0]
          for(let i=0;i<awaitdata.value[2].length;i++){
              uploadAuthors.value[i] = awaitdata.value[2][i].name
            }
            uploadPublisher.value = awaitdata.value[4][0].name
            console.log(awaitdata.value[4])
          
        })
        const uploadAuthors = ref(['']) // authors to upload to Authors database table
        const uploadPublisher = ref('') // Publisher to upload to Publisher database table
        const authorIds = ref([])         // returned authorIds from Authors database table
        const bookid = ref(null)         // returned bookid from book database table after submit
        const counter = ref(1)
        const newAuthor = ()=>{
            counter.value++
            uploadAuthors.value.push('')
        }
        const cancel = (key)=>{
            uploadAuthors.value.splice(key,1)
            counter.value--
        }

        const submit = async ()=>{
            loadButton.value = true
            bookErr.value = {
                name: null,
        Publisher_id: null,
        accepted: 0,
        category_id: null,
        edition: null,
        description: null,
        file_path: null,
        image: null,
        book_audio: null,
                        }
       publisherErr.value = {
        Name: null
    }
            // first add publisher to publisher table
            if(uploadPublisher.value){
                const {awaitdata,awaiterror,load} = await usePost("api/Publisher/store",{Name:uploadPublisher.value})
                if(!awaitdata.value){
                    publisherErr.value = awaiterror.value
                }
                else
                bookObj.value.Publisher_id = awaitdata.value
                loadButton.value = load.value
            }
            // second add author to author table
            for(let i=0;i<uploadAuthors.value.length;++i){
                const authorId = await usePost("api/Author/store",{Author_name:uploadAuthors.value[i]})
                authorIds.value[i] = authorId.awaitdata.value
                loadButton.value = authorId.load.value
            }
            let formdata1 = new FormData();
            formdata1.append('name', bookObj.value.name);
            formdata1.append('Publisher_id', bookObj.value.Publisher_id);
            formdata1.append('accepted', bookObj.value.accepted);
            formdata1.append('category_id', bookObj.value.category_id);
            formdata1.append('edition', bookObj.value.edition);
            formdata1.append('description', bookObj.value.description);
            formdata1.append('file_path', bookObj.value.file_path);
            formdata1.append('image', bookObj.value.image);
            formdata1.append('book_audio', bookObj.value.book_audio);
            formdata1.append('_method', 'put');
            
            // third add book to book table
            const book = await usePostMultipart("api/BooK/update/"+bookObj.value.id,formdata1)
            bookid.value = book.awaitdata.value
            if(book.awaiterror.value)
            bookErr.value = book.awaiterror.value
            loadButton.value = book.load.value

            // finally add author-book
           const book_authorState = ref(null)
           const book_authorStateerr = ref(null)
            for(let i=0;i<uploadAuthors.value.length;++i){
                const messge = await usePost("api/AuthorBook/store",{author_id:authorIds.value[i],
                                                                     book_id:bookObj.value.id})
                book_authorState.value = messge.awaitdata.value
                book_authorStateerr.value = messge.awaiterror.value
                loadButton.value = messge.load.value
            }
             if(book_authorState.value.id != null && book.awaitdata.value){
                loadButton.value = false
                router.push({
                    name:'showbooks',
                    query:{msg:' تم تعديل الكتاب بنجاح '}
                })
            } 
        }
 </script>


<style  scoped>
.SelectXicon{
    position: absolute;
    top: 37px;
    left: 8px;
    cursor: pointer;
}
@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
}
</style>