<template>

		<div class="container">
      <p></p>
				<div class="login-form">
          <h1 class="login-title">PRIJAVI SE</h1>
					<form @submit.prevent="login">
						<div class="form-group">
							<input v-model="body.email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Unesi email">
						</div>
						<div class="form-group">
							<input v-model="body.password" type="password" class="form-control" placeholder="Lozinka">
						</div>
						<button type="submit" class="btnSubmit">Prijavi Se</button>
					</form>
				</div>
		</div>
</template>
<script>
	import User from '@/services/user'
	export default {
	    name: 'prijavljivanje',
	    data(){
	      return{
	        body: {
	        email: '',
	        password:''
	        }
	      }
	    },
	    methods: {
	    async login () { 
	      try {
	          let res = await User.Login(this.body)
	          console.log(res);
	          localStorage.setItem('token', res.data.token)
	          this.$store.token = res.data.token
	          this.$store.user = res.data.user._id
	          this.$store.admin = res.data.user.admin
	          console.log(this.$store);
	          this.$router.push({name : "naslovnica"})
	        } catch (error) {
	          console.log(error);
	          this.error = error.data.error
	        }
	      
	    }
	}
	}
</script>
