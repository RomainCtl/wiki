<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div v-if="!loader" class="modal-header">
                        <slot name="header">
                            <h1>Add new File</h1>
                        </slot>
                    </div>

                    <div v-if="!loader" class="modal-body">
                        <slot name="body">
                            <select v-model="input_value.parent">
                                <option disabled>Parent</option>
                                <option v-for="$e in value.parent" :key="$e" :name="$e">{{$e}}</option>
                            </select>
                            <input v-model="input_value.file" name="filename" placeholder="File name" type="text" maxlength="14">
                            <label class="modal-label">
                                <input v-model="input_value.open" type="checkbox" name="open" checked>
                                Open the file after creation is complete
                            </label>
                        </slot>
                    </div>

                    <div v-if="loader && error == ''" class="center"><div class="loader"></div></div>
                    <p class="error" v-if="error != ''">{{error}}</p>
                    <button v-if="error != '' && loader" @click="$emit('close')">Close</button>

                    <div v-if="!loader" class="modal-footer">
                        <slot name="footer">
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
import ServiceFile from '@/services/service-file'

export default {
    name: 'AddFileModal',
    data() {
        return {
            default_value: {
                parent: 'Parent',
                file: '',
                open: true
            },
            value: {
                parent: []
            },
            input_value: {
                parent: '',
                file: '',
                open: ''
            },
            error: '',
            loader: false
        }
    },
    created: function(){
        this.service_file = new ServiceFile();

        this.input_value = Object.assign({}, this.default_value);
    },
    mounted: function(){
        this.service_file.get_paths('home').then( response => {
            if (response['status'] == 200) {
                this.value.parent = ['home'];
                this.value.parent.push(...response['data']['child_paths']);
            }
            // TODO else
        }).catch( err => {
            console.log(err);
        });
    },
    methods: {
        submit: function(e){
            // check
            if (this.input_value.parent == this.default_value.parent || this.input_value.file == this.default_value.file) return this.error = "Error : Fields can't be empty !";
            this.error = '';
            this.loader = true
            this.service_file.post(this.input_value.parent, this.input_value.file)
            .then( response => {
                this.$emit('close');
                if (response.status == 201) {
                    if (this.input_value.open){
                        this.$router.push({path: "/editor/"+this.input_value.parent+"/"+this.input_value.file});
                    }
                }
            })
            .catch( err => {
                console.log(err);
                this.error = "Error " + err.response.status + " : " + err.response.statusText;
            });
        }
    }
}
</script>

<style scoped>
.error {
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

@import url('../assets/css/loader.css');
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
