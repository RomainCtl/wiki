<template>
    <div id="viewer">
        <p>DEBUG : {{ $route.params.route }}</p>
        <div v-html="res"></div>
        <div v-html="res2"></div>
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
            converter: new showdown.Converter({tasklists: true, tables: true, simpleLineBreaks: true, underline: true, strikethrough: true}),
            exemple: "# hello, markdown!\n"+
                "```javascript \n"+
                "function fifo(){ \n"+
                "\tvar bar = 'bar'; \n"+
                "\treturn bar; \n"+
                "}\n"+
                "```\n"+
                "__yolo__\n"+
                "~~yolo~~\n"+
                " - [x] This task is done \n- [ ] This is still pending",
            demo: '```\n\
Enter code here\n\
```\n\
\n\
`Enter inline code here`\n\
**Strong text**\n\
*Emphasized text*\n\
[Link title](https://romainchantrel.fr)\n\
 - [x] Checked\n\
 - [x] Checked\n\
 - [] Not checked\n\
\n\
 - List\n\
 - List\n\
 - List\n\
\n\
 1. Number list\n\
 2. Number list\n\
 3. Number list\n\
\n\
> BlockQuote\n\
\n\
\n\
---\n\
\n\
![Image name](image.path)\n\
\n\
| Header 1      |     2 header    |   header 3 |\n\
| ------------- |: -------------: | ---------: |\n\
| 1 Online      |        1        |      value |\n\
| Line 2        |      Table      |      value |\n\
| 3 Online      |        3        |      value |\n\
\n\
',
            res: "",
            res2: ""
        }
    },
    mounted: function(){
        this.res = this.converter.makeHtml(this.exemple);
        this.res2 = this.converter.makeHtml(this.demo);
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