<template>
    <div>
        <nav  style="--bs-breadcrumb-divider: '<';
         background-color: #f7f7f7;" aria-label="breadcrumb">
             <ol class="breadcrumb justify-content-end mx-4 my-3 p-3">
                <li class="breadcrumb-item active">اضافة كتاب</li>
                <li class="breadcrumb-item " aria-current="page"><a href="#">الرئيسية</a></li>
             </ol>
        </nav> 
        <div class=" px-4 px-md-3" >
                <div class="row mt-3" style="justify-content: space-between;">
                    <div class="col-lg-1"  >  
                    </div>
                    <div class="sec-order col-12 col-lg-6 rtl gy-3 "  >  
                        <form @submit.prevent="submit" >
                        <BaseInput 
                            v-model="bookObj.name"
                            type="text"
                            label="عنوان الكتاب"
                            error=""
                        />
                        <BaseInput 
                            v-model="bookObj.edition"
                            type="text"
                            label="اصدار الكتاب"
                            error=""
                        />
                       <div v-for=" key in counter">
                           <SelectTyping 
                           v-model="uploadAuthors[key-1]"
                           label="اسم الكاتب"
                           error=""
                           :list="lisstAuthors"
                           />
                           <span class="SelectXicon" v-if="key>1" @click="cancel(key-1)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                        </div>
                        <div class="mb-2"><a style="cursor: pointer;" @click="newAuthor">إضافة كاتب آخر؟</a></div>
                        <!-- <component :is="" ></component> -->
                        <SelectTyping 
                           v-model="uploadPublisher"
                           label="اسم الناشر"
                           error=""
                           :list="lisstPublishers"
                           />
                        <SelectInput 
                            v-model="bookObj.category_id"
                            label="قسم الكتاب"
                            error=""
                            :list="lisstCategory"
                        />                      
                        <div class="mb-3">
                            <label  class="form-label"> وصف الكتاب</label>
                             <textarea maxlength="253" class="form-control rtl"  
                             placeholder="ادخل وصف الكتاب" v-model="bookObj.description"></textarea>
                        </div>
                        <FileInput 
                            @filevalue="filevalue"
                            label="صورة للكتاب"
                            error=""
                            underDetailes="صيغة الصورة JPG,PNG"
                            required />
                        <FileInput 
                            @filevalue="filevalue"
                            label="ملف الكتاب"
                            error=""
                            underDetailes="صيغة الملف pdf"
                            required />
                        <FileInput 
                            @filevalue="filevalue"
                            label="ملف الكتاب الصوتي"
                            error=""
                            underDetailes="صيغة الملف MP3"
                             />
                       
                        <div class="d-flex flex-column flex-md-row text-white my-3" >
                            <button  class="btn btn-lg btn-bd-primary mb-3  br-green " >اضافة <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg></button>
                            <a href="#" class="btn btn-lg mb-3 bk-green text-white mx-4" >الغاء <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
                       </div>
                    </form>
                    </div>
                    <div class="col-12 col-lg-4 flex-center px-0 rounded-2" > 
                       <AddSwiperSection />
                    </div>

                </div>
            </div>

           
    
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import BaseInput from '../../components/BaseInput.vue';
import FileInput from '../../components/FileInput.vue';
import SelectInput from '../../components/SelectInput.vue';
import AddSwiperSection from '../../components/AddSwiperSection.vue';
import SelectTyping from '../../components/SelectTyping.vue';
import { usePost } from '../../composables/usePost';
import { usePostMultipart } from '../../composables/usePostMultipart';
import { useGet } from '../../composables/useGet';


    const bookObj = ref({
        name: '',
        Publisher_id: null,
        accepted: 0,
        category_id: 'قسم الكتاب',
        edition: null,
        description: '',
        file_path: '',
        image: '',
        book_audio: '',
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
            // first add publisher to publisher table
            const publisher = await usePost("api/Publisher/store",{Publisher_name:uploadPublisher.value})
            bookObj.value.Publisher_id = publisher.awaitdata.value

            // second add author to author table
            for(let i=0;i<uploadAuthors.value.length;++i){
                const authorId = await usePost("api/Author/store",{Author_name:uploadAuthors.value[i]})
                 authorIds.value[i] = authorId.awaitdata.value
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


            const book = await usePostMultipart("api/BooK/store",formdata1)
            const bookErr = ref(null)
            bookid.value = book.awaitdata.value
            bookErr.value = book.awaiterror.value
            console.log(bookErr.value)
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