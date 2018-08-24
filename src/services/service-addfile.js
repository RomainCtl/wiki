import axios from 'axios'
import {URLS} from '../utils/URL'

export default class ServiceAddFile {
    constructor(options) {
        this.axios_instance = axios.create({
            baseURL: URLS.wiki_back
        });
        // this.axios_instance.defaults.headers.common['Authorization'] = localStorage.getItem('session_token'); // FIXME Create authentification system
    }
    post_file(parent, filename){
        const data = {
            'path': parent,
            'name': filename
        }
        return this.axios_instance.post('/api/create.php', data).then( response => {
            return response;
        }) .catch( err => {
            throw err;
        })
    }
}