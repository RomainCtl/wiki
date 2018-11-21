import axios from 'axios'
import {URLS} from '../utils/URL'

export default class ServiceFile {
    constructor(options) {
        this.axios_instance = axios.create({
            baseURL: URLS.wiki_back
        });
        // this.axios_instance.defaults.headers.common['Authorization'] = localStorage.getItem('session_token'); // FIXME Create authentification system
    }
    delete(filename_path){
        return this.axios_instance.delete('/file/'+filename_path.replace('/', '%2f')).then( response => {
            return response;
        }).catch( err => {
            throw err;
        })
    }
    put(filename_path, content, name){
        const data = {
            'content': content,
            'name': name
        }
        return this.axios_instance.put('/file/'+filename_path.replace('/', '%2f'), data).then( response => {
            return response;
        }).catch( err => {
            throw err;
        })
    }
    post(parent, filename){
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
    get_paths(filename_path, limit){
        return this.axios_instance.get('/file/list/'+filename_path.replace('/', '%2f')+(limit ? '/limit/'+limit : '')).then( response => {
            return response;
        }).catch( err => {
            throw err;
        })
    }
    get(filename_path){
        return this.axios_instance.get('/file/'+filename_path.replace('/', '%2f')).then( response => {
            return response;
        }).catch( err => {
            throw err;
        })
    }
}