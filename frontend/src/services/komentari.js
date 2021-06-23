import Service from './axiosInit'


let Komentari = {
    async ObjaviKomentar(data){
        try {
            return await Service.post('/komentar', data)
        } catch (error) {
            throw error.response;  
        }
    },
    async ObrisiKomentar(id){
        try {
            return await Service.delete(`/komentar/${id}`)
        } catch (error) {
            throw error.response;
        }
    }
}


export default Komentari