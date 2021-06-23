import Service from './axiosInit'

let Phone = {
    async Objavi(podaci){
        try {
            console.log(podaci);
            return await Service.post('/phone', podaci)
        } catch (error) {
            throw error.response;
        }
    },
    async All(search, skip){
        console.log(search);
        try {
            return await Service.get(`/phone?pretraga=${search}&skip=${skip}`)
        } catch (error) {
            throw error.response;
        }
    },
    async One(id){
        try {
            return await Service.get(`/phone/${id}`)
        } catch (error) {
            throw error.response;
        }
    },
    async Update(id, data){
        try {
            return await Service.patch(`/phone/${id}`, data)
        } catch (error) {
            throw error.response;
        }
    },
    async Komentari(id){
        try {
            return await Service.get(`/phone/${id}/komentari`)
        } catch (error) {
            throw error.response;
        }
    },
    async GetSlika(id){
        try {
            return await Service.get(`/phone/${id}/slika`, {
                responseType: 'blob'
            })
        } catch (error) {
            throw error.response;
        }
    },
    async Obrisi(id){
        try {
            return await Service.delete(`/phone/${id}`)
        } catch (error) {
            throw error.response;
        }
    },
    async UserPosts(skip){
        try {
            return await Service.get(`/me/phone?skip=${skip}`)
        } catch (error) {
            throw error.response
        }
    }
}

export default Phone