<template>
    <div id="editor">
        <div class="container">
            <div class="form form-stacked">
                <div class="form-block">
                    <input @keydown.ctrl="ctrldown" @keyup="ctrlup" type="text" id="file_name" placeholder="Title" v-model="file.name">
                    <div class="form-controls">
                        <span class="dropdown">
                            <span class="button">Headings</span>
                            <div class="dropdown-list">
                                <span class="button" title="Heading 1 <h1>" @click="addMarkdown('addH1')"><h2>Heading 1</h2></span>
                                <span class="button" title="Heading 2 <h2>" @click="addMarkdown('addH2')"><h3>Heading 2</h3></span>
                                <span class="button" title="Heading 3 <h3>" @click="addMarkdown('addH3')"><h4>Heading 3</h4></span>
                                <span class="button" title="Heading 4 <h4>" @click="addMarkdown('addH4')"><h5>Heading 4</h5></span>
                            </div>
                        </span>
                        <span class="button" title="Strong <strong>" @click="addMarkdown('addStrong')"><strong>B</strong></span>
                        <span class="button" title="Emphasis <em>" @click="addMarkdown('addEmphasis')"><strong><em>I</em></strong></span>
                        <span class="button" title="Underline <u>" @click="addMarkdown('addUnderline')"><u>U</u></span>
                        <span class="button" title="Strikethrough <del>" @click="addMarkdown('addStrikethrough')"><del>S </del></span>
                        <span class="button ion-quote" title="BlockQuote <blockquote>" @click="addMarkdown('addBlockQuote')"></span>
                        <span class="button ion-code" title="Code block <pre><code>" @click="addMarkdown('addCode')"></span>
                        <span class="button ion-code-working" title="Inline code <code>" @click="addMarkdown('addInlineCode')"></span>
                        <span class="dropdown">
                            <span class="button">Lists</span>
                            <div class="dropdown-list row">
                                <span class="button ion-ios-list-outline" title="List <ul>" @click="addMarkdown('addList')"></span>
                                <span class="button ion-android-list" title="Number list <ol>" @click="addMarkdown('addNumberList')"></span>
                                <span class="button ion-android-checkbox-outline" title="Checkbox <input>" @click="addMarkdown('addCheckbox')"></span>
                            </div>
                        </span>
                        <span class="button ion-ios-grid-view-outline" title="Table <table>" @click="addMarkdown('addTable')"></span>
                        <span class="button ion-minus-round" title="Limitation <hr/>" @click="addMarkdown('addHR')"></span>
                        <span class="button ion-link" title="Link <a>" @click="addMarkdown('addLink')"></span>
                        <span class="button ion-image" title="Image <img>" @click="addMarkdown('addImage')"></span>
                    </div>
                    <textarea @keydown.ctrl="ctrldown" @keyup="ctrlup" placeholder="Markdown editor." class="textarea-tall" id="board_content" v-model="file.content"></textarea>
                    <div v-if="loader && error == ''" class="loader"></div>
                    <span class="error" v-if="error != ''">{{error}}</span>
                    <p id="infos">Author : {{file.author}}<br/>Create date : {{file.create_date}}<br/>Last modified date : {{file.last_edit_date}}</p>
                    <button v-if="!loader" @click="save()" class="save-b" type="button">Save<span class="ion-checkmark-round"></span></button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ServiceFile from '@/services/service-file'

