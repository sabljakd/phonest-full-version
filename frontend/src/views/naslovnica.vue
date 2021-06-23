<template>
  <div class="naslovnica">
      

    <p class="error">{{error}}</p>
    <div class="background-line">
      <div class="row phoness">
        <div>
          <kartice class="phones" v-for="k in $store.posts" :info="k" :key="k._id" /> 
        </div>
                <div>
           
        </div>  
  
      </div>
            <div v-if="$store.posts.length>0" class="pag" style="margin-bottom:15px;">  
        <nav aria-label="Page navigation example">
          <ul class="d-flex pagination justify-content-center">
            <li @click.prevent="prev()" class="page-item">
              <a class="pl-custom" href="#">Previous</a>
            </li>
            <li class="page-item"><a class="pl-custom" href="#">{{stranica+1}}</a></li>
            <li @click.prevent="next()" class="page-item">
              <a class="pl-custom" href="#">Next</a>
            </li>
          </ul>
        </nav> 
      </div> 
    </div>
    </div>
  
  
</template>
<script>
import kartice from '@/components/kartice.vue' 
import store from '@/store.js'
import Phone from '../services/phone'

export default {
  name:"naslovnica",
  components: {
    kartice,
  },
  data(){
    return{
      error: '',
      stranica: 0,
    }  
  },
  async created() {
    await this.getAllPhones()
  },
  methods: {
    async next(){
      this.stranica++
      await this.getAllPhones()      
    },
    async prev(){
      this.stranica = --this.stranica < 0 ? 0 : this.stranica
      await this.getAllPhones()
    },
    async getAllPhones(){
      try {
        let res = await Phone.All(this.$store.search, this.stranica)
        this.$store.posts = res.data.phones
      } catch (error) {
        this.stranica--
        this.error = error.data
        console.log(error);
      }
    }
  },     
}
</script>

