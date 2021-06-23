<template>
	<div>
		<p class="error">{{error}}</p>
		<div class="container">
				<div class="login-form">
          <h1 class="login-title">REGISTRIRAJ SE</h1>
					<form @submit.prevent="registracija">
						<div class="form-group">
							<input v-model="body.email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Unesi email">
						</div>
						<div class="form-group">
							<input v-model="body.password" type="password" class="form-control" placeholder="Lozinka">
						</div>
						<div class="form-group">
							<input v-model="passwordAgain" type="password" class="form-control" placeholder="Potvrdi lozinku" autocomplete="new-password">
						</div>
						<button type="submit" class="btnSubmit">Submit</button>
					</form>
				</div>
		</div>
	</div>
</template>
<script>
	import User from '@/services/user'
	export default {
	    name: 'registriranje',
	    data(){
	      return{
	        body: {
	          email: "",      
	          password: ""
	        },      
	        passwordAgain: "",
	        error: '',
	      }
	    },
	    methods: {    
	     async registracija() { 
	        this.error = ''
	        if(this.body.password != this.passwordAgain) return this.error = "Lozinke nisu iste" 
	
	        try {
	          let res = await User.Register(this.body)
	          console.log(res);
	          localStorage.setItem('token', res.data.token)
	          this.$store.token = res.data.token
	          this.$store.user = res.data.user._id
	          this.$store.admin = res.data.user.admin
	          console.log(this.$store);
	        } catch (error) {
	          console.log(error);
	          this.error = error.data.error
	        }
	      } 
	    }
	}
</script>
<style scoped>
	.error{
	  color: red;
	}
	
	.row{
	  width: 60%;
	  margin: auto;
	}
	
	@media only screen and (max-width: 992px) {
	  .row{
	    width: 100%;
	  }
	}
</style>