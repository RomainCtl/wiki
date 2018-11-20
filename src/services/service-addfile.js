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
            'parents': parent,
            'name': filename
        }
        return this.axios_instance.post('/file', data).then( response => {
            return response;
        }) .catch( err => {
            throw err;
        })
    }
    get_paths(filename_path){
        return this.axios_instance.get('/file/list/'+filename_path.replace('/', '%2f')).then( response => {
            return response;
        }).catch( err => {
            throw err;
        })
    }
}