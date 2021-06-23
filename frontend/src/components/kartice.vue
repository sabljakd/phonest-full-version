<template>
	<div class="hello">
		<div class="card">
			<div> 
      <img class="card-img-top" :src="url" alt="Slika" style="height:300px; width:auto; margin-top:10px;"/>
			</div>
			<div class="card-body">
				<h5 class="card-title">{{info.title}}</h5>
				<p class="card-text">Proizvođač: {{info.category}}</p>
				<p class="card-text">Objavljeno: {{new Date(info.createdAt).getDate()}}.{{new Date(info.createdAt).getMonth()}}.{{new Date(info.createdAt).getFullYear()}}</p> 
        <a class="custom-nav-link nav-link" v-if="$route.name === 'posts'" @click.prevent="Obrisi(info._id)">Obriši</a>
		</div>
				<div>
					<router-link :to="{ name: 'detaljno', params: {id: info._id, edit: $route.name} }" class="custom-nav-link nav-link" style="margin-bottom:8.5px;"> Pogledaj </router-link>
				</div>
			
		</div>
	</div>
</template>
<script>
import Phone from '../services/phone'
export default {
	name: 'kartice',
	props: ["info"],
	data() {
		return {
			url: '',
			blob: '',
			pic: false
		}
	},
	async created() {
		let res = await Phone.GetSlika(this.info._id)
		if(res.data.size !== 0) this.pic = true
		this.url = `${res.config.baseURL}/phone/${this.info._id}/slika`
	},
	methods: {
		async Obrisi(id) {
			try {
				let res = await Phone.Obrisi(id)
				console.log(res);
				this.$emit('reload')
			} catch(error) {
				console.log(error);
			}
		}
	},
}
</script>