<template>
    <nav>
        <div class="container">
            <div class="header">
                <a class="brand" href="/">
                    <img alt="Wiki" src="../../static/img/linux.png" height="40">
                    <p>Wiki</p>
                </a>
            </div>
            <div class="dropdown"
                v-for="(list, name) in dropdowns"
                :key="name">
                <button class="dropbtn">{{name}}<span class="badge">{{list.length}}</span></button>
                <div class="dropdown-content">
                    <a v-for="e in list"
                        :key="e.title"
                        :href="'/#/'+e.link">{{e.title}}</a>
                </div>
            </div>
            <form class="form right" @submit="search()" role="search" method="post" action="/static/api/search.php">
                <div class="form-group">
                    <input class="search-bar" placeholder="Search" name="search" required="" type="text">
                </div>
                <button type="submit" class="btn"><span class="ion-search"></span></button>
            </form>
            <ul class="list navbar-nav right">
                <li><a v-scroll-to="'#app'" title="Up"><span class="icon ion-arrow-up-c"></span></a></li>
                <li><a v-scroll-to="'#down'" title="Down"><span class="icon ion-arrow-down-c"></span></a></li>
            </ul>
            <div class="nav-divider right"></div>
            <div class="form right">
                <button v-if="!showeditbtn" @click="view()" type="button" title="Close editor" class="btn add"><span class="ion-close"></span></button>
                <button v-if="showeditbtn" @click="edit()" type="button" title="Edit file" class="btn add"><span class="ion-edit"></span></button>
                <button @click="showAddFileModal = true" type="button" title="Add file" class="btn add"><span class="ion-plus"></span></button>
            </div>
        </div>
        <add-file-modal v-if="showAddFileModal" @close="showAddFileModal = false"></add-file-modal>
    </nav>
</template>

<script>
import AddFileModal from '@/components/AddFileModal'

export default {
    name: 'NavBar',
    components: {
        'add-file-modal': AddFileModal
    },
    data() {
        return {
            showAddFileModal: false,
            showeditbtn: true,
            demo: {
                TD: [
                    {title: 'TD1', link: 'viewer/td1'},
                    {title: 'TD2', link: 'viewer/td2'},
                    {title: 'TD3', link: 'viewer/td3'}
                ],
                TP: [
                    {title: 'TP1', link: 'viewer/tp1'},
                    {title: 'TP2', link: 'viewer/tp2'},
                    {title: 'TP3', link: 'viewer/tp3'}
                ],
                JS: [
                    {title: 'VueJS', link: 'viewer/VueJS'},
                    {title: 'AngularJS', link: 'viewer/AngularJS'}
                ]
            },
            dropdowns: {}
        }
    },
    created: function() {
        this.dropdowns = this.demo;
        this.showeditbtn = (this.$route.name == "Viewer");
    },
    methods: {
        search: function(e){
            e.preventDefault()
            // axios
        },
        edit: function(){
            let r = this.$route.fullPath.replace('viewer', "editor");
            // TODO redirection to login page if token timeout
            this.$router.push({path: r});
            this.showeditbtn = false;
        },
        view: function(){
            let r = this.$route.fullPath.replace('editor', "viewer");
            this.$router.push({path: r});
            this.showeditbtn = true;
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #777;
    cursor: pointer;
}
a:focus {
    outline: thin dotted;
    outline-offset: -2px;
}
nav {
    background-color: #f8f8f8;
    border-color: #e7e7e7;
    position: fixed;
    right: 0; left: 0;
    z-index: 1030;
    border-radius: 0;
    top: 0;
    height: 54px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-width: 0 0 1px;
    border-radius: 0;
}
.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    border-bottom: 1px solid #e6e6e6;
}
.header {
    margin-right: 0;
    margin-left: 0;
    float: left;
}
.brand {
    margin-left: -15px;
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    align-items: center;
    float: left;
    height: 50px; width: 100px;
    padding: 0 15px;
    font-size: 26px;
    line-height: 20px;
}
.dropdown {
    position: relative;
    display: inline-block;
    margin-right: 3px;
}
.dropbtn {
    background-color: #7c7c7e;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    min-width: 90px;
}
.dropdown:hover .dropbtn {
    background-color: #b5b5b5;
}
.dropdown:hover .dropdown-content {display: block}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}
.dropdown-content a {
    color: #555;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}
.dropdown-content a:hover {background-color: #f1f1f1}
.badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: #777;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 10px;
}
.form {
    border-color: #e7e7e7;
    width: auto;
    padding-top: 0;
    padding-bottom: 0;
    margin-right: 0;
    margin-left: 0;
    border: 0;
    box-shadow: none;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.form-group {
    margin-bottom: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.search-bar {
    width: auto;
    height: 25px;
    padding: 6px 12px;
    margin-right: 3px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.right {float: right !important; height: 50px}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #333;
    background-color: #fff;
    border-color: #ccc;
}
.btn:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
}
.list {
    margin: 0;
    padding-left: 0;
    list-style: none;
}
.list > li {
    float: left;
    position: relative;
    height: 50px;
    display: flex;
    align-items: center
}
.list > li > a {
    padding-top: 15px;
    padding-bottom: 15px;
    line-height: 20px;
    position: relative;
    display: block;
    padding: 10px 15px;
}
.list > li > a:hover {color: #333}
.icon {font-size: 24px}
.add {
    border-radius: 50%;
    margin-left: 5px;
}
.nav-divider {
    height: 47px; width: 1px;
    margin: 4px 0 4px 10px;
    border-radius: 5px;
    background-color: #e7e7e7;
}
</style>
