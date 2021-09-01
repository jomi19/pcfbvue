<template>
    <nav class="navbar" :class="{'navbar--hidden': !showNavbar}" id="navbar">
        <router-link class="navbutton" v-for="link in routes" :key="link.name" :to="link?.url" :style="this.width">
            {{link.name}}
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "Navbar",

    data () {
        return {
            routes: this.$router.options.routes,
            width: "width: 0%"
        }
    },
    mounted() {
        let navList = [];

        for(let navItem in this.routes) {
            if(this.routes[navItem].navbar) {
                navList.push(this.routes[navItem]);
            }
        }
        this.width = `width: ${100 /navList.length}%;`;
        this.routes = navList;
    }
}
</script>

<style lang="scss" scoped>

@import "@/style/variables.scss";
    
.navbar {
    display: flex;
    left: 50%;
    margin-left: -350px;
    font-size: 2em;
    width: 700px;
    height: 40px;
    background: linear-gradient(180deg, $navBar, $navBarDark);
    position: fixed;
    top: 0;
    z-index: 1;
    transition-duration: 125ms;
    
}

.navbar::before {
    float: left;
    content: "";
    width: 10%;
    left: -20px;
    height: 100%;
    position: relative;
    background: linear-gradient(180deg, $navBar, $navBarDark);
    z-index: -1;
    transform: skew(30deg, 0deg);
    display: block;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 5px;
}

.navbar::after {
    top: 0;
    content: "";
    right: -20px;
    width: 10%;
    height: 100%;
    position: relative;
    background: linear-gradient(180deg, $navBar, $navBarDark);
    z-index: -1;
    transform: skew(-30deg, 0deg);
    display: block;
    float: right;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 5px;
}


.navbar a {
    font-family: "Acme";
    color: #fff;
    display: inline-block;
    text-align: center;
    width: 25%;
    text-decoration: none;
    overflow: hidden;
}

.navbar a:hover {
    text-decoration: underline;
}

.navbar .selected {
    color: #7faccc;
}

.navbar.hide {
    top: -40px;
}

@media only screen and (max-width: 850px) {
  .navbar {
    width: 100%;
    left: 0;
    margin-left: 0;
    bottom: 0;
  }
}

 
</style>
