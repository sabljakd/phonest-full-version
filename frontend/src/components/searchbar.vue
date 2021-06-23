<template>
   <div class="pretraga">
              <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                  <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Pretraži" aria-label="Search">
               </form>
            </div>
</template>


<script>
import Phone from '@/services/phone'
import _ from 'lodash'
export default {
   data(){
      return{
         search: ''
      }
   },
   watch: {
      search:
         _.debounce(async function(val) {
            this.$store.search = val
            try {
               let res = await Phone.All(val, this.stranica, false)
               this.$store.posts = res.data.phones
               console.log(search);
            } catch (error) {
               console.log(error);
            }
         }, 500)
   },
}
</script>