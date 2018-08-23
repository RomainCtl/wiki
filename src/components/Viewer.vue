<template>
    <div id="viewer">
        <div v-html="res"></div>
    </div>
</template>

<script>
import showdown from 'showdown';
import hljs from 'highlight.js';

export default {
    name: "Viewer",
    props: {
        text: String
    },
    data() {
        return {
            converter: new showdown.Converter({tasklists: true}),
            exemple: "# hello, markdown!\n"+
                "```javascript \n"+
                "function fifo(){ \n"+
                "\tvar bar = 'bar'; \n"+
                "\treturn bar; \n"+
                "}\n"+
                "```\n"+
                " - [x] This task is done \n- [ ] This is still pending",
            res: "",
        }
    },
    mounted: function(){
        this.res = this.converter.makeHtml(this.exemple);
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
</style>