export default {
    name: 'Editor3',
    data() {
        return {
            buttonTypes: {
                addCode: "Enter code here",
                addInlineCode: "Enter inline code here",
                addStrong: "Strong text",
                addEmphasis: "Emphasized text",
                addUnderline: "Underline text",
                addStrikethrough: "Strikethrough text",
                addLink: "https://romainchantrel.fr",
                addCheckbox: "Checked",
                addList: 'List',
                addNumberList: 'Number list',
                addBlockQuote: 'BlockQuote',
                addHR: '',
                addImage: 'Image name',
                addTable: 'Table',
                addH1: 'Heading 1',
                addH2: 'Heading 2',
                addH3: 'Heading 3',
                addH4: 'Heading 4'
            },
            buttonFunctions: {},
            file: {},
            keydown: false,
            error: '',
            loader: false
        }
    },
    created: function() {
        this.service_file = new ServiceFile();
    },
    mounted: function() {
//         // FIXME create store (this request already requested on viewer ..)
        this.buttonFunctions = {
            addCode: `\`\`\`\n`+this.buttonTypes.addCode+`\n\`\`\`\n\n`,
            addInlineCode: '\`'+this.buttonTypes.addInlineCode+'\`',
            addStrong: '**'+this.buttonTypes.addStrong+'**',
            addEmphasis: '*'+this.buttonTypes.addEmphasis+'*',
            addUnderline: '__'+this.buttonTypes.addUnderline+'__',
            addStrikethrough: '~~'+this.buttonTypes.addStrikethrough+'~~',
            addLink: '[Link title]('+this.buttonTypes.addLink+')',
            addCheckbox: ' - [x] '+this.buttonTypes.addCheckbox+'\n - [x] '+this.buttonTypes.addCheckbox+'\n - [x] '+this.buttonTypes.addCheckbox+'\n',
            addList: ' - '+this.buttonTypes.addList+'\n - '+this.buttonTypes.addList+'\n - '+this.buttonTypes.addList+'\n',
            addNumberList: ' 1. '+this.buttonTypes.addNumberList+'\n 2. '+this.buttonTypes.addNumberList+'\n 3. '+this.buttonTypes.addNumberList+'\n',
            addBlockQuote: '> '+this.buttonTypes.addBlockQuote+'\n\n',
            addHR: '---'+this.buttonTypes.addHR+'\n',
            addImage: '!['+this.buttonTypes.addImage+'](image.path)\n',
            addTable: '| Header 1      |     2 header    |   header 3 |\n\
| ------------- |: -------------: | ---------: |\n\
| 1 Online      |        1        |      value |\n\
| Line 2        |      '+this.buttonTypes.addTable+'      |      value |\n\
| 3 Online      |        3        |      value |\n',
            addH1: '# ' + this.buttonTypes.addH1+'\n',
            addH2: '## ' + this.buttonTypes.addH2+'\n',
            addH3: '### ' + this.buttonTypes.addH3+'\n',
            addH4: '#### ' + this.buttonTypes.addH4+'\n'
        }

        this.get_file();
    },
    methods: {
        capitalizeFirstLetter: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        matchString: function(target, textArea, limit) {
            var highlight = this.file.content.lastIndexOf(target, limit);
            textArea.value = this.file.content;
            if (highlight >= 0) {
                textArea.focus();
                textArea.selectionStart = highlight;
                return textArea.selectionEnd = highlight + target.length;
            }
        },
        addMarkdown: function(buttonType) {
            var textArea = this.$el.querySelector('#board_content'),
                caretPosition = textArea.selectionStart,
                text = this.file.content;
            if (buttonType in this.buttonTypes) {
                this.file.content = text.substring(0, caretPosition) + this.buttonFunctions[buttonType] + text.substring(caretPosition, text.length - 1);
                return this.matchString(this.buttonTypes[buttonType], textArea, caretPosition + this.buttonTypes[buttonType].length - 1);
            }
        },
        image: function(){
            // TODO upload image .. ?
            this.addMarkdown('addImage', 'board_content');
        },
        prevent: function(e){
            e.preventDefault();
            e.stopPropagation();
        },
        ctrldown: function(e){
            if (e.ctrlKey && e.keyCode == 83) {
                this.prevent(e);
                this.keydown = true;
            }
        },
        ctrlup: function(e){
            if (e.keyCode == 83 && this.keydown) {
                this.keydown = false;
                this.prevent(e);
                this.save();
            }
        },
        save: function() {
            if (!this.loader){
                this.error = '';
                this.loader = true;
                this.service_file.put(this.file.path, this.file.content, this.file.name).then( response => {
                    this.loader = false;
                    if (response.status == 200) {
                        console.log(response);
                        this.$router.push({path: "/viewer/"+this.file.path});
                    } else {
                        this.error = "Failed save ! Error " + response.status + " : " + response.statusText;
                    }
                }).catch( err => {
                    this.loader = false;
                    console.log(err);
                    this.error = "Failed save ! Error " + err.response.status + " : " + err.response.statusText;
                });
            }
        },
        get_file: function(){
            this.service_file.get(this.$route.fullPath.replace('/editor/', '')).then( response => {
                if (response['status'] == 200) {
                    this.file = response['data'];
                    this.file['name'] = this.file.path.split('/');
                    this.file['name'] = this.capitalizeFirstLetter(this.file['name'][this.file['name'].length-1]);
                }
            }).catch( err => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
@import url('../assets/css/loader.css');
.error {
    color: red;
    margin: 0;
}
.loader, .error {display: inline-block}
.loader {float: right}
#editor {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.5;
    width: 60vw; height: 70vh;
}

#infos {
    max-width: calc(60vw - 70px);
    display: inline-block;
    margin: 0 auto;
    font-size: 12px;
}

.container {
    width: 100%; height: 100%;
    margin: 0 auto;
}

.form {
    font-size: 1rem;
    width: 100%; height: 100%;
}
#file_name,
.form textarea {
    background: #F5F5F5;
    border-color: #D8D8D8;
    border-style: solid;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-width: 1px;
    box-shadow: none;
    display: inline-block;
    width: 100%;
    resize: none;
    padding: 0.75rem;
    -webkit-appearance: none;
}
#file_name {
    height: 10px;
    font-size: 24px;
    margin: 15px auto
}
#file_name:focus,
.form textarea:focus {
    background: #FFF;
    border-color: #3498db;
    outline: 0;
}
.form textarea, .form .textarea {
    min-height: 150px;
}
.form input[type="submit"]:focus {
    border: none;
    outline: 0;
}
.form .textarea-tall {
    min-height: 300px;
}

.form-stacked textarea {
    display: block;
    margin-bottom: 1.5rem;
    width: 100%;
}

.form-block {
    position: relative;
    width: 100%; height: 100%;
}

.form textarea {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.form-controls {
    width: 100%;
    padding: 0 0.75rem;
    border-top: 1px solid #D8D8D8;
    border-left: 1px solid #D8D8D8;
    border-right: 1px solid #D8D8D8;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.form-controls .button {
    padding: 0 1rem;
    font-size: 1.125rem;
}
.form-controls .button:hover {
    color: #338EDA;
}

.dropdown,
.button {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border: none;
    cursor: pointer;
    display: inline-block;
    min-height: 2rem;
    line-height: 2rem;
    font-size: 0.875em;
    font-family: inherit;
    text-decoration: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    white-space: nowrap;
    vertical-align: middle;
}
.button {padding: 0 0.75rem}

.label {
    width: 100%;
    display: block;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 0.375rem;
    font-size: 0.875rem;
}

/* .dropdown {
    cursor: pointer;
    display: inline-block;
} */

.dropdown-list {
    display: none;
    flex-direction: column;
    position: absolute;
    background-color: #fff;
    border: 1px solid #eee;
    border-top-color: transparent;
}
.dropdown-list h2,
.dropdown-list h3,
.dropdown-list h4,
.dropdown-list h5 {
    margin: 2px 5px;
    border-bottom: 1px solid #eee;
}
.dropdown-list h5 {border:0}
.dropdown:hover .dropdown-list {display: flex}
.row {flex-direction: row}
.save-b {
    border: 1px solid #66b8f0;
    border-radius: 3px;
    background-color: #3498db;
    color: #fff;
    overflow: hidden;
    height: 27px;
    font-family: inherit;
    float: right;
    cursor: pointer;
}
.save-b span {margin-left: 6px}
.save-b:hover {background-color: #66b8f0}
</style>
