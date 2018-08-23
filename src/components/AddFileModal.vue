<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <h1>Add new</h1>
                            <select v-model="input_value.type">
                                <option v-for="e in value.type" :key="e">{{e}}</option>
                            </select>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <select v-model="input_value.parent">
                                <option disabled>Parent Folder</option>
                                <option name=".">.</option>
                            </select>
                            <input v-model="input_value.file" v-if="input_value.type == 'File'" name="filename" placeholder="File name" type="text">
                            <input v-model="input_value.folder" v-if="input_value.type == 'Folder'" name="foldername" placeholder="Folder name" type="text">
                            <label class="modal-label">
                                <input v-model="input_value.open" type="checkbox" name="open" checked>
                                Open the {{input_value.type}} after creation is complete
                            </label>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <p id="error" v-if="error != ''">{{error}}</p>
                            <button @click="$emit('close')">Cancel</button>
                            <button class="modal-default-button" @click="submit()">Submit</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import ServiceCreate from '@/services/service-create'

export default {
    name: 'AddFileModal',
    data() {
        return {
            default_value: {
                type: 'File',
                parent: 'Parent Folder',
                file: '',
                folder: '',
                open: true
            },
            value: {
                type: ['File', 'Folder'],
                parent: ['Parent Folder', '.']
            },
            input_value: {
                type: '',
                parent: '',
                file: '',
                folder: '',
                open: ''
            },
            error: '',
        }
    },
    created: function(){
        this.service_create = new ServiceCreate();

        this.input_value.type = this.default_value.type;
        this.input_value.parent = this.default_value.parent;
        this.input_value.file = this.default_value.file;
        this.input_value.folder = this.default_value.folder;
        this.input_value.open = this.default_value.open;
    },
    methods: {
        submit: function(e){
            // check
            if (this.input_value.parent == this.default_value.parent || this.input_value[this.input_value.type.toLowerCase()] == this.default_value[this.input_value.type.toLowerCase()]) return this.error = 'Error on Field !';
            this.error = '';
            // axios
            if (this.input_value.type == 'File') {
                this.service_create.post_file(this.input_value.parent, this.input_value.file)
                .then( response => {
                    if (this.input_value.open){} // redirection to '/editor/path_to_file'
                    this.$emit('close')
                })
                .catch( err => {
                    console.log(err);
                    this.error = "Error " + err.response.status + " : " + err.response.statusText;
                    // Display error message
                });
            } else {
                this.service_create.post_folder(this.input_value.parent, this.input_value.folder)
                .then( response => {
                    if (this.input_value.open){} // redirection to '/editor/path_to_file'
                    this.$emit('close')
                })
                .catch( err => {
                    console.log(err);
                    // Display error message
                    this.error = "Error " + err.response.status + " : " + err.response.statusText;
                })
            }
        }
    }
}
</script>

<style scoped>
#error {
    color: red;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}
.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}
.modal-container button,
.modal-container input,
.modal-container select {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #f3f3f3;
    overflow: hidden;
}
.modal-container option {background-color: #fff}
.modal-container input {background-color: #fafafa}
.modal-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.modal-header select {
    height: 30px; width: 120px;
    font-size: 18px;
}
.modal-body input {height: 22px}
.modal-body select {
    width: 100%; height: 27px;
    margin-bottom: 20px;
}
.modal-body {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
}
.modal-default-button {float: right}
.modal-container button {
    height: 27px;
    cursor: pointer;
}
.modal-container button:hover {background-color: #fafafa}
.modal-label {
    margin-top: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {opacity: 0}
.modal-leave-active {opacity: 0}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
