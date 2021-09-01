<template>
  <Navbar />
  <div class="outer-main">
      <div class="inner-main">
        <router-view/>
      </div>
  </div>
  
</template>

<style lang="scss">
  @import "@/style/main.scss";
  @import "@/style/responsive.scss";


@media only screen and (max-width: 850px) {
  .inner-main {
    width: 100%;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;

  }
  .main-header {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
}

</style>

<script>

import Navbar from "@/views/Navbar";
import API_URL from "@/config.json"


export default {
  name: "App",
  data() {
    return {
      apiUrl: API_URL,
      lastScrollPossition: 0,
      showNavbar: true
    }
  },
  components: {
    Navbar
  },
  methods: {
    scroll: function() {
      const newScrollPossition = window.pageYOffset || document.documentElement.scrollTop
      const navBar = document.getElementById("navbar");

      if(this.lastScrollPossition < newScrollPossition) {
        navBar.style.top = "-50px"
      } else {
        navBar.style.top = "0px"
      }
      this.lastScrollPossition = newScrollPossition;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll)
  }
}
</script>
