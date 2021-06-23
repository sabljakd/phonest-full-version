<template> 
  <div id="app">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;1,100;1,300&display=swap" rel="stylesheet">
  
    <Navbar /> 
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import jwt from 'jsonwebtoken';
import store from '@/store.js'



export default {
  data(){
    return store
  },
  name: 'App',
  
  components: {
    Navbar,
    Footer
  },
  mounted(){
    store.token = localStorage.getItem('token')
    let decoded = jwt.verify(store.token, 'phonesApp')
    console.log(decoded);
    if(decoded){
      store.user = decoded._id
      if(decoded._admin==="true"){
        store.admin=true
      }
    
    }else {
        localStorage.clear()
        
    }

  }
}
</script>

<style lang="scss">

:root {
  --text: #2d4059;
  --bg: #ffd460;
  --app-bg: #e2ded3;
}




#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
