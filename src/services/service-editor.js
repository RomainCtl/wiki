import axios from 'axios'
import {URLS} from '../utils/URL'

export default class ServiceEditor {
    constructor(options) {
        this.axios_instance = axios.create({
            baseURL: URLS.wiki_back
        });
        // this.axios_instance.defaults.headers.common['Authorization'] = localStorage.getItem('session_token'); // FIXME Create authentification system
    }
    put_file(path, filename, content, name){
        const data = {
            'path': path,
            'name': name,
            'content': content
        }
        return this.axios_instance.put('/api/edit.php?id='+filename, data).then( response => {
            return response;
        }) .catch( err => {
            throw err;
        })
    }
    post_image(){
        // TODO
    }
    get_file_content(path, filename){}
}