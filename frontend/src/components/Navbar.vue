<template>
    <div class="navbar d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav-custom-text nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="nav-item">
                <router-link to="/" class="nav-link">
                    Naslovnica
                </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="$store.admin" class="nav-link" to="/dodavanje">Dodaj recenziju</router-link>
          </li>        
          <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdown-custom" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Phones
          </a>
          <ul class="dropdownmenu-custom dropdown-menu">
            <li><router-link v-if="$store.user" class="dropdown-item" :to="{ name: 'profil' }">Podaci profila</router-link></li>
            <li><router-link v-if="$store.admin" class="dropdown-item" :to="{ name: 'posts' }">Moje recenzije</router-link></li>
            <li><router-link v-if="!$store.user" class="dropdown-item" :to="{ name: 'login' }">Prijava </router-link></li>
            <li><router-link v-if="!$store.user" class="dropdown-item" :to="{ name: 'signin' }">Registracija</router-link></li>
            <li><div v-if="$store.user" @click="logout" class="dropdown-item b">Logout</div></li>
          </ul>
        </div>
          <form class="form-inline my-2 my-lg-0">
            <searchbar v-on:search="srch()" v-if="$route.name === 'naslovnica'"/>
          </form>
        </ul>
      </div>
</template>

<script>
import searchbar from '@/components/searchbar'
import store from '@/store.js'
export default {
  components:{
    searchbar
  },
    data(){
    return store;
    },
  name: "Navbar",
  props: {
    msg: String
  },
  
  methods:{
      logout() {
        this.$store.user = ''
        this.$store.toekn = ''
        localStorage.clear()
        this.$router.push({name: 'prijavljivanje'})
    },
    srch(){
      this.$emit("search")
    }
  },
  mounted () {
  
  }
}

</script>
