<template>
    <div id="editor">
        <div class="container">
            <div class="form form-stacked">
                <div class="form-block">
                <label class="label" for="board_content">Content</label>
                <div class="form-controls">
                    <span class="button ion-code" title="Code block <pre><code>" @click="addMarkdown('addCode', 'board_content')"></span>
                    <span class="button ion-code-working" title="Inline code <code>" @click="addMarkdown('addInlineCode', 'board_content')"></span>
                    <span class="button" title="Strong <strong>" @click="addMarkdown('addStrong', 'board_content')"><strong>b</strong></span>
                    <span class="button" title="Emphasis <em>" @click="addMarkdown('addEmphasis', 'board_content')"><strong><em>i</em></strong></span>
                    <span class="button ion-link" title="Link <a>" @click="addMarkdown('addLink', 'board_content')"></span>
                </div>
                <textarea placeholder="Ask a programming question or share a tip with other developers. Markdown is supported." class="textarea-tall" id="board_content"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Editor3',
    data() {
        return {
            buttonTypes: {
                addCode: "Enter code here",
                addInlineCode: "Enter inline code here",
                addStrong: "Strong text",
                addEmphasis: "Emphasized text",
                addLink: "https://romainchantrel.fr"
            },
            buttonFunctions: {}
        }
    },
    mounted: function(){
        this.buttonFunctions = {
                addCode: `\`\`\`\n`+this.buttonTypes.addCode+`\n\`\`\`\n\n`,
                addInlineCode: '\`'+this.buttonTypes.addInlineCode+'\`',
                addStrong: '**'+this.buttonTypes.addStrong+'**',
                addEmphasis: '*'+this.buttonTypes.addEmphasis+'*',
                addLink: '[Link title]('+this.buttonTypes.addLink+')'
            }
    },
    methods: {
        matchString: function(target, textArea, limit) {
            var highlight = textArea.value.lastIndexOf(target, limit);
            if (highlight >= 0) {
                textArea.focus();
                textArea.selectionStart = highlight;
                return textArea.selectionEnd = highlight + target.length;
            }
        },
        addMarkdown: function(buttonType, textArea_id) {
            var textArea = this.$el.querySelector('#'+textArea_id),
                caretPosition = textArea.selectionStart,
                text = textArea.value;
            if (buttonType in this.buttonTypes) {
                textArea.value = text.substring(0, caretPosition) + this.buttonFunctions[buttonType] + text.substring(caretPosition, text.length - 1);
                return this.matchString(this.buttonTypes[buttonType], textArea, caretPosition + this.buttonTypes[buttonType].length - 1);
            }
        }
    }
}
</script>

<style scoped>
#editor {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.5;
    width: 50vw; height: 60vh;
}

.container {
    width: 100%; height: 100%;
    margin: 0 auto;
}

.form {
    font-size: 1rem;
    width: 100%; height: 100%;
}
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
    width: 100%; height: 100%;
    resize: none;
    padding: 0.75rem;
    -webkit-appearance: none;
}
.form textarea:focus {
    background: #FFF;
    border-color: #338EDA;
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
    padding: 0 0.75rem;
    white-space: nowrap;
    vertical-align: middle;
}

.label {
    width: 100%;
    display: block;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 0.375rem;
    font-size: 0.875rem;
}
</style>
