<template>
    <div id="viewer">
        <div v-html="res"></div>
    </div>
</template>

<script>
import ServiceFile from '@/services/service-file'

import showdown from 'showdown';
import hljs from 'highlight.js';

export default {
    name: "Viewer",
    props: {
        text: String
    },
    data() {
        return {
            converter: new showdown.Converter({tasklists: true, tables: true, simpleLineBreaks: true, underline: true, strikethrough: true}),
            file: null,
            res: ''
        }
    },
    created: function(){
        this.service_file = new ServiceFile();
    },
    mounted: function(){
        this.service_file.get(this.$route.fullPath.replace('/viewer/', '')).then( response => {
            if (response['status'] == 200) {
                this.file = response['data'];
                this.res = this.converter.makeHtml(this.file['content']);
            }
        }).catch( err => {
            console.log(err);
        });
    },
    updated: function(){
        // HighlightBlock
        var codeblocks = this.$el.querySelectorAll("pre code");
        for (var e=0 ; e<codeblocks.length ; e++) hljs.highlightBlock(codeblocks[e].parentElement);
    }
}
</script>

<style>
/* @import "../../node_modules/highlight.js/styles/agate.css"; */
@import url('../assets/css/agate.css');

table {border-collapse: collapse}
table, th, td {border: 1px solid black}
td {padding: 15px}
th {
    padding: 5px 15px;
    background-color: #73787e;
    color: white;
}
tr:nth-child(even) {background-color: #f2f2f2}
blockquote {
    font-style: italic;
    margin-left: 32px;
    font-family: Consolas, "Times New Roman", Verdana;
    border-left: 4px solid #CCC;
    padding-left: 8px;
}
</style>