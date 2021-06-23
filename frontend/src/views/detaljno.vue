<template>
    <div class="podaci">
        <div class="modal-body">
            <div class="detaljnogrid">
                <div class="prvired">
                    <div></div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img :src="url" alt="" />
                                </td>
                                <td style="padding-left: 100px;">
                                    {{podaci.title}}
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <div></div>
                </div>
                
                <div class="drugired">
                    <div></div>
                    <div class="drugiredsredina">
                    <table>
                        <tbody>
                            <tr>
                                <th class="th1">
                                   <i class="fas fa-trademark"></i>
                                </th>
                                <th class="datafromdb">
                                    {{podaci.category}}
                                </th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="td1">
                                    <i class="fas fa-mobile"></i>
                                </td>
                                <td class="datafromdb">
                                    {{podaci.display}}
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th class="th1">
                                    <i class="fas fa-microchip"></i>
                                </th>
                                <th class="datafromdb">
                                    {{podaci.procesor}}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div></div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4"></div>

                <div class="col-md-4">
                    <p class="error">{{error}}</p>

                    <div v-if="$route.params.edit == 'posts'" class="form-group">
                        <textarea v-model="podaci.content" type="text" placeholder="/" class="form-control" />
                    </div>

                    <div  class="form-group">                        
                        {{podaci.content}}
                    </div>

                    <div v-if="$route.params.edit == 'posts'">
                        <a @click.prevent="Update()" class="btn btn-info my-2 my-sm-0 mr-2">Update</a>
                    </div>
                </div>

                <div class="col-md-4"></div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div v-if="$store.user && $route.params.edit != 'posts'" class="row">
                <div class="col-md-2"></div>

                <div class="col-md-8">
                    <p class="error">{{comErr}}</p>
                    <div class="form-group">
                        <div contenteditable="true"><textarea v-model="komentar.sadrzaj" class="form-group komentar" placeholder="Dodaj komentar" cols="30"></textarea></div>
                    </div>
                    <div>
                        <button @click.prevent="PostKomentar()" class="dodavanje-custom">Dodaj komentar</button>
                    </div>
                </div>

                <div class="col-md-2"></div>
            </div>
            <br />
            <br />

            <div class="komentari-grid">
                <div></div>

                <div>
                  
                    
                      
                    <div class="comment text-justify" style="margin-bottom:30px;" v-for="komentar in komentari" :key="komentar._id">
                      
                      
                        <span class="datum-komentara">
                          
                            {{new Date(komentar.createdAt).getDate()}}.{{new Date(komentar.createdAt).getMonth()}}. {{new Date(komentar.createdAt).getFullYear()}} {{new Date(komentar.createdAt).getHours()}}:{{new
                            Date(komentar.createdAt).getMinutes()}}
                              
                        </span><br>
                        <div class="sadrzaj-komentara">
                            {{komentar.sadrzaj}}   
                        </div>
                        <p v-if="komentar.korisnik == $store.user" @click.prevent="ObrisiKomentar(komentar._id)" class="obrisi">x</p>             
                    </div>
                
                <div class="col-md-2"></div>
                  
                
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import Phone from "../services/phone";
    import Komentar from "../services/komentari";
    export default {
        name: "detaljno",
        data() {
            return {
                podaci: {},
                error: "",
                comErr: "",
                pic: false,
                url: "",
                komentar: {
                    sadrzaj: "",
                    postId: "",
                },
                komentari: [],
                slike: [],
            };
        },
        async created() {
            console.log(this.$route.params.edit);
            await this.GetOne();
            await this.getKomentari();
        },
        methods: {
            async Update() {
                const noviPodaci = {
                    title: this.podaci.title,
                    category: this.podaci.category,
                    content: this.podaci.content,
                };
                try {
                    let res = await Phone.Update(this.$route.params.id, noviPodaci);
                    console.log(res);
                    this.$router.push({ name: "posts" });
                } catch (error) {
                    console.log(error);
                    this.error = error.data;
                }
            },
            async PostKomentar() {
                this.comErr = "";
                this.komentar.postId = this.$route.params.id;
                try {
                    let res = await Komentar.ObjaviKomentar(this.komentar);
                    this.komentar.sadrzaj = "";
                    await this.getKomentari();
                } catch (error) {
                    this.comErr = error.data.error;
                }
            },
            async GetOne() {
                try {
                    let res = await Phone.One(this.$route.params.id);
                    this.podaci = res.data;
                    let podacioSlici = await Phone.GetSlika(this.$route.params.id);
                    console.log(podacioSlici);
                    this.url = `${podacioSlici.config.baseURL}${podacioSlici.config.url}`;
                    console.log(this.url);
                } catch (error) {
                    this.error = error.data;
                }
            },
            async getKomentari() {
                try {
                    let komentari = await Phone.Komentari(this.$route.params.id);
                    console.log(komentari);
                    this.komentari = komentari.data;
                } catch (error) {
                    this.komentarError = error.data;
                }
            },
            async ObrisiKomentar(id) {
                try {
                    let res = await Komentar.ObrisiKomentar(id);
                    console.log(res);
                    await this.getKomentari();
                } catch (error) {
                    this.komentarError = error.data;
                }
            },
        },
    };
</script>

<style>
    .error {
        color: red;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }




  

    p {
        margin-block-start: 0 !important;
        margin-block-end: 0 !important;
        margin: 0 !important;
    }

    .alert {
        border-radius: 0.25rem 0.25rem 0.25rem 0;
    }
</style>
