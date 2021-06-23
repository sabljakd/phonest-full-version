<template>

 <div class="dodavanje-phones">
  <div class="error">{{error}}</div>
  <div>
     <h1 class="h1-modal">Dodaj Recenziju</h1>
  </div>
  <div class="modal-body">
   <div class="row">
    
    <div class="col-md-4"></div>

    <div class="col-md-4">
     <div class="form-group">
      <input
       v-model="body.title"
       type="text"
       placeholder="Title"
       class="form-control"
      />
     </div>

     <div class="form-group">
      <input
       v-model="body.category"
       type="text"
       placeholder="Kategorija"
       class="form-control"
      />
     </div>

     <div class="form-group">
      <input
       v-model="body.display"
       type="text"
       placeholder="Zaslon"
       class="form-control"
      />
     </div>

          <div class="form-group">
      <input
       v-model="body.procesor"
       type="text"
       placeholder="Procesor"
       class="form-control"
      />
     </div>

               <div class="form-group">
      <input
       v-model="body.memorija"
       type="text"
       placeholder="RAM Memorija"
       class="form-control"
      />
     </div>

               <div class="form-group">
      <input
       v-model="body.memorija2"
       type="text"
       placeholder="Memorija Uređaja"
       class="form-control"
      />
     </div>




     <div id="form-group">
      <textarea
       v-model="body.content"
       type="text"
       placeholder="Content"
       class="form-control form-control-custom"
      />
     </div>
     <form @submit.prevent="postNewImage" class="form-inline mb-5">
      <div class="form-group">
       <label for="imageUrl">Select image </label>
       <input type="file" id="file" ref="file" v-on:change="OcitajSliku()" />
      </div>
     </form>
     <div>
      <a @click="Dodaj()" class="btn dodavanje-custom">Dodaj</a>
     </div>
    </div>

    
    <div class="col-md-4"></div>
   </div>
  </div>
 </div>

</template>
<script>

 import Phone from '../services/phone'
 export default {
   name:"dodavanje",
   data(){
     return{
       body:{
         title: '',
         category: '',
         content: '',
         display: '',
         procesor: '',
         memorija: '',
         memorija2: '',
         
       },

       error: '',
       slika: {}
     }
   },
   methods: {
     
     async Dodaj(){
       this.error = ''
       try {
         let form = new FormData()
         form.append('slika', this.slika)
         form.append('title', this.body.title)
         form.append('category', this.body.category)
         form.append('content', this.body.content)
         form.append('display', this.body.display)
         form.append('procesor', this.body.procesor)
         form.append('memorija', this.body.memorija)
         form.append('memorija2', this.body.memorija2)
         
         let res = await Phone.Objavi(form)
         console.log(res)
         this.$router.push({name : 'naslovnica'})
       } catch (error) {
         this.error = error.data.error
         console.log(error);
       }
     },
     OcitajSliku(){
       console.log(this.$refs.file.files[0]);
       this.slika = this.$refs.file.files[0];
     }
   },

 }
</script>


