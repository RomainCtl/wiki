import axios from 'axios'
import {URLS} from '../utils/URL'

export default class ServiceCreate {
    constructor(options) {
        this.axios_instance = axios.create({
            baseURL: URLS.wiki_back
        });
        // this.axios_instance.defaults.headers.common['Authorization'] = localStorage.getItem('session_token'); // FIXME Create authentification system
    }
    post_file(parent, filename){
        const data = {
            'parent_folder': parent,
            'file_name': filename
        }
        return this.axios_instance.post('/api/create.php?type=file', data).then( response => {
            return response;
        }) .catch( err => {
            throw err;
        })
    }
    post_folder(parent, foldername){
        const data = {
            'parent_folder': parent,
            'folder_name': foldername
        }
        return this.axios_instance.post('/api/create.php?type=folder', data).then( response => {
            return response;
        }) .catch( err => {
            throw err;
        })
    }
}