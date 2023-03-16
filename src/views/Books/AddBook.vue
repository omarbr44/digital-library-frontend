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
                        <form action="">
                        <BaseInput 
                            v-model="bookObj.bookTitle"
                            type="text"
                            label="عنوان الكتاب"
                            error=""
                        />
                       <div v-for=" key in counter">
                           <SelectTyping 
                           v-model="uploadAuthors[key-1]"
                           label="اسم الكاتب"
                           error=""
                           :list="lisst"
                           />
                        </div>
                        <a @click="newAuthor">إضافة كاتب آخر؟</a> 
                        <!-- <component :is="" ></component> -->
                        <BaseInput 
                            v-model="bookObj.publisher"
                            type="text" 
                            label="اسم الناشر"
                            error=""
                        />
                        <SelectInput 
                            v-model="bookObj.bookSubject"
                            label="قسم الكتاب"
                            error=""
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
                            <button class="btn btn-lg btn-bd-primary mb-3  br-green " >اضافة <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg></button>
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
import { ref } from 'vue';
import BaseInput from '../../components/BaseInput.vue';
import FileInput from '../../components/FileInput.vue';
import SelectInput from '../../components/SelectInput.vue';
import AddSwiperSection from '../../components/AddSwiperSection.vue';
import { usePost } from '../../composables/usePost';
import SelectTyping from '../../components/SelectTyping.vue';

    const bookObj = ref({
        bookTitle: '',
        publisher: '',
        bookSubject: 'قسم الكتاب',
        description: '',
        bookFile: '',
        bookFileImage: '',
        bookFileAudio: '',
                        })
    const filevalue = (file,label)=>{
        if(label == 'ملف الكتاب'){
            bookObj.value.bookFile = file;
        }
       else if(label == 'صورة للكتاب'){
            bookObj.value.bookFileImage = file;
        }
        else if(label == 'ملف الكتاب الصوتي'){
            bookObj.value.bookFileAudio = file;
        }
       
                                    }                      
/*     const { awaitdata,awaiterror } = usePost(url,bookObj)
 */
        
        const lisst = ref(['omar','ali','boma']) // authors from database
        const uploadAuthors = ref(['']) // authors to upload to database 
        //const listOfnewlisst = ref(['']) //  to check that author not exists in author table
        const counter = ref(1)
        const newAuthor = ()=>{
            counter.value++
            uploadAuthors.value.push('')
            console.log(uploadAuthors.value)
        }
        /* const newlisst = (list)=>{       // emmitted from selectTyping
            listOfnewlisst.value = uploadAuthors.value
            for(i=0;i++;i<listOfnewlisst.value){
                listOfnewlisst.value[i] = list
            }
        } */
        const submit = ()=>{
            // first add publisher to publisher table

            // second add author to author table
           /*  uploadAuthors.value.forEach(e => {
                // check that author not exists in author table
    
            }); */
        }


 </script>


<style  scoped>

@media only screen and (max-width: 992px) {
    .sec-order{
        order: 2;
    }
}
</style>