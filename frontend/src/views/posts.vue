<template>
  <div class="naslovnica">
      
      <div class="row phones">     
        <div>
          <kartice v-on:reload="userPosts()" class="post" v-for="k in posts" :info="k" :key="k._id" /> 
        </div>  
      <div v-if="posts.length>0" class="pag">  
        <nav aria-label="Page navigation example">
          <ul class="d-flex pagination pagination justify-content-center">
            <li @click.prevent="prev()" class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">{{stranica+1}}</a></li>
            <li @click.prevent="next()" class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav> 
      </div>   
      </div>
    </div>
  
  
</template>
<script>

import Phone from '@/services/phone.js'
import kartice from '@/components/kartice.vue'
import store from '@/store.js'
export default {
  name:"posts",
  components: {
    kartice
  },
  data(){
    return{
      posts: [],
      stranica: 0
    }
  },
  async created() {
    await this.userPosts()
  },
  methods:{
    async userPosts(){
      try {
        let res = await Phone.UserPosts(this.stranica)
        console.log(res);
        if(res.data.length===0) return this.stranica--
        this.posts = res.data
      } catch (error) {
        this.stranica--
        console.log(error);
      }
    },
    async next(){
      this.stranica++
      await this.userPosts()      
    },
    async prev(){
      this.stranica = --this.stranica < 0 ? 0 : this.stranica
      await this.userPosts()
    },
     

  }
}
</script>



